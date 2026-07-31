import { STORE } from '../types'
import { useInView } from '../hooks/useInView'
import './SizeHelp.css'

export function SizeHelp() {
  const [ref, visible] = useInView<HTMLElement>()

  return (
    <section className="section size-help" id="size-help" ref={ref}>
      <div className={`container size-help__panel reveal ${visible ? 'is-visible' : ''}`}>
        <div>
          <span className="section__eyebrow">Помощь с размером</span>
          <h2 className="section__title">Подберём пару без угадываний</h2>
          <p>
            Позвоните или напишите длину стопы, предпочтения по полноте и для кого нужна обувь —
            подскажем модель и размер. Магазин: {STORE.address}.
          </p>
        </div>
        <a className="btn btn--primary" href={STORE.phoneHref}>
          Позвонить {STORE.phoneDisplay}
        </a>
      </div>
    </section>
  )
}
