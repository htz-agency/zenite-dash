/* ================================================================== */
/*  Hook: useDashDataProcessor — Processamento centralizado de dados  */
/* ================================================================== */

import { useMemo } from "react";

export interface ProcessDataConfig {
  rowShelf: any[];
  colShelf: any[];
  filterShelf?: any[];
  sourceData: any[];
  calculatedFields?: any[];
}

/* ── Calculated Field Formula Evaluator ── */

// Parse [FieldName] references in a formula
function extractFieldRefs(formula: string): string[] {
  const refs: string[] = [];
  const regex = /\[([^\]]+)\]/g;
  let match;
  while ((match = regex.exec(formula)) !== null) {
    refs.push(match[1]);
  }
  return refs;
}

// Resolve a field reference to a value from a row
// Supports both [field_name] and [Field Label]
function resolveFieldRef(ref: string, row: any, fieldMap: Map<string, string>): any {
  // Direct name match
  if (row[ref] !== undefined) return row[ref];
  // Label→name map lookup
  const name = fieldMap.get(ref);
  if (name && row[name] !== undefined) return row[name];
  return null;
}

// Safe math evaluator (no eval) — supports +, -, *, /, parentheses, numbers
function evalMathExpr(expr: string): number | null {
  try {
    // Tokenize
    const tokens: (number | string)[] = [];
    let i = 0;
    const s = expr.replace(/\s/g, "");
    while (i < s.length) {
      if ((s[i] >= "0" && s[i] <= "9") || s[i] === ".") {
        let num = "";
        while (i < s.length && ((s[i] >= "0" && s[i] <= "9") || s[i] === ".")) { num += s[i]; i++; }
        tokens.push(parseFloat(num));
      } else if ("+-*/()".includes(s[i])) {
        // Handle unary minus
        if (s[i] === "-" && (tokens.length === 0 || tokens[tokens.length - 1] === "(")) {
          tokens.push(0);
        }
        tokens.push(s[i]);
        i++;
      } else {
        return null; // Unexpected character
      }
    }

    // Shunting-yard → RPN
    const output: (number | string)[] = [];
    const ops: string[] = [];
    const prec: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 };
    for (const t of tokens) {
      if (typeof t === "number") { output.push(t); }
      else if ("+-*/".includes(t)) {
        while (ops.length && ops[ops.length - 1] !== "(" && (prec[ops[ops.length - 1]] || 0) >= (prec[t] || 0)) {
          output.push(ops.pop()!);
        }
        ops.push(t);
      } else if (t === "(") { ops.push(t); }
      else if (t === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") { output.push(ops.pop()!); }
        ops.pop(); // remove "("
      }
    }
    while (ops.length) { output.push(ops.pop()!); }

    // Evaluate RPN
    const stack: number[] = [];
    for (const t of output) {
      if (typeof t === "number") { stack.push(t); }
      else {
        const b = stack.pop()!;
        const a = stack.pop()!;
        switch (t) {
          case "+": stack.push(a + b); break;
          case "-": stack.push(a - b); break;
          case "*": stack.push(a * b); break;
          case "/": stack.push(b !== 0 ? a / b : 0); break;
        }
      }
    }
    return stack.length === 1 ? stack[0] : null;
  } catch {
    return null;
  }
}

