import { useMemo, useState } from 'react'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/storage'
import { useInView } from '../hooks/useInView'
import type { Product, ProductCategory } from '../types'
import { PRODUCT_CATEGORIES } from '../types'
import './ProductCatalog.css'

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore()
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
        {!product.inStock && <span className="product-card__badge">Нет в наличии</span>}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <p className="product-card__price">{formatPrice(product.price)}</p>

        <label className="product-card__size">
          <span>Размер</span>
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
          {added ? 'Добавлено' : 'В корзину'}
        </button>
      </div>
    </article>
  )
}

export function ProductCatalog() {
  const { products } = useStore()
  const [ref, visible] = useInView<HTMLElement>()
  const [filter, setFilter] = useState<ProductCategory | 'Все'>('Все')

  const filtered = useMemo(
    () => (filter === 'Все' ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  )

  return (
    <section className="section product-catalog" id="products" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Товары</span>
          <h2 className="section__title">Выберите удобную пару</h2>
          <p className="section__lead">
            Актуальные модели в наличии. Добавьте в корзину и оформите заявку — мы свяжемся с вами.
          </p>
        </div>

        <div className={`product-catalog__filters reveal ${visible ? 'is-visible' : ''}`}>
          <button
            type="button"
            className={filter === 'Все' ? 'is-active' : ''}
            onClick={() => setFilter('Все')}
          >
            Все
          </button>
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={filter === cat ? 'is-active' : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
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
          <p className="product-catalog__empty">В этой категории пока нет товаров.</p>
        )}
      </div>
    </section>
  )
}
