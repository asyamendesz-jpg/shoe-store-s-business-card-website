import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { matchProductsForFit, type MatchedProduct } from '../../lib/fitMatch'
import {
  computeRecommendation,
  FIT_BOT_OPEN_EVENT,
  loadFitSession,
  saveFitSession,
  type FitBotStep,
  type FitSession,
} from '../../lib/fitSession'
import {
  formatCm,
  parseFootCm,
  validateFootLength,
  validateFootWidth,
} from '../../lib/sizeCharts'
import { formatPrice } from '../../lib/storage'
import {
  FIT_CATEGORY_LABELS,
  FOOT_WIDTH_LABELS,
  type FitCategory,
  type Product,
} from '../../types'
import './FitBot.css'

const BOT_NAME = 'Мистер Ботиночкин'
const BOT_AVATAR = `${import.meta.env.BASE_URL}images/botinochkin.png`

function StepDots({ step }: { step: FitBotStep }) {
  const order: FitBotStep[] = ['length', 'width', 'category', 'results']
  if (step === 'welcome') return null
  const idx = order.indexOf(step)
  return (
    <div className="fitbot__dots" aria-hidden="true">
      {order.map((s, i) => (
        <span key={s} className={i <= idx ? 'is-active' : ''} />
      ))}
    </div>
  )
}

function BotSpeech({ children }: { children: ReactNode }) {
  return (
    <div className="fitbot__speech">
      <img className="fitbot__avatar" src={BOT_AVATAR} alt="" width={56} height={56} />
      <div className="fitbot__bubble">
        <p className="fitbot__who">{BOT_NAME}</p>
        <div className="fitbot__say">{children}</div>
      </div>
    </div>
  )
}

function ProductFitCard({
  item,
  onBuy,
  onDetails,
}: {
  item: MatchedProduct
  onBuy: (product: Product, size: number) => void
  onDetails: () => void
}) {
  const { product, matchedSize } = item
  const sizeLabel = String(matchedSize).replace('.', ',')

  return (
    <article className="fitbot-card">
      <div className="fitbot-card__media">
        <img src={product.image} alt="" width={320} height={400} loading="lazy" />
      </div>
      <div className="fitbot-card__body">
        <h3>{product.name}</h3>
        <p className="fitbot-card__price">{formatPrice(product.price)}</p>
        <p className="fitbot-card__desc">{product.description}</p>
        <p className="fitbot-card__sizes">
          В наличии размеры:{' '}
          {product.sizes.map((s) => String(s).replace('.', ',')).join(', ')}
        </p>
        <p className="fitbot-card__rec">Вам подходит: {sizeLabel}</p>
        {product.width ? (
          <p className="fitbot-card__width">Полнота: {FOOT_WIDTH_LABELS[product.width]}</p>
        ) : (
          <p className="fitbot-card__width fitbot-card__width--muted">
            Размер подходит по длине. По полноте рекомендуем проверить описание модели.
          </p>
        )}
        <div className="fitbot-card__actions">
          <Link
            className="btn btn--outline"
            to={`/product/${product.id}?size=${matchedSize}`}
            onClick={onDetails}
          >
            Подробнее
          </Link>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => onBuy(product, matchedSize)}
          >
            Купить
          </button>
        </div>
      </div>
    </article>
  )
}

