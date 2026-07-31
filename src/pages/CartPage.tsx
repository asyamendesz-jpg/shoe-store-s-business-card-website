import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/storage'
import { STORE } from '../types'
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

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !phone.trim()) {
      setError('Укажите имя и телефон')
      return
    }
    if (cart.length === 0) {
      setError('Корзина пуста')
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
          <h1>Заявка отправлена</h1>
          <p>
            Мы получили ваш заказ и скоро свяжемся по телефону. Можно забрать пару по адресу:{' '}
            {STORE.address}.
          </p>
          <p className="cart-page__order-id">Номер заявки: {submittedId}</p>
          <Link className="btn btn--primary" to="/#products">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page__head">
          <h1>Корзина</h1>
          <Link to="/#products">Продолжить выбор</Link>
        </div>

        {cart.length === 0 ? (
          <div className="cart-page__empty">
            <p>Пока пусто — выберите удобную пару в каталоге.</p>
            <Link className="btn btn--primary" to="/#products">
              Смотреть товары
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
                      <p>Размер {item.size}</p>
                      <p className="cart-item__price">{formatPrice(product.price)}</p>
                      <div className="cart-item__qty">
                        <button
                          type="button"
                          aria-label="Уменьшить"
                          onClick={() => updateCartQty(item.productId, item.size, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Увеличить"
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
                      Удалить
                    </button>
                  </article>
                )
              })}
            </div>

            <aside className="cart-page__aside">
              <div className="cart-page__summary">
                <h2>Оформление заявки</h2>
                <p className="cart-page__total">
                  Итого: <strong>{formatPrice(cartTotal)}</strong>
                </p>
                <p className="cart-page__hint">
                  Самовывоз: {STORE.address}. Тел. {STORE.phoneDisplay}
                </p>

                <form onSubmit={handleSubmit} className="cart-form">
                  <label>
                    Имя
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      required
                    />
                  </label>
                  <label>
                    Телефон
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="8-928-..."
                      required
                    />
                  </label>
                  <label>
                    Комментарий
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Удобное время, вопросы по размеру"
                      rows={3}
                    />
                  </label>
                  {error && <p className="cart-form__error">{error}</p>}
                  <button type="submit" className="btn btn--primary">
                    Отправить заявку
                  </button>
                  <p className="cart-form__legal">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <Link to="/privacy">политикой конфиденциальности</Link> и{' '}
                    <Link to="/offer">офертой</Link>.
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
