import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useLanguage } from '../context/LanguageContext'
import { formatPrice } from '../lib/storage'
import './CartPage.css'

export function CartPage() {
  const {
    cart,
    cartTotal,
    getProduct,
    updateCartQty,
    removeFromCart,
    submitOrder,
  } = useStore()
  const { t } = useLanguage()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !phone.trim()) {
      setError(t('cartErrorRequired'))
      return
    }
    if (cart.length === 0) {
      setError(t('cartErrorEmpty'))
      return
    }
    const order = submitOrder({ name, phone, comment })
    setSubmittedId(order.id)
    setName('')
    setPhone('')
    setComment('')
  }

  if (submittedId) {
    return (
      <div className="cart-page">
        <div className="container cart-page__success">
          <h1>{t('cartSuccessTitle')}</h1>
          <p>{t('cartSuccessText', { address: t('address') })}</p>
          <p className="cart-page__order-id">{t('cartOrderId', { id: submittedId })}</p>
          <Link className="btn btn--primary" to="/#products">
            {t('cartBack')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page__head">
          <h1>{t('cartTitle')}</h1>
          <Link to="/#products">{t('cartContinue')}</Link>
        </div>

        {cart.length === 0 ? (
          <div className="cart-page__empty">
            <p>{t('cartEmpty')}</p>
            <Link className="btn btn--primary" to="/#products">
              {t('cartBrowse')}
            </Link>
          </div>
        ) : (
          <div className="cart-page__layout">
            <div className="cart-page__items">
              {cart.map((item) => {
                const product = getProduct(item.productId)
                if (!product) return null
                return (
                  <article key={`${item.productId}-${item.size}`} className="cart-item">
                    <img src={product.image} alt={product.name} width={120} height={150} />
                    <div className="cart-item__info">
                      <h2>{product.name}</h2>
                      <p>{t('cartSize', { size: item.size })}</p>
                      <p className="cart-item__price">{formatPrice(product.price)}</p>
                      <div className="cart-item__qty">
                        <button
                          type="button"
                          aria-label={t('cartDecrease')}
                          onClick={() => updateCartQty(item.productId, item.size, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={t('cartIncrease')}
                          onClick={() => updateCartQty(item.productId, item.size, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.productId, item.size)}
                    >
                      {t('cartRemove')}
                    </button>
                  </article>
                )
              })}
            </div>

            <aside className="cart-page__aside">
              <div className="cart-page__summary">
                <h2>{t('cartCheckout')}</h2>
                <p className="cart-page__total">
                  {t('cartTotal')} <strong>{formatPrice(cartTotal)}</strong>
                </p>
                <p className="cart-page__hint">
                  {t('cartHint', { address: t('address') })}
                </p>

                <form onSubmit={handleSubmit} className="cart-form">
                  <label>
                    {t('cartName')}
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('cartNamePlaceholder')}
                      required
                    />
                  </label>
                  <label>
                    {t('cartPhone')}
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t('cartPhonePlaceholder')}
                      required
                    />
                  </label>
                  <label>
                    {t('cartComment')}
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t('cartCommentPlaceholder')}
                      rows={3}
                    />
                  </label>
                  {error && <p className="cart-form__error">{error}</p>}
                  <button type="submit" className="btn btn--primary">
                    {t('cartSubmit')}
                  </button>
                  <p className="cart-form__legal">
                    {t('cartLegal')}{' '}
                    <Link to="/privacy">{t('footerPrivacy')}</Link> {t('cartLegalAnd')}{' '}
                    <Link to="/offer">{t('footerOffer')}</Link>.
                  </p>
                </form>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
