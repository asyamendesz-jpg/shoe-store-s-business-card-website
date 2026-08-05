import { Link } from 'react-router-dom'
import { STORE } from '../types'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link className="footer__logo" to="/">
            FORMA
          </Link>
          <p>{t('footerTagline')}</p>
        </div>

        <div>
          <h3>{t('footerBuyers')}</h3>
          <ul>
            <li>
              <Link to="/#products">{t('footerProducts')}</Link>
            </li>
            <li>
              <Link to="/cart">{t('footerCart')}</Link>
            </li>
            <li>
              <Link to="/#size-help">{t('footerSizeHelp')}</Link>
            </li>
            <li>
              <Link to="/#faq">{t('footerReturn')}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>{t('footerDocs')}</h3>
          <ul>
            <li>
              <Link to="/privacy">{t('footerPrivacy')}</Link>
            </li>
            <li>
              <Link to="/offer">{t('footerOffer')}</Link>
            </li>
            <li>
              <Link to="/admin">{t('footerAdmin')}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>{t('footerContacts')}</h3>
          <ul>
            <li>{t('address')}</li>
            <li>
              <a href={STORE.phoneHref}>{STORE.phoneDisplay}</a>
            </li>
            <li>{t('hours')}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} FORMA. {t('address')}
        </p>
      </div>
    </footer>
  )
}
