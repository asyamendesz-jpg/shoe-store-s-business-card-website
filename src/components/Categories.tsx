import { Link } from 'react-router-dom'
import { categories } from '../data'
import { useInView } from '../hooks/useInView'
import './Categories.css'

export function Categories() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="section categories" id="catalog" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Каталог</span>
          <h2 className="section__title">Обувь для всей семьи</h2>
          <p className="section__lead">
            Выберите категорию — найдём удобную пару под ваш день и бюджет.
          </p>
        </div>

        <div className="categories__grid">
          {categories.map((item, index) => (
            <Link
              key={item.title}
              to={item.href}
              className={`categories__card reveal reveal-delay-${index % 3} ${visible ? 'is-visible' : ''}`}
            >
              <div className="categories__image">
                <img src={item.image} alt={item.title} loading="lazy" width={900} height={1100} />
              </div>
              <div className="categories__label">
                <span>{item.title}</span>
                <span className="categories__arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
