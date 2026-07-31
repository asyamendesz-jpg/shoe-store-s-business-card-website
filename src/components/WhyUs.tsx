import { problems } from '../data'
import { useInView } from '../hooks/useInView'
import './WhyUs.css'

export function WhyUs() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="section why" id="why" ref={ref}>
      <div className="container why__layout">
        <div className={`section__head why__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Почему нас выбирают</span>
          <h2 className="section__title">Решаем то, что обычно раздражает</h2>
          <p className="section__lead">
            Меньше риска, больше уверенности — от посадки до срока службы.
          </p>
        </div>

        <div className="why__list">
          {problems.map((item, index) => (
            <article
              key={item.problem}
              className={`why__item reveal reveal-delay-${index} ${visible ? 'is-visible' : ''}`}
            >
              <div className="why__problem">
                <span>Проблема</span>
                <h3>{item.problem}</h3>
              </div>
              <div className="why__solution">
                <span>Решение</span>
                <p>{item.solution}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
