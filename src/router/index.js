import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Caneca Personalizada em Manaus | Manuari - Botton, Caneca, Xícara',
      description: 'Caneca personalizada em Manaus com foto, nome ou arte. Botton personalizado, xícara e azulejo. Entrega rápida em Manaus. Compre online!',
      keywords: 'caneca personalizada, caneca personalizada manaus, caneca com foto, caneca com nome, botton personalizado, botton manaus, botton com foto, botton personalizado online, lembrancinha personalizada, presente personalizado manaus, xícara personalizada, azulejo personalizado'
    }
  },

  {
    path: '/produtos',
    component: () => import('../views/ProductsView.vue'),
    meta: {
      title: 'Canecas e Bottons Personalizados em Manaus | Manuari',
      description: 'Canecas personalizadas com foto ou nome. Botton personalizado com sua arte. Xícaras e azulejos personalizados. Produção rápida em Manaus. Compre online!',
      keywords: 'caneca personalizada, botton personalizado, caneca manaus, botton manaus, xícara personalizada, azulejo personalizado, caneca presente, botton lembrancinha, comprar caneca personalizada, comprar botton personalizado'
    }
  },

  {
    path: '/produtos/:tipo',
    component: () => import('../views/ProductsView.vue'),
    props: true,
    meta: (route) => {
      const tipoMeta = {
        canecas: {
          title: 'Caneca Personalizada em Manaus | Manuari',
          description: 'Canecas personalizadas em Manaus com foto, nome ou arte exclusiva. Ideais para presente, casamento, aniversário e dia dos professores. Compre online!',
          keywords: 'caneca personalizada, caneca personalizada manaus, caneca com foto, caneca com nome, caneca presente, caneca aniversário, caneca casamento, caneca dia dos professores, comprar caneca personalizada, onde fazer caneca personalizada'
        },
        xicaras: {
          title: 'Xícara Personalizada em Manaus | Manuari',
          description: 'Xícaras personalizadas em Manaus. Xícara com foto, nome ou arte exclusiva. Perfeitas para presente, café da manhã e eventos corporativos. Compre online!',
          keywords: 'xícara personalizada, xícara personalizada manaus, xícara com foto, xícara com nome, xícara presente, xícara café, xícara corporativa, xícara corporativa manaus, comprar xícara personalizada, xícara criativa'
        },
        azulejos: {
          title: 'Azulejo Personalizado em Manaus | Manuari',
          description: 'Azulejos personalizados em Manaus. Decoração única para ambientes. Ideal para homenagem, presente e décor corporativo. Azulejo decorativo com sua arte.',
          keywords: 'azulejo personalizado, azulejo personalizado manaus, azulejo decorativo, azulejo presente, azulejo decoração, azulejo escritorio, azulejo escritório, comprar azulejo personalizado, azulejo personalizado online'
        },
        bottons: {
          title: 'Botton Personalizado Online | Manuari - Com Sua Arte, Foto ou Logo',
          description: 'Botton personalizado online com sua arte, foto ou logo. Compre botton 33mm, 44mm ou 58mm. Ideal para eventos, empresas, casamentos e lembrancinhas. Entrega rápida em Manaus!',
          keywords: 'botton personalizado, botton personalizado online, botton com foto, botton com sua arte, botton com logo, botton manaus, botton personalizado manaus, botão personalizado, botão personalizado manaus, botão com foto, botão com sua arte, comprar botton, botton lembrancinha, botton evento, botton casamento, botton formatura, botão corporativo, botão para empresa, botton para empresa, botão lembrancinha, fazer botton, botton personalizado 33mm, botton personalizado 44mm, botton personalizado 58mm, pins personalizado, broche personalizado, botton barato, botton promoção'
        }
      }

      const meta = tipoMeta[route.params.tipo]
      return meta || {
        title: 'Produtos Personalizados | Manuari',
        description: 'Produtos personalizados em Manaus. Canecas, bottons, xícaras e azulejos. Compre online!',
        keywords: 'produtos personalizados, caneca personalizada, botton personalizado, xícara personalizada, azulejo personalizado'
      }
    }
  },

  {
    path: '/produto/:id',
    component: () => import('../views/ProductDatailsView.vue'),
    meta: {
      title: 'Comprar Caneca ou Botton Personalizado | Manuari',
      description: 'Compre caneca personalizada, botton personalizado e muito mais. Produção rápida e entrega em Manaus. Personalize do seu jeito!',
      keywords: 'comprar caneca personalizada, comprar botton personalizado, caneca online, botton online, produto personalizado manaus'
    }
  },

  {
    path: '/sobre',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'Sobre a Manuari | Caneca Personalizada em Manaus',
      description: 'Conheça a Manuari, especialista em canecas e bottons personalizados em Manaus. Produzimos produtos únicos com foto, nome ou arte exclusiva.',
      keywords: 'manuari, sobre manuari, empresa manuari, caneca manaus, botton manaus, historia manuari, personalização manaus'
    }
  },

  {
    path: '/para-empresas',
    component: () => import('../views/B2BView.vue'),
    meta: {
      title: 'Caneca e Botton Personalizado para Empresas | Manuari',
      description: 'Brindes corporativos personalizados para empresas. Canecas e bottons personalizados para ações de RH, marketing e eventos corporativos. Solicite orçamento!',
      keywords: 'caneca corporativa, botton corporativo, brindes corporativos manaus, brinde empresarial, presente corporativo, caneca para empresa, botton para empresa, lembrancinha corporativa, caneca para rh, caneca marketing, caneca evento, caneca dia da empresa'
    }
  },

  {
    path: '/politica-privacidade',
    component: () => import('../views/PrivacyPolicyView.vue'),
    meta: {
      title: 'Política de Privacidade | Manuari',
      description: 'Política de Privacidade da Manuari - LGPD. Seus dados são protegidos.',
      keywords: 'política de privacidade manuari, lgpd manuari, privacidade manuari'
    }
  },

  {
    path: '/politica-entrega',
    component: () => import('../views/DeliveryPolicy.vue'),
    meta: {
      title: 'Política de Entrega | Manuari',
      description: 'Política de Entrega da Manuari. Entrega em Manaus via Uber Flash, 99 ou similares.',
      keywords: 'política de entrega manuari, entrega manaus, frete manaus'
    }
  },

  {
    path: '/nossos-termos',
    component: () => import('../views/OurTermsView.vue'),
    meta: {
      title: 'Termos de Uso | Manuari',
      description: 'Termos de Uso da Manuari.',
      keywords: 'termos de uso manuari, termos manuari, condições manuari'
    }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Página Não Encontrada | Manuari',
      description: 'A página que você procura não existe.',
      keywords: ''
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router