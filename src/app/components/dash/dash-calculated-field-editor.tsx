/* ==================================================================== */
/*  Zenite Dash — Calculated Field Editor                              */
/*  Complete formula editor with all functions from analytics platform  */
/* ==================================================================== */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, MagnifyingGlass, FunctionIcon, Hash, CalendarBlank, TextAa,
  Lightning, ChartLine, MapPin, Check, Warning, Info,
} from "@phosphor-icons/react";

const ff = { fontFamily: "DM Sans, system-ui, sans-serif" };

interface CalculatedFieldEditorProps {
  field?: {
    id: string;
    name: string;
    label: string;
    formula: string;
    type: "dimension" | "measure" | "date";
    dataType: "string" | "number" | "date" | "boolean";
  };
  onSave: (field: {
    id: string;
    name: string;
    label: string;
    formula: string;
    type: "dimension" | "measure" | "date";
    dataType: "string" | "number" | "date" | "boolean";
  }) => void;
  onClose: () => void;
}

interface FunctionDef {
  name: string;
  category: string;
  syntax: string;
  description: string;
  example: string;
}

// Complete function library (organized from tableau-functions.md)
const FUNCTION_LIBRARY: FunctionDef[] = [
  // === Agregação ===
  { name: "SUM", category: "Agregação", syntax: "SUM(expression)", description: "Retorna a soma de todos os valores", example: "SUM([Vendas])" },
  { name: "AVG", category: "Agregação", syntax: "AVG(expression)", description: "Retorna a média de todos os valores", example: "AVG([Lucro])" },
  { name: "COUNT", category: "Agregação", syntax: "COUNT(expression)", description: "Retorna o número de itens", example: "COUNT([Pedidos])" },
  { name: "COUNTD", category: "Agregação", syntax: "COUNTD(expression)", description: "Retorna o número de itens distintos", example: "COUNTD([Cliente])" },
  { name: "MIN", category: "Agregação", syntax: "MIN(expression)", description: "Retorna o valor mínimo", example: "MIN([Data])" },
  { name: "MAX", category: "Agregação", syntax: "MAX(expression)", description: "Retorna o valor máximo", example: "MAX([Preço])" },
  { name: "MEDIAN", category: "Agregação", syntax: "MEDIAN(expression)", description: "Retorna a mediana dos valores", example: "MEDIAN([Score])" },
  { name: "PERCENTILE", category: "Agregação", syntax: "PERCENTILE(expression, number)", description: "Retorna o percentil especificado", example: "PERCENTILE([Score], 0.75)" },
  { name: "STDEV", category: "Agregação", syntax: "STDEV(expression)", description: "Retorna o desvio padrão (amostra)", example: "STDEV([Lucro])" },
  { name: "STDEVP", category: "Agregação", syntax: "STDEVP(expression)", description: "Retorna o desvio padrão populacional", example: "STDEVP([Receita])" },
  { name: "VAR", category: "Agregação", syntax: "VAR(expression)", description: "Retorna a variância (amostra)", example: "VAR([Vendas])" },
  { name: "VARP", category: "Agregação", syntax: "VARP(expression)", description: "Retorna a variância populacional", example: "VARP([Quantidade])" },
  { name: "ATTR", category: "Agregação", syntax: "ATTR(expression)", description: "Retorna o valor único ou * se múltiplos", example: "ATTR([Categoria])" },
  
  // === Matemática ===
  { name: "ABS", category: "Matemática", syntax: "ABS(number)", description: "Retorna o valor absoluto", example: "ABS([Lucro])" },
  { name: "ROUND", category: "Matemática", syntax: "ROUND(number, [decimals])", description: "Arredonda para o número de casas decimais", example: "ROUND([Preço], 2)" },
  { name: "CEILING", category: "Matemática", syntax: "CEILING(number)", description: "Arredonda para cima", example: "CEILING([Quantidade])" },
  { name: "FLOOR", category: "Matemática", syntax: "FLOOR(number)", description: "Arredonda para baixo", example: "FLOOR([Desconto])" },
  { name: "SQRT", category: "Matemática", syntax: "SQRT(number)", description: "Retorna a raiz quadrada", example: "SQRT([Área])" },
  { name: "SQUARE", category: "Matemática", syntax: "SQUARE(number)", description: "Retorna o quadrado do número", example: "SQUARE([Lado])" },
  { name: "POWER", category: "Matemática", syntax: "POWER(number, power)", description: "Eleva à potência especificada", example: "POWER([Base], 2)" },
  { name: "EXP", category: "Matemática", syntax: "EXP(number)", description: "Retorna e elevado à potência", example: "EXP([Taxa])" },
  { name: "LN", category: "Matemática", syntax: "LN(number)", description: "Retorna o logaritmo natural", example: "LN([Valor])" },
  { name: "LOG", category: "Matemática", syntax: "LOG(number, [base])", description: "Retorna o logaritmo na base especificada", example: "LOG([Valor], 10)" },
  { name: "SIN", category: "Matemática", syntax: "SIN(number)", description: "Retorna o seno (em radianos)", example: "SIN([Ângulo])" },
  { name: "COS", category: "Matemática", syntax: "COS(number)", description: "Retorna o cosseno (em radianos)", example: "COS([Ângulo])" },
  { name: "TAN", category: "Matemática", syntax: "TAN(number)", description: "Retorna a tangente (em radianos)", example: "TAN([Ângulo])" },
  { name: "ASIN", category: "Matemática", syntax: "ASIN(number)", description: "Retorna o arco seno", example: "ASIN([Valor])" },
  { name: "ACOS", category: "Matemática", syntax: "ACOS(number)", description: "Retorna o arco cosseno", example: "ACOS([Valor])" },
  { name: "ATAN", category: "Matemática", syntax: "ATAN(number)", description: "Retorna o arco tangente", example: "ATAN([Valor])" },
  { name: "ATAN2", category: "Matemática", syntax: "ATAN2(y, x)", description: "Retorna o arco tangente de y/x", example: "ATAN2([Y], [X])" },
  { name: "DEGREES", category: "Matemática", syntax: "DEGREES(number)", description: "Converte radianos para graus", example: "DEGREES([Radianos])" },
  { name: "RADIANS", category: "Matemática", syntax: "RADIANS(number)", description: "Converte graus para radianos", example: "RADIANS([Graus])" },
  { name: "PI", category: "Matemática", syntax: "PI()", description: "Retorna o valor de PI", example: "PI()" },
  { name: "SIGN", category: "Matemática", syntax: "SIGN(number)", description: "Retorna -1, 0 ou 1 dependendo do sinal", example: "SIGN([Lucro])" },
  { name: "DIV", category: "Matemática", syntax: "DIV(integer1, integer2)", description: "Retorna a parte inteira da divisão", example: "DIV([Total], [Quantidade])" },
  
  // === String ===
  { name: "CONTAINS", category: "String", syntax: "CONTAINS(string, substring)", description: "Verifica se contém a substring", example: "CONTAINS([Nome], 'Silva')" },
  { name: "STARTSWITH", category: "String", syntax: "STARTSWITH(string, substring)", description: "Verifica se começa com a substring", example: "STARTSWITH([Email], 'admin')" },
  { name: "ENDSWITH", category: "String", syntax: "ENDSWITH(string, substring)", description: "Verifica se termina com a substring", example: "ENDSWITH([Arquivo], '.pdf')" },
  { name: "FIND", category: "String", syntax: "FIND(string, substring, [start])", description: "Retorna a posição da substring", example: "FIND([Texto], '@')" },
  { name: "FINDNTH", category: "String", syntax: "FINDNTH(string, substring, occurrence)", description: "Retorna a posição da n-ésima ocorrência", example: "FINDNTH([Texto], '-', 2)" },
  { name: "LEFT", category: "String", syntax: "LEFT(string, number)", description: "Retorna os caracteres da esquerda", example: "LEFT([Nome], 5)" },
  { name: "RIGHT", category: "String", syntax: "RIGHT(string, number)", description: "Retorna os caracteres da direita", example: "RIGHT([Código], 3)" },
  { name: "MID", category: "String", syntax: "MID(string, start, [length])", description: "Retorna substring do meio", example: "MID([Texto], 5, 10)" },
  { name: "LEN", category: "String", syntax: "LEN(string)", description: "Retorna o comprimento da string", example: "LEN([Descrição])" },
  { name: "LOWER", category: "String", syntax: "LOWER(string)", description: "Converte para minúsculas", example: "LOWER([Nome])" },
  { name: "UPPER", category: "String", syntax: "UPPER(string)", description: "Converte para maiúsculas", example: "UPPER([Sigla])" },
  { name: "TRIM", category: "String", syntax: "TRIM(string)", description: "Remove espaços no início e fim", example: "TRIM([Nome])" },
  { name: "LTRIM", category: "String", syntax: "LTRIM(string)", description: "Remove espaços à esquerda", example: "LTRIM([Texto])" },
  { name: "RTRIM", category: "String", syntax: "RTRIM(string)", description: "Remove espaços à direita", example: "RTRIM([Texto])" },
  { name: "REPLACE", category: "String", syntax: "REPLACE(string, substring, replacement)", description: "Substitui substring por outra", example: "REPLACE([Texto], 'a', 'e')" },
  { name: "SPLIT", category: "String", syntax: "SPLIT(string, delimiter, token)", description: "Divide string e retorna token", example: "SPLIT([Email], '@', 1)" },
  { name: "SPACE", category: "String", syntax: "SPACE(number)", description: "Retorna string com n espaços", example: "SPACE(5)" },
  { name: "ASCII", category: "String", syntax: "ASCII(string)", description: "Retorna o código ASCII do primeiro caractere", example: "ASCII('A')" },
  { name: "CHAR", category: "String", syntax: "CHAR(number)", description: "Retorna o caractere do código ASCII", example: "CHAR(65)" },
  
  // === Data ===
  { name: "NOW", category: "Data", syntax: "NOW()", description: "Retorna data e hora atuais", example: "NOW()" },
  { name: "TODAY", category: "Data", syntax: "TODAY()", description: "Retorna a data atual", example: "TODAY()" },
  { name: "DATE", category: "Data", syntax: "DATE(expression)", description: "Converte para data", example: "DATE('2024-01-15')" },
  { name: "DATETIME", category: "Data", syntax: "DATETIME(expression)", description: "Converte para datetime", example: "DATETIME('2024-01-15 14:30')" },
  { name: "DATEADD", category: "Data", syntax: "DATEADD(date_part, interval, date)", description: "Adiciona intervalo à data", example: "DATEADD('month', 3, [Data])" },
  { name: "DATEDIFF", category: "Data", syntax: "DATEDIFF(date_part, date1, date2)", description: "Diferença entre datas", example: "DATEDIFF('day', [Início], [Fim])" },
  { name: "DATETRUNC", category: "Data", syntax: "DATETRUNC(date_part, date)", description: "Trunca data para o nível especificado", example: "DATETRUNC('month', [Data])" },
  { name: "DATEPART", category: "Data", syntax: "DATEPART(date_part, date)", description: "Extrai parte da data como inteiro", example: "DATEPART('year', [Data])" },
  { name: "DATENAME", category: "Data", syntax: "DATENAME(date_part, date)", description: "Extrai parte da data como string", example: "DATENAME('month', [Data])" },
  { name: "DATEPARSE", category: "Data", syntax: "DATEPARSE(format, string)", description: "Converte string formatada em data", example: "DATEPARSE('dd/MM/yyyy', [Texto])" },
  { name: "YEAR", category: "Data", syntax: "YEAR(date)", description: "Extrai o ano", example: "YEAR([Data])" },
  { name: "QUARTER", category: "Data", syntax: "QUARTER(date)", description: "Extrai o trimestre (1-4)", example: "QUARTER([Data])" },
  { name: "MONTH", category: "Data", syntax: "MONTH(date)", description: "Extrai o mês (1-12)", example: "MONTH([Data])" },
  { name: "WEEK", category: "Data", syntax: "WEEK(date)", description: "Extrai a semana do ano", example: "WEEK([Data])" },
  { name: "DAY", category: "Data", syntax: "DAY(date)", description: "Extrai o dia do mês", example: "DAY([Data])" },
  { name: "ISDATE", category: "Data", syntax: "ISDATE(string)", description: "Verifica se é uma data válida", example: "ISDATE([Texto])" },
  { name: "MAKEDATE", category: "Data", syntax: "MAKEDATE(year, month, day)", description: "Cria data a partir de números", example: "MAKEDATE([Ano], [Mês], [Dia])" },
  { name: "MAKEDATETIME", category: "Data", syntax: "MAKEDATETIME(date, time)", description: "Combina data e hora", example: "MAKEDATETIME([Data], [Hora])" },
  { name: "MAKETIME", category: "Data", syntax: "MAKETIME(hour, minute, second)", description: "Cria hora a partir de números", example: "MAKETIME([Hora], [Min], [Seg])" },
  
  // === Lógica ===
  { name: "IF", category: "Lógica", syntax: "IF <test> THEN <then> [ELSEIF <test> THEN <then>] [ELSE <default>] END", description: "Condicional com múltiplas condições", example: "IF [Vendas] > 1000 THEN 'Alto' ELSE 'Baixo' END" },
  { name: "IIF", category: "Lógica", syntax: "IIF(<test>, <then>, <else>, [<unknown>])", description: "Condicional inline simples", example: "IIF([Lucro] > 0, 'Positivo', 'Negativo')" },
  { name: "CASE", category: "Lógica", syntax: "CASE <expr> WHEN <value> THEN <return> [ELSE <default>] END", description: "Switch case para múltiplos valores", example: "CASE [Região] WHEN 'Sul' THEN 1 WHEN 'Norte' THEN 2 END" },
  { name: "AND", category: "Lógica", syntax: "<expr1> AND <expr2>", description: "E lógico", example: "[Vendas] > 100 AND [Lucro] > 0" },
  { name: "OR", category: "Lógica", syntax: "<expr1> OR <expr2>", description: "OU lógico", example: "[Região] = 'Sul' OR [Região] = 'Norte'" },
  { name: "NOT", category: "Lógica", syntax: "NOT <expr>", description: "Negação lógica", example: "NOT [Inativo]" },
  { name: "IN", category: "Lógica", syntax: "<expr> IN <set>", description: "Verifica se está no conjunto", example: "[Região] IN ('Sul', 'Norte', 'Leste')" },
  { name: "IFNULL", category: "Lógica", syntax: "IFNULL(expr1, expr2)", description: "Retorna expr2 se expr1 for nulo", example: "IFNULL([Desconto], 0)" },
  { name: "ISNULL", category: "Lógica", syntax: "ISNULL(expression)", description: "Verifica se é nulo", example: "ISNULL([Email])" },
  { name: "ZN", category: "Lógica", syntax: "ZN(expression)", description: "Converte nulo em zero", example: "ZN([Desconto])" },
  { name: "ISEMPTY", category: "Lógica", syntax: "ISEMPTY(string)", description: "Verifica se string está vazia", example: "ISEMPTY([Nome])" },
  
  // === Conversão ===
  { name: "INT", category: "Conversão", syntax: "INT(expression)", description: "Converte para inteiro", example: "INT([Preço])" },
  { name: "FLOAT", category: "Conversão", syntax: "FLOAT(expression)", description: "Converte para decimal", example: "FLOAT([Texto])" },
  { name: "STR", category: "Conversão", syntax: "STR(expression)", description: "Converte para string", example: "STR([Quantidade])" },
  { name: "BOOL", category: "Conversão", syntax: "BOOL(expression)", description: "Converte para booleano", example: "BOOL([Status])" },
];

