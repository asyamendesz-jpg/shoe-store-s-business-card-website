import { type FormEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { createId, formatPrice, isAdminAuthenticated, setAdminAuthenticated } from '../lib/storage'
import { PRODUCT_CATEGORIES, STORE, type OrderStatus, type Product, type ProductCategory } from '../types'
import './AdminPage.css'

const emptyForm = (): Omit<Product, 'id'> & { id?: string; sizesText: string } => ({
  name: '',
  price: 0,
  category: 'Повседневная',
  image: '',
  description: '',
  sizes: [],
  sizesText: '36, 37, 38, 39, 40, 41',
  inStock: true,
})

const statusLabel: Record<OrderStatus, string> = {
  new: 'Новая',
  processing: 'В работе',
  done: 'Выполнена',
  cancelled: 'Отменена',
}

export function AdminPage() {
  const { products, orders, upsertProduct, deleteProduct, updateOrderStatus } = useStore()
  const [authed, setAuthed] = useState(() => isAdminAuthenticated())
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState<'orders' | 'products'>('orders')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const newOrdersCount = useMemo(
    () => orders.filter((o) => o.status === 'new').length,
    [orders],
  )

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (password === STORE.adminPassword) {
      setAdminAuthenticated(true)
      setAuthed(true)
      setLoginError('')
      setPassword('')
    } else {
      setLoginError('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setAdminAuthenticated(false)
    setAuthed(false)
  }

  const startEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({
      ...product,
      sizesText: product.sizes.join(', '),
    })
    setTab('products')
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(emptyForm())
  }

  const handleSaveProduct = (e: FormEvent) => {
    e.preventDefault()
    const sizes = form.sizesText
      .split(/[,;\s]+/)
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n) && n > 0)

    if (!form.name.trim() || !form.image.trim() || form.price <= 0 || sizes.length === 0) {
      return
    }

    const product: Product = {
      id: editingId ?? createId('product'),
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      image: form.image.trim(),
      description: form.description.trim(),
      sizes,
      inStock: form.inStock,
    }

    upsertProduct(product)
    resetForm()
  }

  if (!authed) {
    return (
      <div className="admin-page">
        <div className="container admin-login">
          <h1>Админка FORMA</h1>
          <p>Вход для сотрудников магазина</p>
          <form onSubmit={handleLogin}>
            <label>
              Пароль
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            {loginError && <p className="admin-login__error">{loginError}</p>}
            <button type="submit" className="btn btn--primary">
              Войти
            </button>
          </form>
          <Link to="/">На сайт</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-page__head">
          <div>
            <h1>Админка</h1>
            <p>
              {STORE.address} · {STORE.phoneDisplay}
            </p>
          </div>
          <div className="admin-page__actions">
            <Link to="/">На сайт</Link>
            <button type="button" className="btn btn--outline" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            type="button"
            className={tab === 'orders' ? 'is-active' : ''}
            onClick={() => setTab('orders')}
          >
            Заявки {newOrdersCount > 0 ? `(${newOrdersCount})` : ''}
          </button>
          <button
            type="button"
            className={tab === 'products' ? 'is-active' : ''}
            onClick={() => setTab('products')}
          >
            Товары ({products.length})
          </button>
        </div>

        {tab === 'orders' && (
          <div className="admin-orders">
            {orders.length === 0 ? (
              <p className="admin-empty">Заявок пока нет — они появятся после оформления корзины.</p>
            ) : (
              orders.map((order) => (
                <article key={order.id} className="admin-order">
                  <div className="admin-order__top">
                    <div>
                      <h2>{order.name}</h2>
                      <a href={`tel:${order.phone.replace(/\D/g, '')}`}>{order.phone}</a>
                      <p className="admin-order__date">
                        {new Date(order.createdAt).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    <div className="admin-order__status">
                      <label>
                        Статус
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                        >
                          {(Object.keys(statusLabel) as OrderStatus[]).map((key) => (
                            <option key={key} value={key}>
                              {statusLabel[key]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <p className="admin-order__total">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                  <ul className="admin-order__items">
                    {order.items.map((item) => (
                      <li key={`${item.productId}-${item.size}`}>
                        {item.name} · р. {item.size} · {item.quantity} шт. ·{' '}
                        {formatPrice(item.price * item.quantity)}
                      </li>
                    ))}
                  </ul>
                  {order.comment && <p className="admin-order__comment">Комментарий: {order.comment}</p>}
                </article>
              ))
            )}
          </div>
        )}

        {tab === 'products' && (
          <div className="admin-products">
            <form className="admin-form" onSubmit={handleSaveProduct}>
              <h2>{editingId ? 'Редактировать товар' : 'Добавить товар'}</h2>
              <div className="admin-form__grid">
                <label>
                  Название
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  Цена, ₽
                  <input
                    type="number"
                    min={1}
                    value={form.price || ''}
                    onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                    required
                  />
                </label>
                <label>
                  Категория
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value as ProductCategory }))
                    }
                  >
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  URL изображения
                  <input
                    value={form.image}
                    onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    placeholder="https://..."
                    required
                  />
                </label>
                <label className="admin-form__full">
                  Описание
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                  />
                </label>
                <label>
                  Размеры через запятую
                  <input
                    value={form.sizesText}
                    onChange={(e) => setForm((f) => ({ ...f, sizesText: e.target.value }))}
                    required
                  />
                </label>
                <label className="admin-form__check">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm((f) => ({ ...f, inStock: e.target.checked }))}
                  />
                  В наличии
                </label>
              </div>
              <div className="admin-form__actions">
                <button type="submit" className="btn btn--primary">
                  {editingId ? 'Сохранить' : 'Добавить'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn--outline" onClick={resetForm}>
                    Отмена
                  </button>
                )}
              </div>
            </form>

            <div className="admin-product-list">
              {products.map((product) => (
                <article key={product.id} className="admin-product">
                  <img src={product.image} alt="" width={72} height={90} />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.category} · {formatPrice(product.price)} ·{' '}
                      {product.inStock ? 'в наличии' : 'нет'}
                    </p>
                  </div>
                  <div className="admin-product__actions">
                    <button type="button" onClick={() => startEdit(product)}>
                      Изменить
                    </button>
                    <button
                      type="button"
                      className="is-danger"
                      onClick={() => {
                        if (confirm(`Удалить «${product.name}»?`)) deleteProduct(product.id)
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
