import { Link } from 'react-router-dom'
import { STORE } from '../types'
import { useLanguage } from '../context/LanguageContext'
import './LegalPage.css'

export function PrivacyPage() {
  const { t, lang } = useLanguage()

  return (
    <div className="legal-page">
      <div className="container legal-page__content">
        <Link className="legal-page__back" to="/">
          {t('privacyBack')}
        </Link>
        <h1>{t('privacyTitle')}</h1>
        <p className="legal-page__meta">
          {t('legalMeta', { name: STORE.name, address: t('address') })}
        </p>

        {lang === 'ru' ? (
          <>
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
                Вы можете запросить уточнение, исправление или удаление своих данных, обратившись
                лично по адресу {t('address')} или через заявку на сайте.
              </p>
            </section>
            <section>
              <h2>6. Контакты</h2>
              <p>
                По вопросам обработки персональных данных обращайтесь: {STORE.name}, {t('address')}.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2>1. General provisions</h2>
              <p>
                This Policy explains how {STORE.name} processes personal data of website visitors and
                shoppers when they submit shoe order requests.
              </p>
            </section>
            <section>
              <h2>2. What data we collect</h2>
              <p>When you submit a request or ask for advice, we may receive:</p>
              <ul>
                <li>name;</li>
                <li>phone number;</li>
                <li>order comments (size, preferences, preferred contact time);</li>
                <li>selected products.</li>
              </ul>
            </section>
            <section>
              <h2>3. Purposes of processing</h2>
              <p>Data is used only to:</p>
              <ul>
                <li>contact you about your request and clarify order details;</li>
                <li>prepare items for pickup or delivery;</li>
                <li>answer size and assortment questions;</li>
                <li>improve customer service.</li>
              </ul>
            </section>
            <section>
              <h2>4. Storage and protection</h2>
              <p>
                We do not share personal data with third parties for advertising. Only store staff who
                need it to process an order can access requests.
              </p>
            </section>
            <section>
              <h2>5. Your rights</h2>
              <p>
                You may request clarification, correction, or deletion of your data by visiting us in
                person at {t('address')} or by submitting a request on the website.
              </p>
            </section>
            <section>
              <h2>6. Contacts</h2>
              <p>
                For privacy questions, contact: {STORE.name}, {t('address')}.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