// Evaluate a single formula for a given row
// Supports: [field] refs, arithmetic, IF(cond, then, else), basic functions
function evaluateFormula(formula: string, row: any, fieldMap: Map<string, string>, allRows?: any[]): any {
  if (!formula || !formula.trim()) return null;
  let expr = formula.trim();

  // Handle IF(condition, then, else)
  const ifMatch = expr.match(/^IF\s*\((.+)\)$/i);
  if (ifMatch) {
    const inner = ifMatch[1];
    // Simple split on top-level commas (not inside nested parens)
    const parts = splitTopLevel(inner, ",");
    if (parts.length >= 2) {
      const condStr = parts[0].trim();
      const thenStr = parts[1].trim();
      const elseStr = parts.length >= 3 ? parts[2].trim() : "0";
      const condResult = evaluateCondition(condStr, row, fieldMap);
      return evaluateFormula(condResult ? thenStr : elseStr, row, fieldMap, allRows);
    }
  }

  // Handle aggregate functions: SUM([field]), AVG([field]), COUNT([field]), MIN([field]), MAX([field])
  const aggMatch = expr.match(/^(SUM|AVG|COUNT|COUNTD|MIN|MAX|MEDIAN)\s*\(\s*\[([^\]]+)\]\s*\)$/i);
  if (aggMatch && allRows) {
    const fn = aggMatch[1].toUpperCase();
    const ref = aggMatch[2];
    const vals = allRows.map(r => {
      const v = resolveFieldRef(ref, r, fieldMap);
      return v != null ? Number(v) : NaN;
    }).filter(v => !isNaN(v));
    return calculateAggregation(fn, vals, allRows.length);
  }

  // Handle ABS, ROUND, CEILING, FLOOR, POWER, SQRT, LOG, LN
  const mathFnMatch = expr.match(/^(ABS|ROUND|CEILING|FLOOR|POWER|SQRT|LOG|LN)\s*\((.+)\)$/i);
  if (mathFnMatch) {
    const fn = mathFnMatch[1].toUpperCase();
    const args = splitTopLevel(mathFnMatch[2], ",").map(a => evaluateFormula(a.trim(), row, fieldMap, allRows));
    const a = Number(args[0]) || 0;
    const b = Number(args[1]) || 0;
    switch (fn) {
      case "ABS": return Math.abs(a);
      case "ROUND": return Number(a.toFixed(b || 0));
      case "CEILING": return Math.ceil(a);
      case "FLOOR": return Math.floor(a);
      case "POWER": return Math.pow(a, b);
      case "SQRT": return Math.sqrt(a);
      case "LOG": return b > 0 ? Math.log(a) / Math.log(b) : Math.log10(a);
      case "LN": return Math.log(a);
    }
  }

  // Replace all [FieldRef] with numeric values
  expr = expr.replace(/\[([^\]]+)\]/g, (_, ref) => {
    const val = resolveFieldRef(ref, row, fieldMap);
    const num = Number(val);
    return isNaN(num) ? "0" : String(num);
  });

  // Try to evaluate as pure math expression
  const mathResult = evalMathExpr(expr);
  if (mathResult !== null) return mathResult;

  // If it's a simple string/number, return as-is
  const numVal = Number(expr);
  if (!isNaN(numVal)) return numVal;
  return expr.replace(/^["']|["']$/g, "");
}

// Split string on delimiter at top-level (not inside parentheses)
function splitTopLevel(str: string, delimiter: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") depth++;
    else if (str[i] === ")") depth--;
    if (str[i] === delimiter && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += str[i];
    }
  }
  parts.push(current);
  return parts;
}

// Evaluate a simple condition: [field] > 100, [field] = "value", etc.
function evaluateCondition(condStr: string, row: any, fieldMap: Map<string, string>): boolean {
  // Support: >, <, >=, <=, =, !=, <>
  const opMatch = condStr.match(/(.+?)\s*(>=|<=|!=|<>|>|<|=)\s*(.+)/);
  if (!opMatch) return false;
  const left = evaluateFormula(opMatch[1].trim(), row, fieldMap);
  const right = evaluateFormula(opMatch[3].trim(), row, fieldMap);
  const lNum = Number(left);
  const rNum = Number(right);
  const useNum = !isNaN(lNum) && !isNaN(rNum);
  switch (opMatch[2]) {
    case ">": return useNum ? lNum > rNum : String(left) > String(right);
    case "<": return useNum ? lNum < rNum : String(left) < String(right);
    case ">=": return useNum ? lNum >= rNum : String(left) >= String(right);
    case "<=": return useNum ? lNum <= rNum : String(left) <= String(right);
    case "=": return useNum ? lNum === rNum : String(left) === String(right);
    case "!=": case "<>": return useNum ? lNum !== rNum : String(left) !== String(right);
  }
  return false;
}

