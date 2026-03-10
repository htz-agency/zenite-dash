/* ==================================================================== */
/*  Zenite Dash — Relative Date Utilities                              */
/*  Convert relative dates to actual date ranges                       */
/* ==================================================================== */

import type { RelativeDateValue, RelativeDatePreset, RelativeDateParametric } from "./dash-relative-date-picker";

export interface DateRange {
  start: Date;
  end: Date;
}

/* ══════════════════════════════════════════════════════════════════ */
/*  DATE HELPERS                                                      */
/* ══════════════════════════════════════════════════════════════════ */

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day; // Sunday = 0
  const start = new Date(d.setDate(diff));
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 6; // Saturday
  const end = new Date(d.setDate(diff));
  end.setHours(23, 59, 59, 999);
  return end;
}

function startOfMonth(date: Date): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfMonth(date: Date): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfQuarter(date: Date): Date {
  const d = new Date(date);
  const quarter = Math.floor(d.getMonth() / 3);
  d.setMonth(quarter * 3);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfQuarter(date: Date): Date {
  const d = new Date(date);
  const quarter = Math.floor(d.getMonth() / 3);
  d.setMonth(quarter * 3 + 3);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfYear(date: Date): Date {
  const d = new Date(date);
  d.setMonth(0);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfYear(date: Date): Date {
  const d = new Date(date);
  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function addQuarters(date: Date, quarters: number): Date {
  return addMonths(date, quarters * 3);
}

function addYears(date: Date, years: number): Date {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

/* ══════════════════════════════════════════════════════════════════ */
/*  CONVERT PRESET TO DATE RANGE                                     */
/* ══════════════════════════════════════════════════════════════════ */

function convertPresetToRange(preset: RelativeDatePreset, now: Date = new Date()): DateRange {
  const today = startOfDay(now);

  switch (preset) {
    // Days
    case "ONTEM":
      return { start: startOfDay(addDays(today, -1)), end: endOfDay(addDays(today, -1)) };
    case "HOJE":
      return { start: startOfDay(today), end: endOfDay(today) };
    case "AMANHÃ":
      return { start: startOfDay(addDays(today, 1)), end: endOfDay(addDays(today, 1)) };

    // Weeks
    case "SEMANA PASSADA": {
      const lastWeekStart = startOfWeek(addWeeks(today, -1));
      return { start: lastWeekStart, end: endOfWeek(lastWeekStart) };
    }
    case "ESTA SEMANA": {
      const thisWeekStart = startOfWeek(today);
      return { start: thisWeekStart, end: endOfWeek(thisWeekStart) };
    }
    case "PRÓXIMA SEMANA": {
      const nextWeekStart = startOfWeek(addWeeks(today, 1));
      return { start: nextWeekStart, end: endOfWeek(nextWeekStart) };
    }

    // Months
    case "MÊS PASSADO": {
      const lastMonth = addMonths(today, -1);
      return { start: startOfMonth(lastMonth), end: endOfMonth(lastMonth) };
    }
    case "ESTE MÊS": {
      return { start: startOfMonth(today), end: endOfMonth(today) };
    }
    case "PRÓXIMO MÊS": {
      const nextMonth = addMonths(today, 1);
      return { start: startOfMonth(nextMonth), end: endOfMonth(nextMonth) };
    }

    // Quarters
    case "TRIMESTRE PASSADO": {
      const lastQuarter = addQuarters(today, -1);
      return { start: startOfQuarter(lastQuarter), end: endOfQuarter(lastQuarter) };
    }
    case "ESTE TRIMESTRE": {
      return { start: startOfQuarter(today), end: endOfQuarter(today) };
    }
    case "PRÓXIMO TRIMESTRE": {
      const nextQuarter = addQuarters(today, 1);
      return { start: startOfQuarter(nextQuarter), end: endOfQuarter(nextQuarter) };
    }

    // Years
    case "ANO PASSADO": {
      const lastYear = addYears(today, -1);
      return { start: startOfYear(lastYear), end: endOfYear(lastYear) };
    }
    case "ESTE ANO": {
      return { start: startOfYear(today), end: endOfYear(today) };
    }
    case "PRÓXIMO ANO": {
      const nextYear = addYears(today, 1);
      return { start: startOfYear(nextYear), end: endOfYear(nextYear) };
    }

    default:
      return { start: today, end: endOfDay(today) };
  }
}

/* ══════════════════════════════════════════════════════════════════ */
/*  CONVERT PARAMETRIC TO DATE RANGE                                 */
/* ══════════════════════════════════════════════════════════════════ */

function convertParametricToRange(
  pattern: RelativeDateParametric,
  value: number,
  now: Date = new Date()
): DateRange {
  const today = startOfDay(now);

  switch (pattern) {
    // Days
    case "ÚLTIMOS n DIAS": {
      // Inclui hoje, começa n dias atrás
      const start = startOfDay(addDays(today, -value));
      const end = new Date(now); // até o segundo atual
      return { start, end };
    }
    case "PRÓXIMOS n DIAS": {
      // Filtro padrão: começa hoje, continua por n dias (inclui hoje)
      const start = startOfDay(today);
      const end = endOfDay(addDays(today, value - 1));
      return { start, end };
    }
    case "HÁ n DIAS": {
      // Não inclui hoje, exatamente n dias atrás
      const targetDay = addDays(today, -value);
      return { start: startOfDay(targetDay), end: endOfDay(targetDay) };
    }

    // Weeks
    case "ÚLTIMAS n SEMANAS": {
      // Começa no início da semana n semanas atrás, termina no fim da semana passada
      const startWeek = startOfWeek(addWeeks(today, -value));
      const endWeek = endOfWeek(addWeeks(today, -1));
      return { start: startWeek, end: endWeek };
    }
    case "PRÓXIMAS n SEMANAS": {
      // Começa no início da próxima semana, continua por n semanas
      const startWeek = startOfWeek(addWeeks(today, 1));
      const endWeek = endOfWeek(addWeeks(startWeek, value - 1));
      return { start: startWeek, end: endWeek };
    }
    case "HÁ n SEMANAS": {
      // Exatamente a semana n semanas atrás
      const targetWeek = startOfWeek(addWeeks(today, -value));
      return { start: targetWeek, end: endOfWeek(targetWeek) };
    }

    // Months
    case "ÚLTIMOS n MESES": {
      // Começa no início do mês n meses atrás, termina no fim do mês passado
      const startMonth = startOfMonth(addMonths(today, -value));
      const endMonth = endOfMonth(addMonths(today, -1));
      return { start: startMonth, end: endMonth };
    }
    case "PRÓXIMOS n MESES": {
      // Começa no início do próximo mês, continua por n meses
      const startMonth = startOfMonth(addMonths(today, 1));
      const endMonth = endOfMonth(addMonths(startMonth, value - 1));
      return { start: startMonth, end: endMonth };
    }
    case "HÁ n MESES": {
      // Exatamente o mês n meses atrás
      const targetMonth = addMonths(today, -value);
      return { start: startOfMonth(targetMonth), end: endOfMonth(targetMonth) };
    }

    // Quarters
    case "ÚLTIMOS n TRIMESTRES": {
      // Começa no início do trimestre n trimestres atrás, termina no fim do trimestre passado
      const startQuarter = startOfQuarter(addQuarters(today, -value));
      const endQuarter = endOfQuarter(addQuarters(today, -1));
      return { start: startQuarter, end: endQuarter };
    }
    case "PRÓXIMOS n TRIMESTRES": {
      // Começa no início do próximo trimestre, continua por n trimestres
      const startQuarter = startOfQuarter(addQuarters(today, 1));
      const endQuarter = endOfQuarter(addQuarters(startQuarter, value - 1));
      return { start: startQuarter, end: endQuarter };
    }
    case "HÁ n TRIMESTRES": {
      // Exatamente o trimestre n trimestres atrás
      const targetQuarter = addQuarters(today, -value);
      return { start: startOfQuarter(targetQuarter), end: endOfQuarter(targetQuarter) };
    }

    // Years
    case "ÚLTIMOS n ANOS": {
      // Começa no início do ano (n+1) anos atrás, termina no fim do ano passado
      const startYear = startOfYear(addYears(today, -(value + 1)));
      const endYear = endOfYear(addYears(today, -1));
      return { start: startYear, end: endYear };
    }
    case "PRÓXIMOS n ANOS": {
      // Começa no início do próximo ano, continua por n anos
      const startYear = startOfYear(addYears(today, 1));
      const endYear = endOfYear(addYears(startYear, value - 1));
      return { start: startYear, end: endYear };
    }
    case "HÁ n ANOS": {
      // Exatamente o ano n anos atrás
      const targetYear = addYears(today, -value);
      return { start: startOfYear(targetYear), end: endOfYear(targetYear) };
    }

    default:
      return { start: today, end: endOfDay(today) };
  }
}

/* ══════════════════════════════════════════════════════════════════ */
/*  MAIN EXPORT: CONVERT RELATIVE DATE TO RANGE                      */
/* ══════════════════════════════════════════════════════════════════ */

export function relativeDateToRange(value: RelativeDateValue, now: Date = new Date()): DateRange {
  if (value.type === "preset" && value.preset) {
    return convertPresetToRange(value.preset, now);
  } else if (value.type === "parametric" && value.parametric) {
    return convertParametricToRange(value.parametric.pattern, value.parametric.value, now);
  }
  // Fallback: hoje
  return { start: startOfDay(now), end: endOfDay(now) };
}

/* ══════════════════════════════════════════════════════════════════ */
/*  HELPER: CHECK IF DATE IS IN RANGE                                */
/* ══════════════════════════════════════════════════════════════════ */

export function isDateInRange(date: Date | string, range: DateRange): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return false;
  return d >= range.start && d <= range.end;
}
