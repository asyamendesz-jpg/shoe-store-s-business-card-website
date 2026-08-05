import { images } from '../data'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import './FinalCTA.css'

export function FinalCTA() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  return (
    <section className="final-cta" ref={ref}>
      <div className="final-cta__media" aria-hidden="true">
        <img src={images.cta} alt="" loading="lazy" width={1600} height={1000} />
        <div className="final-cta__scrim" />
      </div>
      <div className={`container final-cta__content reveal ${visible ? 'is-visible' : ''}`}>
        <h2>{t('ctaTitle')}</h2>
        <p>{t('ctaText')}</p>
        <a className="btn btn--light" href="#products">
          {t('ctaButton')}
        </a>
      </div>
    </section>
  )
}
