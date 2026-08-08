import type { FitCategory, FootWidth } from '../types'

export interface SizeChartEntry {
  /** Числовой EU для сравнения с sizes товара */
  size: number
  /** Подпись для UI (например 25-26) */
  label: string
  /** Длина стельки, см */
  insole: number
}

/** Женская размерная сетка магазина */
export const WOMEN_SIZE_CHART: SizeChartEntry[] = [
  { size: 35, label: '35', insole: 22.5 },
  { size: 35.5, label: '35,5', insole: 22.8 },
  { size: 36, label: '36', insole: 23.0 },
  { size: 36.5, label: '36,5', insole: 23.3 },
  { size: 37, label: '37', insole: 23.5 },
  { size: 37.5, label: '37,5', insole: 23.8 },
  { size: 38, label: '38', insole: 24.0 },
  { size: 38.5, label: '38,5', insole: 24.5 },
  { size: 39, label: '39', insole: 25.0 },
  { size: 39.5, label: '39,5', insole: 25.5 },
  { size: 40, label: '40', insole: 26.0 },
  { size: 40.5, label: '40,5', insole: 26.5 },
  { size: 41, label: '41', insole: 27.0 },
  { size: 41.5, label: '41,5', insole: 27.3 },
  { size: 42, label: '42', insole: 27.5 },
  { size: 42.5, label: '42,5', insole: 28.5 },
  { size: 43, label: '43', insole: 29.5 },
]

/** Мужская размерная сетка магазина */
export const MEN_SIZE_CHART: SizeChartEntry[] = [
  { size: 39, label: '39', insole: 23.5 },
  { size: 39.5, label: '39,5', insole: 24.0 },
  { size: 40, label: '40', insole: 24.5 },
  { size: 40.5, label: '40,5', insole: 25.0 },
  { size: 41, label: '41', insole: 25.5 },
  { size: 41.5, label: '41,5', insole: 25.8 },
  { size: 42, label: '42', insole: 26.5 },
  { size: 42.5, label: '42,5', insole: 26.8 },
  { size: 43, label: '43', insole: 27.0 },
  { size: 43.5, label: '43,5', insole: 27.3 },
  { size: 44, label: '44', insole: 27.5 },
  { size: 44.5, label: '44,5', insole: 28.0 },
  { size: 45, label: '45', insole: 28.5 },
  { size: 45.5, label: '45,5', insole: 28.8 },
  { size: 46, label: '46', insole: 29.0 },
  { size: 46.5, label: '46,5', insole: 29.3 },
  { size: 47, label: '47', insole: 29.5 },
  { size: 47.5, label: '47,5', insole: 30.0 },
  { size: 48, label: '48', insole: 30.5 },
]

/** Детская размерная сетка магазина */
export const KIDS_SIZE_CHART: SizeChartEntry[] = [
  { size: 16.5, label: '16-17', insole: 9.7 },
  { size: 18, label: '18', insole: 10.4 },
  { size: 19, label: '19', insole: 11.1 },
  { size: 20, label: '20', insole: 11.7 },
  { size: 21, label: '21', insole: 12.4 },
  { size: 22, label: '22', insole: 13.1 },
  { size: 23, label: '23', insole: 13.7 },
  { size: 24, label: '24', insole: 14.4 },
  { size: 25.5, label: '25-26', insole: 15.35 },
  { size: 27, label: '27', insole: 16.4 },
  { size: 28, label: '28', insole: 17.1 },
  { size: 29, label: '29', insole: 17.7 },
  { size: 30, label: '30', insole: 18.4 },
  { size: 31.5, label: '31-32', insole: 19.35 },
  { size: 33, label: '33', insole: 20.4 },
  { size: 34, label: '34', insole: 21.0 },
  { size: 35, label: '35', insole: 21.7 },
  { size: 36, label: '36', insole: 22.4 },
  { size: 37, label: '37', insole: 23.0 },
  { size: 38, label: '38', insole: 23.7 },
]

export const SIZE_CHARTS: Record<FitCategory, SizeChartEntry[]> = {
  women: WOMEN_SIZE_CHART,
  men: MEN_SIZE_CHART,
  kids: KIDS_SIZE_CHART,
}

/** Нормализация «26,5» / «26.5» / «26» → number | null */
export function parseFootCm(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, '').replace(',', '.')
  if (!normalized) return null
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null
  const value = Number(normalized)
  if (!Number.isFinite(value) || value <= 0) return null
  return value
}

export function formatCm(value: number): string {
  return String(value).replace('.', ',')
}

export function formatSizeLabel(size: number, category: FitCategory): string {
  const entry = SIZE_CHARTS[category].find((e) => Math.abs(e.size - size) < 0.01)
  return entry?.label ?? String(size).replace('.', ',')
}

/**
 * Подбор EU: берём ближайший размер, где стелька ≥ длины стопы
 * (небольшой запас). Если стопа больше всех — максимальный размер.
 */
export function recommendSize(
  footLengthCm: number,
  category: FitCategory,
): SizeChartEntry {
  const chart = SIZE_CHARTS[category]
  const fitting = chart.filter((entry) => entry.insole >= footLengthCm - 0.05)
  if (fitting.length > 0) {
    return fitting.reduce((best, cur) => (cur.insole < best.insole ? cur : best))
  }
  return chart[chart.length - 1]
}

/** Соседние размеры для fallback «показать ближайшие» */
export function nearbySizes(size: number, category: FitCategory, count = 2): number[] {
  const chart = SIZE_CHARTS[category]
  const idx = chart.findIndex((e) => Math.abs(e.size - size) < 0.01)
  if (idx < 0) return [size]
  const result: number[] = []
  for (let d = 1; d <= count + 2 && result.length < count * 2; d++) {
    if (idx - d >= 0) result.push(chart[idx - d].size)
    if (idx + d < chart.length) result.push(chart[idx + d].size)
  }
  return result
}

/**
 * Оценка полноты по отношению ширина/длина стопы.
 * Нужна, чтобы сопоставлять с width товара.
 */
export function classifyFootWidth(lengthCm: number, widthCm: number): FootWidth {
  const ratio = widthCm / lengthCm
  if (ratio < 0.37) return 'narrow'
  if (ratio < 0.405) return 'medium'
  if (ratio < 0.44) return 'wide'
  return 'extra-wide'
}

export function sizesMatch(available: number[], target: number): boolean {
  return available.some((s) => Math.abs(s - target) < 0.01)
}

export function validateFootLength(value: number | null): string | null {
  if (value === null) return 'Введите длину стопы'
  if (value < 8 || value > 40) {
    return 'Введите длину стопы в сантиметрах, например 26,5'
  }
  return null
}

export function validateFootWidth(value: number | null): string | null {
  if (value === null) return 'Введите ширину стопы'
  if (value < 4 || value > 18) {
    return 'Введите ширину стопы в сантиметрах, например 10,2'
  }
  return null
}
