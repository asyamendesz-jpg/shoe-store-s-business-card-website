import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import type { TranslationKey } from '../i18n/translations'
import './FAQ.css'

const faqKeys: { q: TranslationKey; a: TranslationKey }[] = [
  { q: 'faq1q', a: 'faq1a' },
  { q: 'faq2q', a: 'faq2a' },
  { q: 'faq3q', a: 'faq3a' },
  { q: 'faq4q', a: 'faq4a' },
  { q: 'faq5q', a: 'faq5a' },
]

export function FAQ() {
  const [ref, visible] = useInView<HTMLElement>()
  const [openIndex, setOpenIndex] = useState(0)
  const { t } = useLanguage()

  return (
    <section className="section faq" id="faq" ref={ref}>
      <div className="container faq__layout">
        <div className={`section__head faq__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">{t('faqEyebrow')}</span>
          <h2 className="section__title">{t('faqTitle')}</h2>
          <p className="section__lead">{t('faqLead')}</p>
        </div>

        <div className={`faq__list reveal reveal-delay-2 ${visible ? 'is-visible' : ''}`}>
          {faqKeys.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{t(item.q)}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="faq__answer" hidden={!isOpen}>
                  <p>{t(item.a)}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
