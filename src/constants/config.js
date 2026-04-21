export const SUPABASE = {
  url: 'https://byriesholblgyysnmnpu.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmllc2hvbGJsZ3l5c25tbnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDI4ODgsImV4cCI6MjA4NDY3ODg4OH0.QppXyuMNaidr3oNoCBv3SImYctDVgeLbWqeg60u3auE'
}

export const WHATSAPP = {
  phone: '5592991802094',
  defaultMessage: 'Olá! Vim pelo site da Manuari e gostaria de mais informações!',
  messages: {
    home: 'Olá! Vim pelo site da Manuari e gostaria de mais informações!',
    b2b: 'Olá! Gostaria de um orçamento para brindes corporativos.',
    product: (name, price) => `Olá! Quero o produto "${name}" no valor de R$ ${price}`,
    custom: (message) => message
  }
}

export const BANNERS = {
  hero: [
    {
      image: 'https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner6.png',
      link: '/produtos'
    },
    {
      image: 'https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner7.png',
      link: '/produtos/bottons'
    },
    {
      image: 'https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner5.png',
      link: 'https://wa.me/5592991802094?text=Olá, quero caneca dia das mães por 31,90'
    },
    {
      image: 'https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner4.png',
      link: 'https://wa.me/5592991802094?text=Olá, gostaria de saber mais sobre envio para outros estados!'
    }
  ],
  b2b: [
    'https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/b2b-1.png',
    'https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/b2b-2.png'
  ]
}

export const NAV_ITEMS = [
  { label: 'Todos', path: '/produtos' },
  { label: 'Canecas', path: '/produtos/canecas' },
  { label: 'Xícaras', path: '/produtos/xicaras' },
  { label: 'Azulejos', path: '/produtos/azulejos' },
  { label: 'Bottons', path: '/produtos/bottons' },
  { label: 'Para Empresas', path: '/para-empresas' }
]

export const CACHE_TTL = 5 * 60 * 1000 // 5 minutos
