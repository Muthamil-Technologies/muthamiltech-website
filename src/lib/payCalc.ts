import data from "../data/workPay.json";

// Take-home and part-time pay estimates, the same rules as the JapanOne app, for reference only.
// Rates are for 2026; src/data/workPay.json lists the official sources.
export type Prefecture = { name: string; ja: string; health: number; wage: number; previousWage: number; wageFrom: string };

export const PREFECTURES = data.prefectures as Prefecture[];
export const PAY_SOURCES = data.sources as { name: string; url: string }[];
export const PAY_CHECKED = data.checked;
export const TOKYO = PREFECTURES.find((p) => p.name === "Tokyo")!;

export const INCOME_TAX_FROM = 1_780_000;
export const RESIDENT_TAX_FROM = 1_190_000;
export const STUDENT_HOURS = 28;
export const INSURANCE_HOURS = 20;

const PENSION = 0.0915;
const CARE = 0.0162;
const CHILD_SUPPORT = 0.0023;
const EMPLOYMENT = 0.005;
const PENSION_MONTH_CAP = 650_000;
const PENSION_BONUS_CAP = 1_500_000;
const HEALTH_BONUS_YEAR_CAP = 5_730_000;

/** Each pair: pay from this many yen is charged at this standard pay. */
const GRADES: [number, number][] = [
  [0, 58000], [63000, 68000], [73000, 78000], [83000, 88000], [93000, 98000], [101000, 104000], [107000, 110000],
  [114000, 118000], [122000, 126000], [130000, 134000], [138000, 142000], [146000, 150000], [155000, 160000],
  [165000, 170000], [175000, 180000], [185000, 190000], [195000, 200000], [210000, 220000], [230000, 240000],
  [250000, 260000], [270000, 280000], [290000, 300000], [310000, 320000], [330000, 340000], [350000, 360000],
  [370000, 380000], [395000, 410000], [425000, 440000], [455000, 470000], [485000, 500000], [515000, 530000],
  [545000, 560000], [575000, 590000], [605000, 620000], [635000, 650000], [665000, 680000], [695000, 710000],
  [730000, 750000], [770000, 790000], [810000, 830000], [855000, 880000], [905000, 930000], [955000, 980000],
  [1005000, 1030000], [1055000, 1090000], [1115000, 1150000], [1175000, 1210000], [1235000, 1270000],
  [1295000, 1330000], [1355000, 1390000],
];

export function standardPay(monthly: number) {
  let grade = GRADES[0][1];
  for (const [from, g] of GRADES) {
    if (monthly < from) break;
    grade = g;
  }
  return grade;
}

export function employmentDeduction(income: number) {
  const d =
    income <= 1_800_000 ? Math.floor(income * 0.4) - 100_000
    : income <= 3_600_000 ? Math.floor(income * 0.3) + 80_000
    : income <= 6_600_000 ? Math.floor(income * 0.2) + 440_000
    : income <= 8_500_000 ? Math.floor(income * 0.1) + 1_100_000
    : 1_950_000;
  return Math.max(Math.min(d, income), Math.min(740_000, income));
}

const incomeTaxBasic = (i: number) =>
  i <= 4_890_000 ? 1_040_000 : i <= 6_550_000 ? 670_000 : i <= 23_500_000 ? 620_000
  : i <= 24_000_000 ? 480_000 : i <= 24_500_000 ? 320_000 : i <= 25_000_000 ? 160_000 : 0;

const residentTaxBasic = (i: number) =>
  i <= 24_000_000 ? 430_000 : i <= 24_500_000 ? 290_000 : i <= 25_000_000 ? 150_000 : 0;

const toThousand = (n: number) => Math.floor(Math.max(0, n) / 1000) * 1000;

export function incomeTax(salary: number, insurance = 0, dependents = 0) {
  const income = salary - employmentDeduction(salary);
  const t = toThousand(income - insurance - incomeTaxBasic(income) - dependents * 380_000);
  const tax =
    t <= 1_950_000 ? t * 0.05 : t <= 3_300_000 ? t * 0.1 - 97_500 : t <= 6_950_000 ? t * 0.2 - 427_500
    : t <= 9_000_000 ? t * 0.23 - 636_000 : t <= 18_000_000 ? t * 0.33 - 1_536_000
    : t <= 40_000_000 ? t * 0.4 - 2_796_000 : t * 0.45 - 4_796_000;
  return Math.floor((tax * 1.021) / 100) * 100;
}

export function residentTax(salary: number, insurance = 0, dependents = 0) {
  const income = salary - employmentDeduction(salary);
  if (income <= 450_000) return 0;
  const t = toThousand(income - insurance - residentTaxBasic(income) - dependents * 330_000);
  const adjustment = income <= 20_000_000 ? Math.floor((Math.min(t, 50_000) * 5) / 100) : 0;
  return Math.max(0, Math.floor(t / 10) - adjustment) + 5000;
}

export function estimatePay({ monthly, prefecture, bonus = 0, aged40To64 = false, dependents = 0 }: {
  monthly: number; prefecture: Prefecture; bonus?: number; aged40To64?: boolean; dependents?: number;
}) {
  const gross = monthly * 12 + bonus;
  const share = (prefecture.health / 100 + CHILD_SUPPORT + (aged40To64 ? CARE : 0)) / 2;
  const standard = standardPay(monthly);
  const bonusPayment = toThousand(Math.floor(bonus / 2));
  const monthHealth = Math.round(standard * share);
  const monthPension = Math.round(Math.min(standard, PENSION_MONTH_CAP) * PENSION);
  const monthEmployment = Math.round(monthly * EMPLOYMENT);
  const health = monthHealth * 12 + Math.round(Math.min(bonusPayment * 2, HEALTH_BONUS_YEAR_CAP) * share);
  const pension = monthPension * 12 + Math.round(Math.min(bonusPayment, PENSION_BONUS_CAP) * 2 * PENSION);
  const employment = Math.round(gross * EMPLOYMENT);
  const insurance = health + pension + employment;
  const income = incomeTax(gross, insurance, dependents);
  const resident = residentTax(gross, insurance, dependents);
  const taxShare = gross === 0 ? 0 : (monthly * 12) / gross;
  return {
    gross, health, pension, employment, incomeTax: income, residentTax: resident,
    takeHome: gross - insurance - income - resident,
    monthlyTakeHome: monthly - monthHealth - monthPension - monthEmployment - Math.round(((income + resident) * taxShare) / 12),
  };
}

export function estimatePartTime(hourly: number, hours: number) {
  const yearly = hourly * hours * 52;
  return { yearly, monthly: Math.round(yearly / 12), incomeTax: incomeTax(yearly), residentTax: residentTax(yearly) };
}

/** New minimum wages start on different days, so check the date. */
export function wageOn(p: Prefecture, day: Date) {
  return day < new Date(`${p.wageFrom}T00:00:00+09:00`) ? p.previousWage : p.wage;
}
