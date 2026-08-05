import { images } from '../data'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'
import './Reviews.css'

const reviewItems: { name: string; photo: string; text: TranslationKey }[] = [
  { name: 'Анна К.', photo: images.review1, text: 'review1' },
  { name: 'Дмитрий С.', photo: images.review2, text: 'review2' },
  { name: 'Елена М.', photo: images.review3, text: 'review3' },
  { name: 'Игорь В.', photo: images.review4, text: 'review4' },
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
                <img src={item.photo} alt="" width={48} height={48} loading="lazy" />
                <cite>{item.name}</cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
