import { useState } from 'react'
import { faqs } from '../data'
import { useInView } from '../hooks/useInView'
import './FAQ.css'

export function FAQ() {
  const [ref, visible] = useInView<HTMLElement>()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section faq" id="faq" ref={ref}>
      <div className="container faq__layout">
        <div className={`section__head faq__head reveal ${visible ? 'is-visible' : ''}`}>
          <span className="section__eyebrow">FAQ</span>
          <h2 className="section__title">Ответы до покупки</h2>
          <p className="section__lead">
            Коротко о размере, обмене, доставке и гарантии — без мелкого шрифта.
          </p>
        </div>

        <div className={`faq__list reveal reveal-delay-2 ${visible ? 'is-visible' : ''}`}>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="faq__answer" hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
