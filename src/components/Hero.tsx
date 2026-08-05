import { useLanguage } from '../context/LanguageContext'
import { images } from '../data'
import './Hero.css'

export function Hero() {
  const { t } = useLanguage()
  const trust = [t('trustSizes'), t('trustReturn'), t('trustNew')]

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
        <h1 className="hero__title">{t('heroTitle')}</h1>
        <p className="hero__subtitle">{t('heroSubtitle')}</p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#products">
            {t('heroCtaPrimary')}
          </a>
          <a className="btn btn--ghost" href="#size-help">
            {t('heroCtaSecondary')}
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
