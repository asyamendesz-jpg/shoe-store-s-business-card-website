import { type FormEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useLanguage } from '../context/LanguageContext'
import { createId, formatPrice, isAdminAuthenticated, setAdminAuthenticated } from '../lib/storage'
import { interpolate } from '../i18n/translations'
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

export function AdminPage() {
  const { t } = useLanguage()
  const { products, orders, upsertProduct, deleteProduct, updateOrderStatus } = useStore()
  const [authed, setAuthed] = useState(() => isAdminAuthenticated())
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState<'orders' | 'products'>('products')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const statusLabel: Record<OrderStatus, string> = {
    new: t('adminStatusNew'),
    processing: t('adminStatusProcessing'),
    done: t('adminStatusDone'),
    cancelled: t('adminStatusCancelled'),
  }

  const newOrdersCount = useMemo(
    () => orders.filter((o) => o.status === 'new').length,
    [orders],
  )

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    const loginOk = username.trim().toLowerCase() === STORE.adminLogin.toLowerCase()
    const passOk = password === STORE.adminPassword
    if (loginOk && passOk) {
      setAdminAuthenticated(true)
      setAuthed(true)
      setLoginError('')
      setUsername('')
      setPassword('')
    } else {
      setLoginError(t('adminWrongPassword'))
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

  const toggleStock = (product: Product) => {
    upsertProduct({ ...product, inStock: !product.inStock })
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
          <div className="admin-login__plaque">
            <h1>{t('adminLoginTitle')}</h1>
            <p>{t('adminLoginLead')}</p>
            <form onSubmit={handleLogin}>
              <label>
                {t('adminUsername')}
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label>
                {t('adminPassword')}
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>
              {loginError && <p className="admin-login__error">{loginError}</p>}
              <button type="submit" className="btn btn--primary">
                {t('adminLogin')}
              </button>
            </form>
            <Link to="/">{t('adminToSite')}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-page__head">
          <div>
            <h1>{t('adminTitle')}</h1>
            <p>
              {STORE.address} · {STORE.phoneDisplay}
            </p>
          </div>
          <div className="admin-page__actions">
            <Link to="/">{t('adminToSite')}</Link>
            <button type="button" className="btn btn--outline" onClick={handleLogout}>
              {t('adminLogout')}
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            type="button"
            className={tab === 'products' ? 'is-active' : ''}
            onClick={() => setTab('products')}
          >
            {t('adminProducts')} ({products.length})
          </button>
          <button
            type="button"
            className={tab === 'orders' ? 'is-active' : ''}
            onClick={() => setTab('orders')}
          >
            {t('adminOrders')} {newOrdersCount > 0 ? `(${newOrdersCount})` : ''}
          </button>
        </div>

        {tab === 'orders' && (
          <div className="admin-orders">
            {orders.length === 0 ? (
              <p className="admin-empty">{t('adminNoOrders')}</p>
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
                        {t('adminStatus')}
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
                  {order.comment && (
                    <p className="admin-order__comment">
                      {t('adminComment')} {order.comment}
                    </p>
                  )}
                </article>
              ))
            )}
          </div>
        )}

        {tab === 'products' && (
          <div className="admin-products">
            <form className="admin-form" onSubmit={handleSaveProduct}>
              <h2>{editingId ? t('adminEditProduct') : t('adminAddProduct')}</h2>
              <div className="admin-form__grid">
                <label>
                  {t('adminName')}
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </label>
                <label>
                  {t('adminPrice')}
                  <input
                    type="number"
                    min={1}
                    value={form.price || ''}
                    onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                    required
                  />
                </label>
                <label>
                  {t('adminCategory')}
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
                  {t('adminImage')}
                  <input
                    value={form.image}
                    onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    placeholder="https://..."
                    required
                  />
                </label>
                <label className="admin-form__full">
                  {t('adminDescription')}
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3}
                  />
                </label>
                <label>
                  {t('adminSizes')}
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
                  {t('adminInStock')}
                </label>
              </div>
              <div className="admin-form__actions">
                <button type="submit" className="btn btn--primary">
                  {editingId ? t('adminSave') : t('adminAdd')}
                </button>
                {editingId && (
                  <button type="button" className="btn btn--outline" onClick={resetForm}>
                    {t('adminCancel')}
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
                      {product.inStock ? t('adminInStockLabel') : t('adminOutStockLabel')}
                    </p>
                  </div>
                  <div className="admin-product__actions">
                    <button type="button" onClick={() => toggleStock(product)}>
                      {product.inStock ? t('adminSetOut') : t('adminSetIn')}
                    </button>
                    <button type="button" onClick={() => startEdit(product)}>
                      {t('adminEdit')}
                    </button>
                    <button
                      type="button"
                      className="is-danger"
                      onClick={() => {
                        if (
                          confirm(
                            interpolate(t('adminDeleteConfirm'), { name: product.name }),
                          )
                        ) {
                          deleteProduct(product.id)
                        }
                      }}
                    >
                      {t('adminDelete')}
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
