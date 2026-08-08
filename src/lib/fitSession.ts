import type { FitCategory } from '../types'
import { formatSizeLabel, recommendSize } from './sizeCharts'

export type FitBotStep = 'welcome' | 'length' | 'width' | 'category' | 'results'

export interface FitSession {
  welcomeSeen: boolean
  step: FitBotStep
  footLength: number | null
  footWidth: number | null
  fitCategory: FitCategory | null
  recommendedSize: number | null
  recommendedLabel: string | null
  open: boolean
  showNearby: boolean
}

const KEY = 'forma_fit_session'

const defaults: FitSession = {
  welcomeSeen: false,
  step: 'welcome',
  footLength: null,
  footWidth: null,
  fitCategory: null,
  recommendedSize: null,
  recommendedLabel: null,
  open: false,
  showNearby: false,
}

export function loadFitSession(): FitSession {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...defaults }
    return { ...defaults, ...(JSON.parse(raw) as Partial<FitSession>) }
  } catch {
    return { ...defaults }
  }
}

export function saveFitSession(session: FitSession) {
  localStorage.setItem(KEY, JSON.stringify(session))
}

export function computeRecommendation(
  footLength: number,
  fitCategory: FitCategory,
): Pick<FitSession, 'recommendedSize' | 'recommendedLabel'> {
  const entry = recommendSize(footLength, fitCategory)
  return {
    recommendedSize: entry.size,
    recommendedLabel: formatSizeLabel(entry.size, fitCategory),
  }
}

export const FIT_BOT_OPEN_EVENT = 'forma:fitbot-open'
