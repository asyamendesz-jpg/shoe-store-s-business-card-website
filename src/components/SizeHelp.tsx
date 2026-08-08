import { STORE } from '../types'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'
import { FIT_BOT_OPEN_EVENT } from '../lib/fitSession'
import './SizeHelp.css'

export function SizeHelp() {
  const [ref, visible] = useInView<HTMLElement>()
  const { t } = useLanguage()

  const openBot = () => {
    window.dispatchEvent(new Event(FIT_BOT_OPEN_EVENT))
  }

  return (
    <section className="section size-help" id="size-help" ref={ref}>
      <div className={`container size-help__panel reveal ${visible ? 'is-visible' : ''}`}>
        <div>
          <span className="section__eyebrow">{t('sizeHelpEyebrow')}</span>
          <h2 className="section__title">{t('sizeHelpTitle')}</h2>
          <p>{t('sizeHelpText', { address: t('address') })}</p>
        </div>
        <div className="size-help__actions">
          <button type="button" className="btn btn--primary" onClick={openBot}>
            Подобрать обувь
          </button>
          <a className="btn btn--outline" href={STORE.phoneHref}>
            {t('callUs', { phone: STORE.phoneDisplay })}
          </a>
        </div>
      </div>
    </section>
  )
}
