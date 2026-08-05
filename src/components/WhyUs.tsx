import { useLanguage } from '../context/LanguageContext'
import { useInView } from '../hooks/useInView'
import type { TranslationKey } from '../i18n/translations'
import './WhyUs.css'

const items: { problem: TranslationKey; solution: TranslationKey }[] = [
  { problem: 'problem1', solution: 'solution1' },
  { problem: 'problem2', solution: 'solution2' },
  { problem: 'problem3', solution: 'solution3' },
]

export function WhyUs() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  return (
    <section className="section why" id="why" ref={ref}>
      <div className="container why__layout">
        <div className={`section__head why__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('whyEyebrow')}</span>
          <h2 className="section__title">{t('whyTitle')}</h2>
          <p className="section__lead">{t('whyLead')}</p>
        </div>

        <div className="why__list">
          {items.map((item, index) => (
            <article
              key={item.problem}
              className={`why__item reveal reveal-delay-${index} ${visible ? 'is-visible' : ''}`}
            >
              <div className="why__problem">
                <span>{t('problemLabel')}</span>
                <h3>{t(item.problem)}</h3>
              </div>
              <div className="why__solution">
                <span>{t('solutionLabel')}</span>
                <p>{t(item.solution)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
