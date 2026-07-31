import { reviews } from '../data'
import { useInView } from '../hooks/useInView'
import './Reviews.css'

function Stars() {
  return (
    <div className="reviews__stars" aria-label="Оценка 5 из 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

export function Reviews() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="section reviews" id="reviews" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Отзывы</span>
          <h2 className="section__title">Нам доверяют семьи и городские покупатели</h2>
          <p className="section__lead">
            Реальные впечатления о комфорте, посадке, качестве и цене.
          </p>
        </div>

        <div className="reviews__grid">
          {reviews.map((item, index) => (
            <blockquote
              key={item.name}
              className={`reviews__item reveal reveal-delay-${index % 3} ${visible ? 'is-visible' : ''}`}
            >
              <Stars />
              <p>«{item.text}»</p>
              <footer>
                <img src={item.photo} alt="" width={48} height={48} loading="lazy" />
                <cite>{item.name}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
