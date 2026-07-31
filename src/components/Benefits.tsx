import { benefits } from '../data'
import { useInView } from '../hooks/useInView'
import './Benefits.css'

export function Benefits() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="section benefits" id="benefits" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Почему FORMA</span>
          <h2 className="section__title">Умная покупка без компромиссов</h2>
          <p className="section__lead">
            Современные модели, комфорт и честная цена — без переплаты за имя на коробке.
          </p>
        </div>

        <div className="benefits__grid">
          {benefits.map((item, index) => (
            <article
              key={item.title}
              className={`benefits__item reveal reveal-delay-${index % 3} ${visible ? 'is-visible' : ''}`}
            >
              <span className="benefits__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
