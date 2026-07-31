import { images } from '../data'
import { useInView } from '../hooks/useInView'
import './FinalCTA.css'

export function FinalCTA() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="final-cta" ref={ref}>
      <div className="final-cta__media" aria-hidden="true">
        <img src={images.cta} alt="" loading="lazy" width={1600} height={1000} />
        <div className="final-cta__scrim" />
      </div>
      <div className={`container final-cta__content reveal ${visible ? 'is-visible' : ''}`}>
        <h2>Найдите свою удобную пару сегодня</h2>
        <p>Современный дизайн, комфорт и честная цена — без переплаты за бренд.</p>
        <a className="btn btn--light" href="#products">
          Посмотреть каталог
        </a>
      </div>
    </section>
  )
}
