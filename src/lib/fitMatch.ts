import type { FitCategory, FootWidth, Product } from '../types'
import {
  classifyFootWidth,
  nearbySizes,
  sizesMatch,
} from './sizeCharts'

export interface FitMatchOptions {
  products: Product[]
  fitCategory: FitCategory
  recommendedSize: number
  footLength: number
  footWidth: number
  showNearby?: boolean
}

export interface FitMatchResult {
  exact: Product[]
  nearby: Product[]
  userWidth: FootWidth
  widthKnownCount: number
}

export function matchProductsForFit({
  products,
  fitCategory,
  recommendedSize,
  footLength,
  footWidth,
  showNearby = false,
}: FitMatchOptions): FitMatchResult {
  const userWidth = classifyFootWidth(footLength, footWidth)
  const inCategory = products.filter((p) => p.fitCategory === fitCategory && p.inStock)

  const bySize = (size: number) =>
    inCategory.filter((p) => {
      if (!sizesMatch(p.sizes, size)) return false
      if (p.width && p.width !== userWidth) return false
      return true
    })

  const exact = bySize(recommendedSize)
  if (exact.length > 0 && !showNearby) {
    return {
      exact,
      nearby: [],
      userWidth,
      widthKnownCount: exact.filter((p) => p.width).length,
    }
  }

  const nearSizes = nearbySizes(recommendedSize, fitCategory, 2)
  const exactIds = new Set(exact.map((p) => p.id))
  const nearby = nearSizes
    .flatMap((size) => bySize(size))
    .filter((p, i, arr) => !exactIds.has(p.id) && arr.findIndex((x) => x.id === p.id) === i)

  return {
    exact,
    nearby: showNearby || exact.length === 0 ? nearby : [],
    userWidth,
    widthKnownCount: [...exact, ...nearby].filter((p) => p.width).length,
  }
}
