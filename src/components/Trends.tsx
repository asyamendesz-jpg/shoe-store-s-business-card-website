import { images } from '../data'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'
import './Trends.css'

const items: { title: TranslationKey; meta: TranslationKey; image: string }[] = [
  { title: 'trend1Title', meta: 'trend1Meta', image: images.trend1 },
  { title: 'trend2Title', meta: 'trend2Meta', image: images.trend2 },
  { title: 'trend3Title', meta: 'trend3Meta', image: images.trend3 },
]

export function Trends() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  return (
    <section className="section trends" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('trendsEyebrow')}</span>
          <h2 className="section__title">{t('trendsTitle')}</h2>
          <p className="section__lead">{t('trendsLead')}</p>
        </div>

        <div className="trends__grid">
          {items.map((item, index) => (
            <article
              key={item.title}
              className={`trends__item reveal reveal-delay-${index} ${visible ? 'is-visible' : ''}`}
            >
              <div className="trends__image">
                <img src={item.image} alt={t(item.title)} loading="lazy" width={800} height={1000} />
              </div>
              <div className="trends__meta">
                <h3>{t(item.title)}</h3>
                <p>{t(item.meta)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
