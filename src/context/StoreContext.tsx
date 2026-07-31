import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import type { CartItem, Order, Product } from '../types'
import {
  createId,
  getCartRaw,
  getOrders,
  getProducts,
  saveCartRaw,
  saveOrders,
  saveProducts,
} from '../lib/storage'

interface StoreContextValue {
  products: Product[]
  orders: Order[]
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (productId: string, size: number, quantity?: number) => void
  updateCartQty: (productId: string, size: number, quantity: number) => void
  removeFromCart: (productId: string, size: number) => void
  clearCart: () => void
  submitOrder: (payload: { name: string; phone: string; comment: string }) => Order
  upsertProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  getProduct: (id: string) => Product | undefined
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => getProducts())
  const [orders, setOrders] = useState<Order[]>(() => getOrders())
  const [cart, setCart] = useState<CartItem[]>(() => getCartRaw())

  useEffect(() => {
    saveProducts(products)
  }, [products])

  useEffect(() => {
    saveOrders(orders)
  }, [orders])

  useEffect(() => {
    saveCartRaw(cart)
  }, [cart])

  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId)
        return sum + (product?.price ?? 0) * item.quantity
      }, 0),
    [cart, products],
  )

  const addToCart = useCallback((productId: string, size: number, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        )
      }
      return [...prev, { productId, size, quantity }]
    })
  }, [])

  const updateCartQty = useCallback((productId: string, size: number, quantity: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.size === size ? { ...i, quantity } : i,
        )
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const removeFromCart = useCallback((productId: string, size: number) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const submitOrder = useCallback(
    (payload: { name: string; phone: string; comment: string }) => {
      const items = cart
        .map((item) => {
          const product = products.find((p) => p.id === item.productId)
          if (!product) return null
          return {
            productId: product.id,
            name: product.name,
            size: item.size,
            quantity: item.quantity,
            price: product.price,
          }
        })
        .filter(Boolean) as Order['items']

      const order: Order = {
        id: createId('order'),
        createdAt: new Date().toISOString(),
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        comment: payload.comment.trim(),
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        status: 'new',
      }

      setOrders((prev) => [order, ...prev])
      setCart([])
      return order
    },
    [cart, products],
  )

  const upsertProduct = useCallback((product: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) return prev.map((p) => (p.id === product.id ? product : p))
      return [product, ...prev]
    })
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }, [])

  const value = useMemo(
    () => ({
      products,
      orders,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      submitOrder,
      upsertProduct,
      deleteProduct,
      updateOrderStatus,
      getProduct,
    }),
    [
      products,
      orders,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      submitOrder,
      upsertProduct,
      deleteProduct,
      updateOrderStatus,
      getProduct,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
