import type { FitCategory, FootWidth, Product } from '../types'
import { classifyFootWidth, nearbySizes, sizesMatch } from './sizeCharts'

export interface FitMatchOptions {
  products: Product[]
  fitCategory: FitCategory
  recommendedSize: number
  footLength: number
  footWidth: number
  showNearby?: boolean
}

export interface MatchedProduct {
  product: Product
  /** Размер из наличия товара, который реально подойдёт к покупке */
  matchedSize: number
}

export interface FitMatchResult {
  exact: MatchedProduct[]
  nearby: MatchedProduct[]
  userWidth: FootWidth
}

function isAvailable(product: Product): boolean {
  if (!product.inStock) return false
  if (typeof product.stock === 'number' && product.stock <= 0) return false
  return true
}

function matchesCategory(product: Product, fitCategory: FitCategory): boolean {
  if (product.fitCategory === fitCategory) return true
  // Запасной путь для товаров из админки без явного fitCategory / со старой категорией
  if (fitCategory === 'women' && product.category === 'Женская') return true
  if (fitCategory === 'men' && product.category === 'Мужская') return true
  if (fitCategory === 'kids' && product.category === 'Детская') return true
  return false
}

function bySize(products: Product[], size: number): MatchedProduct[] {
  return products
    .filter((p) => sizesMatch(p.sizes, size))
    .map((product) => ({
      product,
      matchedSize: product.sizes.find((s) => Math.abs(s - size) < 0.01) ?? size,
    }))
}

/**
 * Подбор из реальных товаров магазина (админка / localStorage):
 * категория + наличие + подходящий размер.
 * Полнота влияет только на сортировку, не на жёсткий отсев.
 */
export function matchProductsForFit({
  products,
  fitCategory,
  recommendedSize,
  footLength,
  footWidth,
  showNearby = false,
}: FitMatchOptions): FitMatchResult {
  const userWidth = classifyFootWidth(footLength, footWidth)
  const pool = products.filter((p) => matchesCategory(p, fitCategory) && isAvailable(p))

  const sortByWidth = (items: MatchedProduct[]) =>
    [...items].sort((a, b) => {
      const aScore = a.product.width === userWidth ? 0 : a.product.width ? 1 : 2
      const bScore = b.product.width === userWidth ? 0 : b.product.width ? 1 : 2
      return aScore - bScore
    })

  const exact = sortByWidth(bySize(pool, recommendedSize))
  if (exact.length > 0 && !showNearby) {
    return { exact, nearby: [], userWidth }
  }

  const nearSizeList = nearbySizes(recommendedSize, fitCategory, 2)
  const exactIds = new Set(exact.map((item) => item.product.id))
  const nearbyMap = new Map<string, MatchedProduct>()

  for (const size of nearSizeList) {
    for (const item of bySize(pool, size)) {
      if (exactIds.has(item.product.id) || nearbyMap.has(item.product.id)) continue
      nearbyMap.set(item.product.id, item)
    }
  }

  const nearby = sortByWidth([...nearbyMap.values()])

  return {
    exact,
    nearby: showNearby || exact.length === 0 ? nearby : [],
    userWidth,
  }
}
