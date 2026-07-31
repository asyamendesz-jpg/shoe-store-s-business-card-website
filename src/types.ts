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
  category: ProductCategory
  image: string
  description: string
  sizes: number[]
  inStock: boolean
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

export const STORE = {
  name: 'FORMA',
  address: 'г. Новочеркасск, ул. Думенко 4',
  phoneDisplay: '8-928-775-36-93',
  phoneHref: 'tel:+79287753693',
  hours: 'Ежедневно 10:00–21:00',
  adminPassword: 'forma2024',
} as const
