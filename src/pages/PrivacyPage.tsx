import { Link } from 'react-router-dom'
import { STORE } from '../types'
import './LegalPage.css'

export function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="container legal-page__content">
        <Link className="legal-page__back" to="/">
          ← На главную
        </Link>
        <h1>Политика конфиденциальности</h1>
        <p className="legal-page__meta">
          Магазин {STORE.name}, {STORE.address}. Тел. {STORE.phoneDisplay}
        </p>

        <section>
          <h2>1. Общие положения</h2>
          <p>
            Настоящая Политика описывает, как магазин {STORE.name} обрабатывает персональные данные
            посетителей сайта и покупателей при оформлении заявок на обувь.
          </p>
        </section>

        <section>
          <h2>2. Какие данные мы собираем</h2>
          <p>При оформлении заявки и консультации мы можем получать:</p>
          <ul>
            <li>имя;</li>
            <li>номер телефона;</li>
            <li>комментарий к заказу (размер, пожелания, удобное время связи);</li>
            <li>состав выбранных товаров.</li>
          </ul>
        </section>

        <section>
          <h2>3. Цели обработки</h2>
          <p>Данные используются только для:</p>
          <ul>
            <li>связи по заявке и уточнения деталей заказа;</li>
            <li>подготовки товара к самовывозу или доставке;</li>
            <li>ответов на вопросы по размеру и ассортименту;</li>
            <li>улучшения качества обслуживания.</li>
          </ul>
        </section>

        <section>
          <h2>4. Хранение и защита</h2>
          <p>
            Мы не передаём персональные данные третьим лицам для рекламных рассылок. Доступ к заявкам
            имеют только сотрудники магазина, которым это необходимо для обработки заказа.
          </p>
        </section>

        <section>
          <h2>5. Права пользователя</h2>
          <p>
            Вы можете запросить уточнение, исправление или удаление своих данных, связавшись с нами
            по телефону{' '}
            <a href={STORE.phoneHref}>{STORE.phoneDisplay}</a> или лично по адресу {STORE.address}.
          </p>
        </section>

        <section>
          <h2>6. Контакты</h2>
          <p>
            По вопросам обработки персональных данных обращайтесь: {STORE.name}, {STORE.address},{' '}
            <a href={STORE.phoneHref}>{STORE.phoneDisplay}</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
