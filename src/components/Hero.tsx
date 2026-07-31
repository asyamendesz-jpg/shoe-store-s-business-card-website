import { images } from '../data'
import './Hero.css'

const trust = ['Размеры в наличии', 'Обмен и возврат', 'Новые модели каждую неделю']

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        <img
          src={images.hero}
          alt=""
          width={1800}
          height={1200}
          fetchPriority="high"
        />
        <div className="hero__scrim" />
      </div>

      <div className="hero__content">
        <p className="hero__brand">FORMA</p>
        <h1 className="hero__title">Обувь на каждый день без переплаты</h1>
        <p className="hero__subtitle">
          Комфортные модели для всей семьи. Современный дизайн, удобная посадка и честные цены.
        </p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#products">
            Выбрать обувь
          </a>
          <a className="btn btn--ghost" href="#size-help">
            Получить помощь с размером
          </a>
        </div>

        <ul className="hero__trust">
          {trust.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
