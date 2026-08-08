const asset = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export const images = {
  hero: asset('hero.jpg'),
  women: asset('women.jpg'),
  men: asset('men.jpg'),
  kids: asset('kids.jpg'),
  sneakers: asset('sneakers.jpg'),
  boots: asset('boots.jpg'),
  casual: asset('casual.jpg'),
  menSneakers: asset('men-sneakers.jpg'),
  trend1: asset('trend1.jpg'),
  trend2: asset('trend2.jpg'),
  trend3: asset('trend3.jpg'),
  sustainable: asset('sustainable.jpg'),
  cta: asset('cta.jpg'),
} as const
