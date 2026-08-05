import { Link } from 'react-router-dom'
import { images } from '../data'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'
import './Categories.css'

const categoryItems: { titleKey: TranslationKey; image: string; href: string }[] = [
  { titleKey: 'catWomen', image: images.women, href: '/#products' },
  { titleKey: 'catMen', image: images.men, href: '/#products' },
  { titleKey: 'catKids', image: images.kids, href: '/#products' },
  { titleKey: 'catSneakers', image: images.sneakers, href: '/#products' },
  { titleKey: 'catBoots', image: images.boots, href: '/#products' },
  { titleKey: 'catCasual', image: images.casual, href: '/#products' },
]

export function Categories() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  return (
    <section className="section categories" id="catalog" ref={ref}>
      <div className="container">
        <div className={`section__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('catalogEyebrow')}</span>
          <h2 className="section__title">{t('catalogTitle')}</h2>
          <p className="section__lead">{t('catalogLead')}</p>
        </div>

        <div className="categories__grid">
          {categoryItems.map((item, index) => (
            <Link
              key={item.titleKey}
              to={item.href}
              className={`categories__card reveal reveal-delay-${index % 3} ${visible ? 'is-visible' : ''}`}
            >
              <div className="categories__image">
                <img src={item.image} alt={t(item.titleKey)} loading="lazy" width={900} height={1100} />
              </div>
              <div className="categories__label">
                <span>{t(item.titleKey)}</span>
                <span className="categories__arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
