import { images } from '../data'
import { useInView } from '../hooks/useInView'
import './Sustainable.css'

export function Sustainable() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="section sustainable" ref={ref}>
      <div className="container sustainable__wrap">
        <div className={`sustainable__media reveal ${visible ? 'is-visible' : ''}`}>
          <img
            src={images.sustainable}
            alt="Аккуратно сложенные пары современной обуви"
            loading="lazy"
            width={1400}
            height={900}
          />
        </div>
        <div className={`sustainable__content reveal reveal-delay-2 ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">Разумный выбор</span>
          <h2 className="section__title">Покупайте разумно</h2>
          <p>
            Мы поддерживаем идею устойчивого потребления: лучше выбрать удобную обувь, которая
            прослужит дольше, чем постоянно покупать новую.
          </p>
          <a className="btn btn--outline" href="#products">
            Выбрать долговечную пару
          </a>
        </div>
      </div>
    </section>
  )
}