// Inject calculated field values into source data rows
function injectCalculatedFields(sourceData: any[], calculatedFields: any[]): any[] {
  if (!calculatedFields?.length || !sourceData.length) return sourceData;

  // Build field map: label→name for all existing fields from first row
  const fieldMap = new Map<string, string>();
  const sampleRow = sourceData[0];
  Object.keys(sampleRow).forEach(k => {
    fieldMap.set(k, k); // name→name identity
  });
  // Also map from field labels if calculatedFields reference them
  calculatedFields.forEach(cf => {
    if (cf.label && cf.name) fieldMap.set(cf.label, cf.name);
  });

  // Sort calculated fields by dependency order (fields that reference other calc fields go last)
  const calcNames = new Set(calculatedFields.map((cf: any) => cf.name));
  const sorted = [...calculatedFields].sort((a: any, b: any) => {
    const aRefs = extractFieldRefs(a.formula);
    const bRefs = extractFieldRefs(b.formula);
    const aDepsOnCalc = aRefs.some(r => calcNames.has(r));
    const bDepsOnCalc = bRefs.some(r => calcNames.has(r));
    if (aDepsOnCalc && !bDepsOnCalc) return 1;
    if (!aDepsOnCalc && bDepsOnCalc) return -1;
    return 0;
  });

  return sourceData.map(row => {
    const newRow = { ...row };
    sorted.forEach((cf: any) => {
      try {
        newRow[cf.name] = evaluateFormula(cf.formula, newRow, fieldMap, sourceData);
      } catch (e) {
        console.warn(`[CalcField] Error evaluating "${cf.name}": ${e}`);
        newRow[cf.name] = null;
      }
    });
    return newRow;
  });
}