export function FitBot() {
  const navigate = useNavigate()
  const { products, addToCart } = useStore()
  const [session, setSession] = useState<FitSession>(() => loadFitSession())
  const [lengthInput, setLengthInput] = useState(
    () => (loadFitSession().footLength != null ? formatCm(loadFitSession().footLength!) : ''),
  )
  const [widthInput, setWidthInput] = useState(
    () => (loadFitSession().footWidth != null ? formatCm(loadFitSession().footWidth!) : ''),
  )
  const [lengthError, setLengthError] = useState('')
  const [widthError, setWidthError] = useState('')
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    saveFitSession(session)
  }, [session])

  useEffect(() => {
    const open = () =>
      setSession((s) => ({
        ...s,
        open: true,
        step:
          s.welcomeSeen && s.footLength && s.footWidth && s.fitCategory
            ? 'results'
            : s.step === 'welcome'
              ? 'welcome'
              : s.step,
      }))
    window.addEventListener(FIT_BOT_OPEN_EVENT, open)
    return () => window.removeEventListener(FIT_BOT_OPEN_EVENT, open)
  }, [])

  useEffect(() => {
    if (!session.open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSession((s) => ({ ...s, open: false }))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [session.open])

  const match = useMemo(() => {
    if (
      session.footLength == null ||
      session.footWidth == null ||
      !session.fitCategory ||
      session.recommendedSize == null
    ) {
      return null
    }
    return matchProductsForFit({
      products,
      fitCategory: session.fitCategory,
      recommendedSize: session.recommendedSize,
      footLength: session.footLength,
      footWidth: session.footWidth,
      showNearby: session.showNearby,
    })
  }, [products, session])

  const patch = (partial: Partial<FitSession>) => setSession((s) => ({ ...s, ...partial }))

  const openBot = () => {
    setSession((s) => ({
      ...s,
      open: true,
      step: s.welcomeSeen ? (s.step === 'welcome' ? 'length' : s.step) : 'welcome',
    }))
  }

  const startFit = () => {
    patch({ welcomeSeen: true, step: 'length', open: true })
  }

  const submitLength = (e: FormEvent) => {
    e.preventDefault()
    const value = parseFootCm(lengthInput)
    const error = validateFootLength(value)
    if (error || value === null) {
      setLengthError(error || 'Введите длину стопы')
      return
    }
    setLengthError('')
    patch({ footLength: value, step: 'width' })
  }

  const submitWidth = (e: FormEvent) => {
    e.preventDefault()
    const value = parseFootCm(widthInput)
    const error = validateFootWidth(value)
    if (error || value === null) {
      setWidthError(error || 'Введите ширину стопы')
      return
    }
    setWidthError('')
    patch({ footWidth: value, step: 'category' })
  }

  const chooseCategory = (fitCategory: FitCategory) => {
    if (session.footLength == null) return
    const rec = computeRecommendation(session.footLength, fitCategory)
    patch({
      fitCategory,
      ...rec,
      step: 'results',
      showNearby: false,
    })
    setAddedId(null)
  }

  const handleBuy = (product: Product, size: number) => {
    addToCart(product.id, size)
    setAddedId(product.id)
  }

  const listed =
    match == null
      ? []
      : session.showNearby || match.exact.length === 0
        ? [...match.exact, ...match.nearby]
        : match.exact

  return (
    <div className={`fitbot ${session.open ? 'is-open' : ''}`}>
      {!session.open && (
        <button type="button" className="fitbot__launcher" onClick={openBot}>
          <img className="fitbot__launcher-avatar" src={BOT_AVATAR} alt="" width={28} height={28} />
          <span className="fitbot__launcher-text">Мистер Ботиночкин</span>
        </button>
      )}

      {session.open && (
        <div
          className="fitbot__panel"
          role="dialog"
          aria-modal="true"
          aria-label={`${BOT_NAME}: подбор обуви`}
        >
          <header className="fitbot__head">
            <div className="fitbot__head-person">
              <img src={BOT_AVATAR} alt="" width={44} height={44} />
              <div>
                <p className="fitbot__brand">{BOT_NAME}</p>
                <p className="fitbot__subtitle">Консультант FORMA · реальные модели в наличии</p>
              </div>
            </div>
            <button
              type="button"
              className="fitbot__close"
              aria-label="Закрыть"
              onClick={() => patch({ open: false })}
            >
              ×
            </button>
          </header>

          <StepDots step={session.step} />

          <div className="fitbot__body">
            {session.step === 'welcome' && (
              <div className="fitbot__step">
                <BotSpeech>
                  <h2>Привет! Я {BOT_NAME} 👋</h2>
                  <p>
                    Помогу подобрать обувь по вашей стопе из моделей, которые сейчас есть в магазине.
                    Это займёт меньше минуты.
                  </p>
                </BotSpeech>
                <button type="button" className="btn btn--primary fitbot__primary" onClick={startFit}>
                  Подобрать обувь
                </button>
              </div>
            )}

            {session.step === 'length' && (
              <form className="fitbot__step" onSubmit={submitLength}>
                <BotSpeech>
                  <h2>Сначала измерим длину стопы</h2>
                  <p>
                    Поставьте стопу на лист бумаги, измерьте расстояние от пятки до самого длинного
                    пальца и введите результат.
                  </p>
                </BotSpeech>
                <label className="fitbot__field">
                  Длина стопы, см
                  <input
                    inputMode="decimal"
                    placeholder="например 26,5"
                    value={lengthInput}
                    onChange={(e) => {
                      setLengthInput(e.target.value)
                      setLengthError('')
                    }}
                    autoFocus
                  />
                </label>
                {lengthError && <p className="fitbot__error">{lengthError}</p>}
                <button type="submit" className="btn btn--primary fitbot__primary">
                  Продолжить
                </button>
              </form>
            )}

            {session.step === 'width' && (
              <form className="fitbot__step" onSubmit={submitWidth}>
                <button
                  type="button"
                  className="fitbot__back"
                  onClick={() => patch({ step: 'length' })}
                >
                  ← Назад
                </button>
                <BotSpeech>
                  <h2>Теперь измерим ширину стопы</h2>
                  <p>
                    Измерьте самую широкую часть стопы. Лучше измерить обе стопы и указать большее
                    значение.
                  </p>
                </BotSpeech>
                <label className="fitbot__field">
                  Ширина стопы, см
                  <input
                    inputMode="decimal"
                    placeholder="например 10,2"
                    value={widthInput}
                    onChange={(e) => {
                      setWidthInput(e.target.value)
                      setWidthError('')
                    }}
                    autoFocus
                  />
                </label>
                <p className="fitbot__hint">
                  Если сомневаетесь, измерьте обе стопы и используйте большее значение.
                </p>
                {widthError && <p className="fitbot__error">{widthError}</p>}
                <button type="submit" className="btn btn--primary fitbot__primary">
                  Продолжить
                </button>
              </form>
            )}

            {session.step === 'category' && (
              <div className="fitbot__step">
                <button
                  type="button"
                  className="fitbot__back"
                  onClick={() => patch({ step: 'width' })}
                >
                  ← Назад
                </button>
                <BotSpeech>
                  <h2>Для кого выбираем обувь?</h2>
                  <p>Выберите категорию — я сразу отберу модели из наличия магазина.</p>
                </BotSpeech>
                <div className="fitbot__cats">
                  <button type="button" onClick={() => chooseCategory('women')}>
                    👩 Женская обувь
                  </button>
                  <button type="button" onClick={() => chooseCategory('men')}>
                    👨 Мужская обувь
                  </button>
                  <button type="button" onClick={() => chooseCategory('kids')}>
                    👧 Детская обувь
                  </button>
                </div>
              </div>
            )}

            {session.step === 'results' &&
              session.fitCategory &&
              session.recommendedSize != null &&
              session.footLength != null &&
              session.footWidth != null && (
                <div className="fitbot__step fitbot__results">
                  <button
                    type="button"
                    className="fitbot__back"
                    onClick={() => patch({ step: 'category', showNearby: false })}
                  >
                    ← Сменить категорию
                  </button>
                  <BotSpeech>
                    <h2>
                      {listed.length > 0
                        ? 'Нашёл подходящие модели в наличии'
                        : 'Пока не нашёл точное совпадение'}
                    </h2>
                    <p>
                      По длине стопы ориентировочно подходит размер EU{' '}
                      {session.recommendedLabel}. Ниже — товары из каталога магазина.
                    </p>
                  </BotSpeech>

                  <ul className="fitbot__summary">
                    <li>Длина стопы: {formatCm(session.footLength)} см</li>
                    <li>Ширина стопы: {formatCm(session.footWidth)} см</li>
                    <li>Категория: {FIT_CATEGORY_LABELS[session.fitCategory]}</li>
                    <li>Рекомендуемый размер: EU {session.recommendedLabel}</li>
                    <li>Моделей в подборке: {listed.length}</li>
                  </ul>

                  {addedId && (
                    <div className="fitbot__toast" role="status">
                      <p>Товар добавлен в корзину 🛍️</p>
                      <div className="fitbot__toast-actions">
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() => {
                            patch({ open: false })
                            navigate('/cart')
                          }}
                        >
                          Перейти к оформлению
                        </button>
                        <button
                          type="button"
                          className="btn btn--outline"
                          onClick={() => setAddedId(null)}
                        >
                          Продолжить покупки
                        </button>
                      </div>
                    </div>
                  )}

                  {listed.length > 0 ? (
                    <div className="fitbot__list">
                      {listed.map((item) => (
                        <ProductFitCard
                          key={item.product.id}
                          item={item}
                          onBuy={handleBuy}
                          onDetails={() => patch({ open: false })}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="fitbot__empty">
                      <p>По вашим параметрам пока нет моделей в наличии.</p>
                      <div className="fitbot__empty-actions">
                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() => patch({ showNearby: true })}
                        >
                          Показать ближайшие размеры
                        </button>
                        <Link
                          className="btn btn--outline"
                          to="/#products"
                          onClick={() => patch({ open: false })}
                        >
                          Посмотреть весь каталог
                        </Link>
                      </div>
                      {session.showNearby && (
                        <p className="fitbot__hint">
                          В этой категории нет подходящих моделей даже рядом по размеру. Загляните в
                          общий каталог.
                        </p>
                      )}
                    </div>
                  )}

                  {match && match.exact.length === 0 && listed.length > 0 && (
                    <p className="fitbot__hint">
                      Показаны ближайшие размеры — точного EU {session.recommendedLabel} в наличии
                      пока нет.
                    </p>
                  )}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
