import { trends } from '../data'
import { useInView } from '../hooks/useInView'
import './Trends.css'

export function Trends() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="section trends" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Тренды</span>
          <h2 className="section__title">Стильная обувь по доступной цене</h2>
          <p className="section__lead">
            Актуальные модели, современные цвета и универсальные варианты на каждый день.
          </p>
        </div>

        <div className="trends__grid">
          {trends.map((item, index) => (
            <article
              key={item.title}
              className={`trends__item reveal reveal-delay-${index} ${visible ? 'is-visible' : ''}`}
            >
              <div className="trends__image">
                <img src={item.image} alt={item.title} loading="lazy" width={800} height={1000} />
              </div>
              <div className="trends__meta">
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
