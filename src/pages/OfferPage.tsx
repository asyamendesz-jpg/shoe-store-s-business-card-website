import { Link } from 'react-router-dom'
import { STORE } from '../types'
import { useLanguage } from '../context/LanguageContext'
import './LegalPage.css'

export function OfferPage() {
  const { t, lang } = useLanguage()

  return (
    <div className="legal-page">
      <div className="container legal-page__content">
        <Link className="legal-page__back" to="/">
          {t('offerBack')}
        </Link>
        <h1>{t('offerTitle')}</h1>
        <p className="legal-page__meta">
          {t('legalMeta', { name: STORE.name, address: t('address'), phone: STORE.phoneDisplay })}
        </p>

        {lang === 'ru' ? (
          <>
            <section>
              <h2>1. Предмет оферты</h2>
              <p>
                Настоящий документ является официальным предложением магазина {STORE.name} заключить
                договор розничной купли-продажи обуви на условиях, изложенных ниже.
              </p>
            </section>
            <section>
              <h2>2. Оформление заказа</h2>
              <p>
                Заявка на сайте не является мгновенной оплатой. После отправки формы сотрудник магазина
                связывается с покупателем, подтверждает наличие размера, стоимость и способ получения.
                Договор считается заключённым после подтверждения заказа продавцом.
              </p>
            </section>
            <section>
              <h2>3. Цена и оплата</h2>
              <p>
                Цены указаны в рублях и могут уточняться при подтверждении заявки. Оплата производится
                способами, согласованными с магазином (при получении или иным доступным способом).
              </p>
            </section>
            <section>
              <h2>4. Получение товара</h2>
              <p>
                Основной способ получения — самовывоз по адресу: {t('address')}. Срок подготовки
                заказа и возможность доставки согласовываются индивидуально.
              </p>
            </section>
            <section>
              <h2>5. Обмен и возврат</h2>
              <p>
                Обмен и возврат осуществляются в соответствии с законодательством РФ о защите прав
                потребителей при сохранении товарного вида, потребительских свойств и полной
                комплектации товара в установленные сроки.
              </p>
            </section>
            <section>
              <h2>6. Ответственность</h2>
              <p>
                Магазин прилагает усилия для актуальности информации о товарах и наличии размеров. Если
                выбранная модель временно отсутствует, мы предложим альтернативу или отменим позицию по
                согласованию с покупателем.
              </p>
            </section>
            <section>
              <h2>7. Контакты продавца</h2>
              <p>
                {STORE.name}, {t('address')}, тел.{' '}
                <a href={STORE.phoneHref}>{STORE.phoneDisplay}</a>, режим работы: {t('hours')}.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2>1. Subject of the offer</h2>
              <p>
                This document is an official offer by {STORE.name} to enter into a retail footwear
                purchase agreement on the terms below.
              </p>
            </section>
            <section>
              <h2>2. Placing an order</h2>
              <p>
                A website request is not instant payment. After the form is submitted, a store employee
                contacts the buyer, confirms size availability, price, and pickup method. The agreement
                is concluded after the seller confirms the order.
              </p>
            </section>
            <section>
              <h2>3. Price and payment</h2>
              <p>
                Prices are shown in rubles and may be clarified when the request is confirmed. Payment
                is made by methods agreed with the store (on pickup or another available method).
              </p>
            </section>
            <section>
              <h2>4. Receiving the goods</h2>
              <p>
                The main fulfillment method is pickup at {t('address')}. Preparation time and delivery
                options are agreed individually.
              </p>
            </section>
            <section>
              <h2>5. Exchange and returns</h2>
              <p>
                Exchange and returns follow Russian consumer protection law, provided the product keeps
                its original condition, consumer properties, and full packaging within the required
                timeframe.
              </p>
            </section>
            <section>
              <h2>6. Liability</h2>
              <p>
                The store works to keep product and size information up to date. If a selected model is
                temporarily unavailable, we will offer an alternative or cancel the item by agreement
                with the buyer.
              </p>
            </section>
            <section>
              <h2>7. Seller contacts</h2>
              <p>
                {STORE.name}, {t('address')}, tel.{' '}
                <a href={STORE.phoneHref}>{STORE.phoneDisplay}</a>, hours: {t('hours')}.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
