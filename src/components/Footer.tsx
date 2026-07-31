import { Link } from 'react-router-dom'
import { STORE } from '../types'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link className="footer__logo" to="/">
            FORMA
          </Link>
          <p>
            Умная покупка обуви. Современные модели, комфорт и честная цена без переплаты за бренд.
          </p>
        </div>

        <div>
          <h3>Покупателям</h3>
          <ul>
            <li>
              <Link to="/#products">Товары</Link>
            </li>
            <li>
              <Link to="/cart">Корзина</Link>
            </li>
            <li>
              <Link to="/#size-help">Помощь с размером</Link>
            </li>
            <li>
              <Link to="/#faq">Обмен и возврат</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Документы</h3>
          <ul>
            <li>
              <Link to="/privacy">Политика конфиденциальности</Link>
            </li>
            <li>
              <Link to="/offer">Публичная оферта</Link>
            </li>
            <li>
              <Link to="/admin">Вход для сотрудников</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Контакты</h3>
          <ul>
            <li>{STORE.address}</li>
            <li>
              <a href={STORE.phoneHref}>{STORE.phoneDisplay}</a>
            </li>
            <li>{STORE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} FORMA. {STORE.address}
        </p>
      </div>
    </footer>
  )
}
