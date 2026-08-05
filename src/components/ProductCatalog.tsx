import { useMemo, useState } from 'react'
import { useStore } from '../context/StoreContext'
import { useLanguage } from '../context/LanguageContext'
import { formatPrice } from '../lib/storage'
import { useInView } from '../hooks/useInView'
import type { Product, ProductCategory } from '../types'
import { PRODUCT_CATEGORIES } from '../types'
import type { TranslationKey } from '../i18n/translations'
import './ProductCatalog.css'

const categoryLabels: Record<ProductCategory, TranslationKey> = {
  Женская: 'catFilterWomen',
  Мужская: 'catFilterMen',
  Детская: 'catFilterKids',
  Кроссовки: 'catFilterSneakers',
  Ботинки: 'catFilterBoots',
  Повседневная: 'catFilterCasual',
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore()
  const { t } = useLanguage()
  const [size, setSize] = useState(product.sizes[0] ?? 40)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product.id, size)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" width={600} height={750} />
        {!product.inStock && <span className="product-card__badge">{t('outOfStock')}</span>}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{t(categoryLabels[product.category])}</p>
        <h3>{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <p className="product-card__price">{formatPrice(product.price)}</p>

        <label className="product-card__size">
          <span>{t('size')}</span>
          <select value={size} onChange={(e) => setSize(Number(e.target.value))} disabled={!product.inStock}>
            {product.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="btn btn--primary"
          onClick={handleAdd}
          disabled={!product.inStock}
        >
          {added ? t('added') : t('addToCart')}
        </button>
      </div>
    </article>
  )
}

export function ProductCatalog() {
  const { products } = useStore()
  const { t } = useLanguage()
  const [ref, visible] = useInView<HTMLElement>()
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  )

  return (
    <section className="section product-catalog" id="products" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('productsEyebrow')}</span>
          <h2 className="section__title">{t('productsTitle')}</h2>
          <p className="section__lead">{t('productsLead')}</p>
        </div>

        <div className={`product-catalog__filters reveal ${visible ? 'is-visible' : ''}`}>
          <button
            type="button"
            className={filter === 'all' ? 'is-active' : ''}
            onClick={() => setFilter('all')}
          >
            {t('filterAll')}
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={filter === cat ? 'is-active' : ''}
              onClick={() => setFilter(cat)}
            >
              {t(categoryLabels[cat])}
            </button>
          ))}
        </div>

        <div className="product-catalog__grid">
          {filtered.map((product, index) => (
            <div
              key={product.id}
              className={`reveal reveal-delay-${index % 3} ${visible ? 'is-visible' : ''}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="product-catalog__empty">{t('noProducts')}</p>
        )}
      </div>
    </section>
  )
}
