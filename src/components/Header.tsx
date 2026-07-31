import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import './Header.css'

const links = [
  { label: 'Каталог', href: '/#catalog' },
  { label: 'Товары', href: '/#products' },
  { label: 'Почему мы', href: '/#why' },
  { label: 'Отзывы', href: '/#reviews' },
  { label: 'FAQ', href: '/#faq' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { cartCount } = useStore()

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

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <div className="container header__inner">
        <Link className="header__logo" to="/" aria-label="FORMA — на главную">
          FORMA
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header__right">
          <NavLink className="header__cart" to="/cart" aria-label="Корзина">
            Корзина
            {cartCount > 0 && <span>{cartCount}</span>}
          </NavLink>
          <Link className="header__cta btn btn--primary" to="/#products">
            Выбрать обувь
          </Link>
        </div>

        <button
          className="header__burger"
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`header__mobile ${open ? 'is-open' : ''}`}>
        <nav aria-label="Мобильная навигация">
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setOpen(false)}>
            Корзина {cartCount > 0 ? `(${cartCount})` : ''}
          </Link>
          <Link className="btn btn--primary" to="/#size-help" onClick={() => setOpen(false)}>
            Помощь с размером
          </Link>
        </nav>
      </div>
    </header>
  )
}
