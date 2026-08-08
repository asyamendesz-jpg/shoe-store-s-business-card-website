const asset = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export const images = {
  hero: asset('hero.png'),
  women: asset('women.png'),
  men: asset('men.jpg'),
  kids: asset('kids.png'),
  sneakers: asset('sneakers.png'),
  boots: asset('boots.png'),
  casual: asset('casual.png'),
  menSneakers: asset('men-sneakers.jpg'),
  trend1: asset('trend1.jpg'),
  trend2: asset('trend2.jpg'),
  trend3: asset('trend3.jpg'),
  sustainable: asset('sustainable.jpg'),
  cta: asset('cta.jpg'),
} as const
