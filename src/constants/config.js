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
      image: 'https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner2.png',
      link: '/produtos'
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

export const PRODUCT_TYPES = {
  canecas: {
    label: 'Canecas',
    variations: [
      { label: 'Total Branca', price: 34.9 },
      { label: 'Alça e Interior Preto', price: 46.9 },
      { label: 'Alça e Interior Rosa', price: 46.9 },
      { label: 'Alça e Interior Vermelho', price: 46.9 },
      { label: 'Alça e Interior Amarelo', price: 46.9 },
      { label: 'Alça e Interior Lilás', price: 46.9 },
      { label: 'Alça e Interior Azul', price: 46.9 }
    ],
    priceRange: 'R$ 34,90 – R$ 46,90'
  },
  xicaras: {
    label: 'Xícaras',
    variations: [
      { label: 'Com Pires', price: 46.9 },
      { label: 'Sem Pires', price: 42.9 }
    ],
    priceRange: 'R$ 42,90 – R$ 46,90'
  },
  azulejos: {
    label: 'Azulejos',
    variations: [
      { label: '15x15', price: 29.9 },
      { label: '20x20', price: 34.9 }
    ],
    priceRange: 'R$ 29,90 – R$ 34,90'
  },
  canecas3d: {
    label: 'Canecas 3D',
    variations: [
      { label: 'Cerâmica', price: 69.90 }
    ],
    priceRange: 'R$ 69,90'
  }
}

export const NAV_ITEMS = [
  { label: 'Todos', path: '/produtos' },
  { label: 'Canecas', path: '/produtos/canecas' },
  { label: 'Xícaras', path: '/produtos/xicaras' },
  { label: 'Azulejos', path: '/produtos/azulejos' },
  { label: 'Para Empresas', path: '/para-empresas' }
]

export const CACHE_TTL = 5 * 60 * 1000 // 5 minutos