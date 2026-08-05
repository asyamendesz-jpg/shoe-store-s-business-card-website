import { images } from '../data'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import './Sustainable.css'

export function Sustainable() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  return (
    <section className="section sustainable" ref={ref}>
      <div className="container sustainable__wrap">
        <div className={`sustainable__media reveal ${visible ? 'is-visible' : ''}`}>
          <img
            src={images.sustainable}
            alt=""
            loading="lazy"
            width={1400}
            height={900}
          />
        </div>
        <div className={`sustainable__content reveal reveal-delay-2 ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('sustainableEyebrow')}</span>
          <h2 className="section__title">{t('sustainableTitle')}</h2>
          <p>{t('sustainableText')}</p>
          <a className="btn btn--outline" href="#products">
            {t('sustainableCta')}
          </a>
        </div>
      </div>
    </section>
  )
}
