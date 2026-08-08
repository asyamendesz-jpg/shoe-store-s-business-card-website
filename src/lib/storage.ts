import type { FitCategory, FootWidth, Order, Product, ProductCategory } from '../types'
import { images } from '../data'

const PRODUCTS_KEY = 'forma_products'
const PRODUCTS_VERSION_KEY = 'forma_products_version'
const PRODUCTS_VERSION = 6
const ORDERS_KEY = 'forma_orders'
const CART_KEY = 'forma_cart'
const ADMIN_KEY = 'forma_admin'

function product(
  partial: Omit<Product, 'images' | 'material' | 'season' | 'stock' | 'fitCategory'> &
    Partial<Pick<Product, 'images' | 'material' | 'season' | 'stock' | 'fitCategory' | 'width'>> & {
      fitCategory: FitCategory
    },
): Product {
  return {
    material: 'Текстиль / ЭКО-кожа',
    season: 'Демисезон',
    stock: partial.inStock ? 12 : 0,
    images: partial.images ?? [partial.image],
    width: partial.width ?? null,
    ...partial,
  }
}

export const defaultProducts: Product[] = [
  product({
    id: 'p1',
    name: 'Кроссовки Urban Soft',
    price: 2890,
    category: 'Кроссовки',
    fitCategory: 'women',
    image: images.sneakers,
    description: 'Лёгкие повседневные кроссовки с мягкой стелькой для города.',
    sizes: [36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41],
    width: 'medium',
    material: 'Текстиль, ЭКО-кожа',
    season: 'Всесезон',
    inStock: true,
  }),
  product({
    id: 'p2',
    name: 'Ботинки Nord Trail',
    price: 3490,
    category: 'Ботинки',
    fitCategory: 'men',
    image: images.boots,
    description: 'Удобные ботинки на каждый день с устойчивой подошвой.',
    sizes: [40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45],
    width: 'wide',
    material: 'ЭКО-кожа',
    season: 'Осень-зима',
    inStock: true,
  }),
  product({
    id: 'p3',
    name: 'Туфли Soft Line',
    price: 2590,
    category: 'Женская',
    fitCategory: 'women',
    image: images.women,
    description: 'Женские туфли с комфортной колодкой и аккуратным силуэтом.',
    sizes: [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5],
    width: 'narrow',
    material: 'ЭКО-кожа',
    season: 'Весна-лето',
    inStock: true,
  }),
  product({
    id: 'p4',
    name: 'Кеды Classic Walk',
    price: 2190,
    category: 'Мужская',
    fitCategory: 'men',
    image: images.menSneakers,
    description: 'Мужские кеды для прогулок и повседневных образов.',
    sizes: [40, 41, 41.5, 42, 42.5, 43, 44, 45],
    width: 'medium',
    material: 'Текстиль',
    season: 'Весна-лето',
    inStock: true,
  }),
  product({
    id: 'p5',
    name: 'Детские кроссовки Jump',
    price: 1890,
    category: 'Детская',
    fitCategory: 'kids',
    image: images.kids,
    description: 'Лёгкая детская пара с удобной посадкой и ярким дизайном.',
    sizes: [27, 28, 29, 30, 31.5, 33, 34, 35],
    width: 'medium',
    material: 'Текстиль',
    season: 'Всесезон',
    inStock: true,
  }),
  product({
    id: 'p6',
    name: 'Лоферы Day Ease',
    price: 2790,
    category: 'Повседневная',
    fitCategory: 'women',
    image: images.casual,
    description: 'Универсальная повседневная модель для комфортного дня.',
    sizes: [36, 37, 38, 38.5, 39, 39.5, 40, 40.5, 41],
    width: null,
    material: 'ЭКО-кожа',
    season: 'Демисезон',
    inStock: true,
  }),
  product({
    id: 'p7',
    name: 'Кроссовки City Pace',
    price: 3190,
    category: 'Кроссовки',
    fitCategory: 'men',
    image: images.sneakers,
    images: [images.sneakers, images.casual],
    description: 'Мужские кроссовки с амортизацией для города и прогулок.',
    sizes: [41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 46],
    width: 'medium',
    material: 'Текстиль, сетка',
    season: 'Всесезон',
    inStock: true,
  }),
  product({
    id: 'p8',
    name: 'Сандалии Soft Step Kids',
    price: 1590,
    category: 'Детская',
    fitCategory: 'kids',
    image: images.casual,
    description: 'Лёгкие детские сандалии с регулируемой посадкой.',
    sizes: [24, 25.5, 27, 28, 29, 30],
    width: 'wide',
    material: 'ЭКО-кожа',
    season: 'Лето',
    inStock: true,
  }),
  product({
    id: 'p9',
    name: 'Ботинки Flora Soft',
    price: 3290,
    category: 'Женская',
    fitCategory: 'women',
    image: images.boots,
    description: 'Женские ботинки на удобной колодке — на каждый день.',
    sizes: [36, 37, 38, 39, 39.5, 40, 40.5, 41],
    width: 'wide',
    material: 'ЭКО-кожа',
    season: 'Осень-зима',
    inStock: true,
  }),
]

function guessFitCategory(category: ProductCategory, sizes: number[]): FitCategory {
  if (category === 'Женская') return 'women'
  if (category === 'Мужская') return 'men'
  if (category === 'Детская') return 'kids'
  const max = Math.max(...sizes, 0)
  if (max <= 35) return 'kids'
  if (max <= 41) return 'women'
  return 'men'
}

/** Приводит старые записи каталога к актуальной схеме Product */
export function normalizeProduct(raw: Partial<Product> & { id: string; name: string }): Product {
  const sizes = raw.sizes?.length ? raw.sizes : [40]
  const image = raw.image || images.sneakers
  const category = (raw.category || 'Повседневная') as ProductCategory
  return {
    id: raw.id,
    name: raw.name,
    price: Number(raw.price) || 0,
    category,
    fitCategory: raw.fitCategory || guessFitCategory(category, sizes),
    image,
    images: raw.images?.length ? raw.images : [image],
    description: raw.description || '',
    sizes,
    width: (raw.width as FootWidth | null | undefined) ?? null,
    material: raw.material || 'Не указан',
    season: raw.season || 'Не указан',
    inStock: raw.inStock !== false,
    stock: typeof raw.stock === 'number' ? raw.stock : raw.inStock === false ? 0 : 10,
  }
}

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
  const storedVersion = read<number>(PRODUCTS_VERSION_KEY, 0)
  if (storedVersion < PRODUCTS_VERSION) {
    write(PRODUCTS_KEY, defaultProducts)
    write(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION)
    return defaultProducts
  }

  const products = read<Product[]>(PRODUCTS_KEY, [])
  if (products.length === 0) {
    write(PRODUCTS_KEY, defaultProducts)
    write(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION)
    return defaultProducts
  }

  return products.map((p) => normalizeProduct(p))
}

export function saveProducts(products: Product[]) {
  write(PRODUCTS_KEY, products.map((p) => normalizeProduct(p)))
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