export function CalculatedFieldEditor({ field, onSave, onClose }: CalculatedFieldEditorProps) {
  const [name, setName] = useState(field?.label || "");
  const [formula, setFormula] = useState(field?.formula || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [formulaError, setFormulaError] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(FUNCTION_LIBRARY.map(f => f.category));
    return ["Todas", ...Array.from(cats).sort()];
  }, []);

  const filteredFunctions = useMemo(() => {
    return FUNCTION_LIBRARY.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todas" || f.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleInsertFunction = (fn: FunctionDef) => {
    setFormula(prev => prev + fn.syntax);
    setFormulaError(null);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setFormulaError("O nome do campo é obrigatório");
      return;
    }
    if (!formula.trim()) {
      setFormulaError("A fórmula é obrigatória");
      return;
    }

    // Basic validation
    const hasOpenBracket = (formula.match(/\[/g) || []).length;
    const hasCloseBracket = (formula.match(/\]/g) || []).length;
    if (hasOpenBracket !== hasCloseBracket) {
      setFormulaError("Colchetes desbalanceados na fórmula");
      return;
    }

    const hasOpenParen = (formula.match(/\(/g) || []).length;
    const hasCloseParen = (formula.match(/\)/g) || []).length;
    if (hasOpenParen !== hasCloseParen) {
      setFormulaError("Parênteses desbalanceados na fórmula");
      return;
    }

    // Detect type from formula
    let type: "dimension" | "measure" | "date" = "measure";
    let dataType: "string" | "number" | "date" | "boolean" = "number";

    // Check if formula uses aggregation functions
    const aggFunctions = ["SUM", "AVG", "COUNT", "COUNTD", "MIN", "MAX", "MEDIAN", "STDEV", "VAR"];
    const hasAgg = aggFunctions.some(fn => formula.toUpperCase().includes(fn + "("));
    if (hasAgg) {
      type = "measure";
      dataType = "number";
    }

    // Check if formula uses date functions
    const dateFunctions = ["DATE", "DATETIME", "NOW", "TODAY", "DATEADD", "DATEDIFF"];
    const hasDate = dateFunctions.some(fn => formula.toUpperCase().includes(fn));
    if (hasDate) {
      type = "date";
      dataType = "date";
    }

    // Check if formula uses string functions
    const stringFunctions = ["CONTAINS", "LEFT", "RIGHT", "UPPER", "LOWER", "TRIM"];
    const hasString = stringFunctions.some(fn => formula.toUpperCase().includes(fn));
    if (hasString) {
      type = "dimension";
      dataType = "string";
    }

    // Check if formula uses boolean logic
    if (formula.toUpperCase().includes("IF ") || formula.toUpperCase().includes("IIF(") || 
        formula.toUpperCase().includes("AND ") || formula.toUpperCase().includes("OR ")) {
      dataType = "boolean";
    }

    onSave({
      id: field?.id || `calc_${Date.now()}`,
      name: name.toLowerCase().replace(/\s+/g, "_"),
      label: name,
      formula,
      type,
      dataType,
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-[10000]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[16px] w-[900px] h-[700px] flex flex-col border border-[#DDE3EC]"
        style={{ boxShadow: "0px 20px 60px rgba(18,34,50,0.2)", ...ff }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF1F6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#E5F4F9] flex items-center justify-center">
              <FunctionIcon size={16} className="text-[#0483AB]" weight="bold" />
            </div>
            <div>
              <h3 className="text-[#122232] font-semibold" style={{ fontSize: 16, letterSpacing: -0.4 }}>
                {field ? "Editar Campo Calculado" : "Novo Campo Calculado"}
              </h3>
              <p className="text-[#98989D]" style={{ fontSize: 12, letterSpacing: -0.2 }}>
                Crie fórmulas personalizadas usando funções e campos existentes
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#98989D] hover:text-[#122232] transition-colors">
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left: Function Library */}
          <div className="w-[320px] border-r border-[#EEF1F6] flex flex-col bg-[#FAFBFC]">
            <div className="p-4 border-b border-[#EEF1F6]">
              <div className="relative">
                <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98989D]" weight="bold" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar funções..."
                  className="w-full pl-9 pr-3 py-2 rounded-[8px] border border-[#DDE3EC] text-[#122232] placeholder:text-[#98989D] focus:outline-none focus:ring-2 focus:ring-[#0483AB]/20"
                  style={{ fontSize: 13, letterSpacing: -0.3, ...ff }}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="px-3 py-2 overflow-x-auto">
              <div className="flex gap-1 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-[6px] transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-[#0483AB] text-white"
                        : "bg-white text-[#98989D] hover:bg-[#F6F7F9] hover:text-[#122232] border border-[#EEF1F6]"
                    }`}
                    style={{ fontSize: 11, fontWeight: 600, letterSpacing: -0.2, ...ff }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Functions List */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
              <div className="space-y-1">
                {filteredFunctions.map((fn) => (
                  <button
                    key={fn.name}
                    onClick={() => handleInsertFunction(fn)}
                    className="w-full text-left p-3 rounded-[8px] hover:bg-white border border-transparent hover:border-[#DDE3EC] transition-all group"
                  >
                    <div className="flex items-start gap-2">
                      <Lightning size={14} className="text-[#0483AB] mt-0.5 flex-shrink-0" weight="bold" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[#122232] font-mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                          {fn.name}
                        </div>
                        <div className="text-[#98989D] truncate" style={{ fontSize: 11, letterSpacing: -0.2 }}>
                          {fn.description}
                        </div>
                        <div className="text-[#0483AB] font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 10, letterSpacing: -0.1 }}>
                          {fn.example}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Editor */}
          <div className="flex-1 flex flex-col">
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
              {/* Name Input */}
              <div>
                <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                  Nome do Campo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Margem de Lucro"
                  className="w-full px-3 py-2.5 rounded-[8px] border border-[#DDE3EC] text-[#122232] placeholder:text-[#98989D] focus:outline-none focus:ring-2 focus:ring-[#0483AB]/20"
                  style={{ fontSize: 14, letterSpacing: -0.3, ...ff }}
                />
              </div>

              {/* Formula Editor */}
              <div className="flex-1 flex flex-col">
                <label className="block text-[#4E6987] mb-2" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                  Fórmula
                </label>
                <textarea
                  value={formula}
                  onChange={(e) => {
                    setFormula(e.target.value);
                    setFormulaError(null);
                  }}
                  placeholder="Digite sua fórmula aqui. Ex: [Vendas] - [Custos]"
                  className="flex-1 px-4 py-3 rounded-[10px] border border-[#DDE3EC] text-[#122232] placeholder:text-[#98989D] focus:outline-none focus:ring-2 focus:ring-[#0483AB]/20 font-mono resize-none"
                  style={{ fontSize: 13, letterSpacing: -0.2, lineHeight: 1.6, minHeight: 180 }}
                />
                {formulaError && (
                  <div className="mt-2 flex items-start gap-2 px-3 py-2 rounded-[8px] bg-[#FFF4F2] border border-[#FF6B6B]/20">
                    <Warning size={16} className="text-[#FF6B6B] mt-0.5 flex-shrink-0" weight="bold" />
                    <span className="text-[#FF6B6B]" style={{ fontSize: 12, letterSpacing: -0.2 }}>
                      {formulaError}
                    </span>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="px-4 py-3 rounded-[10px] bg-[#F6F7F9] border border-[#EEF1F6]">
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-[#0483AB] mt-0.5 flex-shrink-0" weight="bold" />
                  <div className="flex-1">
                    <div className="text-[#122232] mb-1" style={{ fontSize: 12, fontWeight: 600, letterSpacing: -0.2 }}>
                      Dicas de uso:
                    </div>
                    <ul className="text-[#4E6987] space-y-1" style={{ fontSize: 11, letterSpacing: -0.2 }}>
                      <li>• Use [Nome do Campo] para referenciar campos existentes</li>
                      <li>• Clique nas funções à esquerda para inseri-las automaticamente</li>
                      <li>• Operadores: + - * / % (aritmética), = != &lt; &gt; &lt;= &gt;= (comparação)</li>
                      <li>• Use parênteses () para controlar a ordem das operações</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#EEF1F6] flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-[8px] text-[#4E6987] hover:bg-[#F6F7F9] transition-colors"
                style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-[8px] bg-[#0483AB] text-white hover:bg-[#025E7B] transition-colors flex items-center gap-2"
                style={{ fontSize: 13, fontWeight: 600, letterSpacing: -0.3, ...ff }}
              >
                <Check size={16} weight="bold" />
                {field ? "Atualizar Campo" : "Criar Campo"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
