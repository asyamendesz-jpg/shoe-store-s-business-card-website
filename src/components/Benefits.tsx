import { benefits as benefitKeys } from '../data'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'
import './Benefits.css'

const titles: TranslationKey[] = [
  'benefit1Title',
  'benefit2Title',
  'benefit3Title',
  'benefit4Title',
  'benefit5Title',
  'benefit6Title',
]
const texts: TranslationKey[] = [
  'benefit1Text',
  'benefit2Text',
  'benefit3Text',
  'benefit4Text',
  'benefit5Text',
  'benefit6Text',
]

export function Benefits() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  return (
    <section className="section benefits" id="benefits" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('benefitsEyebrow')}</span>
          <h2 className="section__title">{t('benefitsTitle')}</h2>
          <p className="section__lead">{t('benefitsLead')}</p>
        </div>

        <div className="benefits__grid">
          {benefitKeys.map((_, index) => (
            <article
              key={titles[index]}
              className={`benefits__item reveal reveal-delay-${index % 3} ${visible ? 'is-visible' : ''}`}
            >
              <span className="benefits__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{t(titles[index])}</h3>
              <p>{t(texts[index])}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
