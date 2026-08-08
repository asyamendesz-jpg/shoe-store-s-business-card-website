import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'
import './Reviews.css'

const reviewItems: { name: string; initials: string; text: TranslationKey }[] = [
  { name: 'Анна К.', initials: 'АК', text: 'review1' },
  { name: 'Дмитрий С.', initials: 'ДС', text: 'review2' },
  { name: 'Елена М.', initials: 'ЕМ', text: 'review3' },
  { name: 'Игорь В.', initials: 'ИВ', text: 'review4' },
]

function Stars({ label }: { label: string }) {
  return (
    <div className="reviews__stars" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  )
}

export function Reviews() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  return (
    <section className="section reviews" id="reviews" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('reviewsEyebrow')}</span>
          <h2 className="section__title">{t('reviewsTitle')}</h2>
          <p className="section__lead">{t('reviewsLead')}</p>
        </div>

        <div className="reviews__grid">
          {reviewItems.map((item, index) => (
            <blockquote
              key={item.name}
              className={`reviews__item reveal reveal-delay-${index % 3} ${visible ? 'is-visible' : ''}`}
            >
              <Stars label={t('rating')} />
              <p>«{t(item.text)}»</p>
              <footer>
                <span className="reviews__avatar" aria-hidden="true">
                  {item.initials}
                </span>
                <cite>{item.name}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
