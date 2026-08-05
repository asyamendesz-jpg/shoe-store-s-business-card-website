import type { Order, Product } from '../types'
import { images } from '../data'

const PRODUCTS_KEY = 'forma_products'
const ORDERS_KEY = 'forma_orders'
const CART_KEY = 'forma_cart'
const ADMIN_KEY = 'forma_admin'

export const defaultProducts: Product[] = [
  {
    id: 'p1',
    name: 'Кроссовки Urban Soft',
    price: 2890,
    category: 'Кроссовки',
    image: images.sneakers,
    description: 'Лёгкие повседневные кроссовки с мягкой стелькой для города.',
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Ботинки Nord Trail',
    price: 3490,
    category: 'Ботинки',
    image: images.boots,
    description: 'Удобные ботинки на каждый день с устойчивой подошвой.',
    sizes: [39, 40, 41, 42, 43, 44, 45],
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Туфли Soft Line',
    price: 2590,
    category: 'Женская',
    image: images.women,
    description: 'Женские туфли с комфортной колодкой и аккуратным силуэтом.',
    sizes: [35, 36, 37, 38, 39, 40],
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Кеды Classic Walk',
    price: 2190,
    category: 'Мужская',
    image: images.men,
    description: 'Мужские кеды для прогулок и повседневных образов.',
    sizes: [40, 41, 42, 43, 44, 45],
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Детские кроссовки Jump',
    price: 1890,
    category: 'Детская',
    image: images.kids,
    description: 'Лёгкая детская пара с удобной посадкой и ярким дизайном.',
    sizes: [28, 29, 30, 31, 32, 33, 34, 35],
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Лоферы Day Ease',
    price: 2790,
    category: 'Повседневная',
    image: images.casual,
    description: 'Универсальная повседневная модель для комфортного дня.',
    sizes: [36, 37, 38, 39, 40, 41, 42],
    inStock: true,
  },
]

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getProducts(): Product[] {
  const products = read<Product[]>(PRODUCTS_KEY, [])
  if (products.length === 0) {
    write(PRODUCTS_KEY, defaultProducts)
    return defaultProducts
  }

  const brokenFragments = [
    'photo-1514989940723-e8e51635b132',
    'photo-1528701800489-20be3c2ea5d3',
  ]
  const defaultsById = new Map(defaultProducts.map((p) => [p.id, p]))
  let changed = false
  const synced = products.map((product) => {
    const fallback = defaultsById.get(product.id)
    if (!fallback) return product
    if (brokenFragments.some((part) => product.image.includes(part))) {
      changed = true
      return { ...product, image: fallback.image }
    }
    return product
  })

  if (changed) write(PRODUCTS_KEY, synced)
  return synced
}

export function saveProducts(products: Product[]) {
  write(PRODUCTS_KEY, products)
}

export function getOrders(): Order[] {
  return read<Order[]>(ORDERS_KEY, []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function saveOrders(orders: Order[]) {
  write(ORDERS_KEY, orders)
}

export function getCartRaw() {
  return read(CART_KEY, [] as { productId: string; size: number; quantity: number }[])
}

export function saveCartRaw(items: { productId: string; size: number; quantity: number }[]) {
  write(CART_KEY, items)
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_KEY) === '1'
}

export function setAdminAuthenticated(value: boolean) {
  if (value) sessionStorage.setItem(ADMIN_KEY, '1')
  else sessionStorage.removeItem(ADMIN_KEY)
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function createId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}
