import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { loadFitSession } from '../lib/fitSession'
import { formatSizeLabel } from '../lib/sizeCharts'
import { formatPrice } from '../lib/storage'
import { FOOT_WIDTH_LABELS } from '../types'
import './ProductPage.css'

export function ProductPage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { getProduct, addToCart } = useStore()
  const product = id ? getProduct(id) : undefined
  const fit = useMemo(() => loadFitSession(), [])

  const gallery = product?.images?.length ? product.images : product ? [product.image] : []
  const suggested = useMemo(() => {
    if (!product) return undefined
    const fromQuery = Number(params.get('size'))
    if (Number.isFinite(fromQuery) && fromQuery > 0) return fromQuery
    if (
      fit.recommendedSize &&
      product.sizes.some((s) => Math.abs(s - fit.recommendedSize!) < 0.01)
    ) {
      return fit.recommendedSize
    }
    return product.sizes[0]
  }, [params, fit.recommendedSize, product])

  const [size, setSize] = useState<number | undefined>(undefined)
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined)
  const [added, setAdded] = useState(false)

  const activeSize = size ?? suggested ?? product?.sizes[0]
  const shownImage = activeImage ?? gallery[0]

  if (!product) {
    return (
      <div className="product-page">
        <div className="container product-page__missing">
          <h1>Товар не найден</h1>
          <Link className="btn btn--primary" to="/#products">
            К каталогу
          </Link>
        </div>
      </div>
    )
  }

  const handleAdd = () => {
    if (activeSize == null) return
    addToCart(product.id, activeSize)
    setAdded(true)
  }

  return (
    <div className="product-page">
      <div className="container product-page__grid">
        <div className="product-page__gallery">
          <div className="product-page__main-image">
            <img src={shownImage} alt={product.name} width={900} height={1100} />
          </div>
          {gallery.length > 1 && (
            <div className="product-page__thumbs">
              {gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  className={src === shownImage ? 'is-active' : ''}
                  onClick={() => setActiveImage(src)}
                >
                  <img src={src} alt="" width={120} height={120} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-page__info">
          <Link className="product-page__back" to="/#products">
            ← К каталогу
          </Link>
          <p className="product-page__category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-page__price">{formatPrice(product.price)}</p>
          <p className="product-page__desc">{product.description}</p>

          <dl className="product-page__meta">
            <div>
              <dt>Материал</dt>
              <dd>{product.material}</dd>
            </div>
            <div>
              <dt>Сезон</dt>
              <dd>{product.season}</dd>
            </div>
            <div>
              <dt>Полнота</dt>
              <dd>{product.width ? FOOT_WIDTH_LABELS[product.width] : 'Уточняйте у консультанта'}</dd>
            </div>
            <div>
              <dt>Наличие</dt>
              <dd>{product.inStock ? `В наличии (${product.stock} шт.)` : 'Нет в наличии'}</dd>
            </div>
          </dl>

          {fit.recommendedSize != null && fit.fitCategory && (
            <p className="product-page__rec">
              Ваш размер: EU {formatSizeLabel(fit.recommendedSize, fit.fitCategory)}
            </p>
          )}

          <label className="product-page__size">
            Размер
            <select
              value={activeSize}
              onChange={(e) => {
                setSize(Number(e.target.value))
                setAdded(false)
              }}
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {String(s).replace('.', ',')}
                  {fit.recommendedSize != null && Math.abs(s - fit.recommendedSize) < 0.01
                    ? ' — вам подходит'
                    : ''}
                </option>
              ))}
            </select>
          </label>

          <div className="product-page__actions">
            <button
              type="button"
              className="btn btn--primary"
              disabled={!product.inStock}
              onClick={handleAdd}
            >
              {added ? 'Добавлено' : 'Добавить в корзину'}
            </button>
            {added && (
              <button type="button" className="btn btn--outline" onClick={() => navigate('/cart')}>
                Перейти к оформлению
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
