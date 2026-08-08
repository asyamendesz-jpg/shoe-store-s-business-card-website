export type FitCategory = 'women' | 'men' | 'kids'

export type FootWidth = 'narrow' | 'medium' | 'wide' | 'extra-wide'

export type ProductCategory =
  | 'Женская'
  | 'Мужская'
  | 'Детская'
  | 'Кроссовки'
  | 'Ботинки'
  | 'Повседневная'

export interface Product {
  id: string
  name: string
  price: number
  /** Категория для общего каталога на сайте */
  category: ProductCategory
  /** Категория для бота подбора (женщины / мужчины / дети) */
  fitCategory: FitCategory
  image: string
  images: string[]
  description: string
  /** Доступные EU-размеры (availableSizes) */
  sizes: number[]
  /** Полнота колодки; null/undefined — неизвестна */
  width?: FootWidth | null
  material: string
  season: string
  inStock: boolean
  stock: number
}

export interface CartItem {
  productId: string
  size: number
  quantity: number
}

export type OrderStatus = 'new' | 'processing' | 'done' | 'cancelled'

export interface OrderItem {
  productId: string
  name: string
  size: number
  quantity: number
  price: number
}

export interface Order {
  id: string
  createdAt: string
  name: string
  phone: string
  comment: string
  items: OrderItem[]
  total: number
  status: OrderStatus
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Женская',
  'Мужская',
  'Детская',
  'Кроссовки',
  'Ботинки',
  'Повседневная',
]

export const FOOT_WIDTH_LABELS: Record<FootWidth, string> = {
  narrow: 'Узкая',
  medium: 'Средняя',
  wide: 'Широкая',
  'extra-wide': 'Очень широкая',
}

export const FIT_CATEGORY_LABELS: Record<FitCategory, string> = {
  women: 'Женская обувь',
  men: 'Мужская обувь',
  kids: 'Детская обувь',
}

export const STORE = {
  name: 'FORMA',
  address: 'г. Новочеркасск, ул. Думенко 4',
  hours: 'Ежедневно 10:00–21:00',
  adminLogin: 'admin@aduard.com',
  adminPassword: 'forma2024',
} as const
