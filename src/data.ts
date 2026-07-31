export const images = {
  hero:
    'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=1800&q=80',
  women:
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
  men:
    'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80',
  kids:
    'https://images.unsplash.com/photo-1514989940723-e8e51635b132?auto=format&fit=crop&w=900&q=80',
  sneakers:
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80',
  boots:
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80',
  casual:
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80',
  trend1:
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
  trend2:
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  trend3:
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80',
  sustainable:
    'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=1400&q=80',
  cta:
    'https://images.unsplash.com/photo-1528701800489-20be3c2ea5d3?auto=format&fit=crop&w=1600&q=80',
  review1:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  review2:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  review3:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
  review4:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
} as const

export const benefits = [
  {
    title: 'Честная цена',
    text: 'Не переплачивайте за громкое имя бренда.',
  },
  {
    title: 'Комфорт каждый день',
    text: 'Обувь, в которой удобно ходить весь день.',
  },
  {
    title: 'Современный дизайн',
    text: 'Следим за трендами, чтобы доступная обувь выглядела стильно.',
  },
  {
    title: 'Большой выбор размеров',
    text: 'Помогаем найти подходящую пару.',
  },
  {
    title: 'Проверенные поставщики',
    text: 'Выбираем модели с хорошим балансом цены и качества.',
  },
  {
    title: 'Помощь в выборе',
    text: 'Подскажем размер и подходящую модель.',
  },
] as const

export const categories = [
  { title: 'Женская обувь', image: images.women, href: '/#products' },
  { title: 'Мужская обувь', image: images.men, href: '/#products' },
  { title: 'Детская обувь', image: images.kids, href: '/#products' },
  { title: 'Кроссовки', image: images.sneakers, href: '/#products' },
  { title: 'Ботинки', image: images.boots, href: '/#products' },
  { title: 'Повседневная обувь', image: images.casual, href: '/#products' },
] as const

export const problems = [
  {
    problem: 'Старая обувь быстро изнашивается',
    solution: 'Подбираем модели с хорошим соотношением цены и срока службы',
  },
  {
    problem: 'Ноги устают',
    solution: 'Выбираем удобные модели для активного дня',
  },
  {
    problem: 'Сложно подобрать размер',
    solution: 'Помогаем выбрать подходящую пару',
  },
] as const

export const trends = [
  {
    title: 'Городские кроссовки',
    meta: 'Универсальный силуэт',
    image: images.trend1,
  },
  {
    title: 'Мягкие пастельные тона',
    meta: 'Современная палитра',
    image: images.trend2,
  },
  {
    title: 'Лёгкие повседневные модели',
    meta: 'На каждый день',
    image: images.trend3,
  },
] as const

export const reviews = [
  {
    name: 'Анна К.',
    photo: images.review1,
    text: 'Боялась, что за небольшие деньги будет неудобно. Носила кроссовки весь день — ноги не устали. Размер подошёл идеально.',
  },
  {
    name: 'Дмитрий С.',
    photo: images.review2,
    text: 'Искал нормальные ботинки без переплаты за бренд. Качество приятно удивило: швы аккуратные, подошва держит форму.',
  },
  {
    name: 'Елена М.',
    photo: images.review3,
    text: 'Помогли выбрать размер для ребёнка по фото стельки. Обмен тоже спокойный — чувствуешь, что о тебе думают.',
  },
  {
    name: 'Игорь В.',
    photo: images.review4,
    text: 'Наконец магазин, где современные модели и адекватная цена. Купил пару на каждый день — и себе, и жене.',
  },
] as const

export const faqs = [
  {
    q: 'Как подобрать размер?',
    a: 'Измерьте длину стопы в сантиметрах вечером и сверьтесь с нашей таблицей размеров. Если сомневаетесь — позвоните 8-928-775-36-93: подскажем размер по модели и полноте стопы.',
  },
  {
    q: 'Есть ли обмен?',
    a: 'Да. Если пара не подошла по размеру или посадке, вы можете обменять её в течение 14 дней при сохранении товарного вида и полной комплектации.',
  },
  {
    q: 'Можно ли заказать онлайн?',
    a: 'Конечно. Добавьте товары в корзину и оформите заявку на сайте. Мы перезвоним, подтвердим наличие размера и подготовим заказ к самовывозу.',
  },
  {
    q: 'Какая гарантия?',
    a: 'На все модели действует гарантия производителя на производственные дефекты. Мы проверяем товар перед выдачей и помогаем с обращением по гарантийным случаям.',
  },
  {
    q: 'Как быстро получить заказ?',
    a: 'Самовывоз — г. Новочеркасск, ул. Думенко 4. В наличии модели обычно можно забрать в день обращения или на следующий день после подтверждения заявки.',
  },
] as const
