import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../i18n/translations'
import './Header.css'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { cartCount } = useStore()
  const { t, lang, setLang } = useLanguage()

  const links = [
    { label: t('navCatalog'), href: '/#catalog' },
    { label: t('navProducts'), href: '/#products' },
    { label: t('navWhy'), href: '/#why' },
    { label: t('navReviews'), href: '/#reviews' },
    { label: t('navFaq'), href: '/#faq' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const switchLang = (next: Lang) => {
    setLang(next)
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <div className="container header__inner">
        <Link className="header__logo" to="/" aria-label={t('navHome')}>
          FORMA
        </Link>

        <nav className="header__nav" aria-label={t('navMain')}>
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__right">
          <div className="header__lang" role="group" aria-label="Language">
            <button
              type="button"
              className={`header__lang-btn ${lang === 'ru' ? 'is-active' : ''}`}
              aria-pressed={lang === 'ru'}
              onClick={() => switchLang('ru')}
            >
              RU
            </button>
            <button
              type="button"
              className={`header__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              aria-pressed={lang === 'en'}
              onClick={() => switchLang('en')}
            >
              EN
            </button>
          </div>

          <NavLink className="header__cart" to="/cart" aria-label={t('cart')}>
            {t('cart')}
            {cartCount > 0 && <span>{cartCount}</span>}
          </NavLink>
          <Link className="header__cta btn btn--primary" to="/#products">
            {t('chooseShoes')}
          </Link>
        </div>

        <button
          className="header__burger"
          type="button"
          aria-label={open ? t('closeMenu') : t('openMenu')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`header__mobile ${open ? 'is-open' : ''}`}>
        <nav aria-label={t('navMobile')}>
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setOpen(false)}>
            {t('cart')} {cartCount > 0 ? `(${cartCount})` : ''}
          </Link>
          <div className="header__lang" role="group" aria-label="Language">
            <button
              type="button"
              className={`header__lang-btn ${lang === 'ru' ? 'is-active' : ''}`}
              aria-pressed={lang === 'ru'}
              onClick={() => switchLang('ru')}
            >
              RU
            </button>
            <button
              type="button"
              className={`header__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
              aria-pressed={lang === 'en'}
              onClick={() => switchLang('en')}
            >
              EN
            </button>
          </div>
          <Link className="btn btn--primary" to="/#size-help" onClick={() => setOpen(false)}>
            {t('sizeHelp')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