// Função pura para processar dados (não é um hook)
export function processDashData(config: ProcessDataConfig) {
  const { rowShelf, colShelf, sourceData, calculatedFields } = config;

  // Inject calculated fields into source data before processing
  const enrichedData = calculatedFields?.length ? injectCalculatedFields(sourceData, calculatedFields) : sourceData;

  console.log("[DataProcessor] Processing data with config:", { 
    rowShelfLength: rowShelf.length, 
    colShelfLength: colShelf.length,
    sourceDataLength: enrichedData.length,
    calculatedFieldsCount: calculatedFields?.length || 0,
  });

  // Se não há dimensões ou medidas, retornar vazio
  if (rowShelf.length === 0 && colShelf.length === 0) {
    console.log("[DataProcessor] No shelves configured");
    return [];
  }

  // Coletar todas as dimensões e medidas
  const allFields = [...rowShelf, ...colShelf];
  const dimensions = allFields.filter((item: any) => 
    item.field.type === "dimension" || item.field.type === "date"
  );
  const measures = allFields.filter((item: any) => 
    item.field.type === "measure"
  );

  console.log("[DataProcessor] Dimensions:", dimensions.map((d: any) => d.field.name));
  console.log("[DataProcessor] Measures:", measures.map((m: any) => ({ 
    name: m.field.name, 
    aggFunc: m.aggFunc, 
    fieldAggregation: m.field.aggregation 
  })));

  // Helper: resolve a função de agregação de um item (pode estar em aggFunc OU field.aggregation)
  const resolveAggFunc = (item: any): string | null => {
    return item.aggFunc || item.field?.aggregation || null;
  };

  // Caso 1: Só dimensões (sem medidas) - retornar dados detalhados
  if (dimensions.length > 0 && measures.length === 0) {
    console.log("[DataProcessor] Only dimensions, returning raw data");
    return enrichedData.slice(0, 1000).map((row: any) => {
      const result: any = {};
      allFields.forEach((field: any) => {
        result[field.field.name] = row[field.field.name];
      });
      return result;
    });
  }

  // Caso 2: Só medidas (sem dimensões) - agregação total
  if (dimensions.length === 0 && measures.length > 0) {
    console.log("[DataProcessor] Only measures, calculating total aggregation");
    const result: any = { _total: "Total" };
    
    measures.forEach((measure: any) => {
      const aggFunc = resolveAggFunc(measure);
      const values = enrichedData
        .map((r: any) => r[measure.field.name])
        .filter((v: any) => v != null);
      
      result[measure.field.name] = calculateAggregation(
        aggFunc,
        values,
        enrichedData.length
      );
    });

    return [result];
  }

  // Caso 3: Dimensões + Medidas - verificar se precisa agregar
  // Resolve aggFunc de AMBAS as fontes possíveis: item.aggFunc e item.field.aggregation
  const hasAggregation = measures.some((m: any) => {
    const agg = resolveAggFunc(m);
    return agg && !["ATTR", "NONE"].includes(agg);
  });

  console.log("[DataProcessor] Has aggregation:", hasAggregation);

  // Se não há agregação, retornar dados detalhados
  if (!hasAggregation) {
    console.log("[DataProcessor] No aggregation needed, returning detailed data");
    return enrichedData.slice(0, 1000).map((row: any) => {
      const result: any = {};
      allFields.forEach((field: any) => {
        result[field.field.name] = row[field.field.name];
      });
      return result;
    });
  }

  // Agrupar por TODAS as dimensões e calcular agregações
  console.log("[DataProcessor] Aggregating by all dimensions");
  const groupedData = new Map<string, any>();

  enrichedData.forEach((row: any) => {
    // Criar chave composta com todas as dimensões
    const keyParts = dimensions.map((dim: any) => 
      String(row[dim.field.name] || "null")
    );
    const key = keyParts.join("|||");
    
    if (!groupedData.has(key)) {
      const groupRow: any = { _rows: [] };
      dimensions.forEach((dim: any) => {
        groupRow[dim.field.name] = row[dim.field.name];
      });
      groupedData.set(key, groupRow);
    }

    groupedData.get(key)._rows.push(row);
  });

  console.log("[DataProcessor] Groups formed:", groupedData.size);

  // Calcular medidas para cada grupo
  const result = Array.from(groupedData.values()).map(group => {
    const result: any = {};
    
    // Copiar dimensões
    dimensions.forEach((dim: any) => {
      result[dim.field.name] = group[dim.field.name];
    });

    // Calcular medidas
    measures.forEach((measure: any) => {
      const rows = group._rows;
      const aggFunc = resolveAggFunc(measure);
      const values = rows
        .map((r: any) => r[measure.field.name])
        .filter((v: any) => v != null);

      result[measure.field.name] = calculateAggregation(
        aggFunc,
        values,
        rows.length
      );
    });

    return result;
  });

  console.log("[DataProcessor] Final result:", result.length, "rows");
  console.log("[DataProcessor] Sample output:", result.slice(0, 3));
  return result;
}

// Hook que usa a função pura com memoization
export function useDashDataProcessor(config: ProcessDataConfig) {
  return useMemo(() => processDashData(config), [
    config.rowShelf, 
    config.colShelf, 
    config.sourceData,
    config.calculatedFields
  ]);
}

// Função auxiliar para calcular agregações
function calculateAggregation(
  aggFunc: string | null,
  values: any[],
  rowCount: number
): any {
  switch (aggFunc) {
    case "SUM":
      return values.reduce((sum: number, v: number) => sum + Number(v), 0);
    
    case "AVG":
      return values.length > 0 
        ? values.reduce((sum: number, v: number) => sum + Number(v), 0) / values.length 
        : 0;
    
    case "COUNT":
      return rowCount;
    
    case "COUNT_DISTINCT":
    case "COUNTD":
      return new Set(values).size;
    
    case "MIN":
      return values.length > 0 ? Math.min(...values.map(Number)) : 0;
    
    case "MAX":
      return values.length > 0 ? Math.max(...values.map(Number)) : 0;
    
    case "ATTR":
    case "NONE":
      return values.length > 0 ? values[0] : null;
    
    default:
      return values.length > 0 ? values[0] : 0;
  }
}