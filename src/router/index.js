import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Caneca Personalizada em Manaus | Manuari',
      description: 'Compre caneca personalizada em Manaus com nome, foto ou arte exclusiva. Produção rápida e entrega em toda Manaus.'
    }
  },

  {
    path: '/produtos',
    component: () => import('../views/ProductsView.vue'),
    meta: {
      title: 'Canecas Personalizadas | Manuari',
      description: 'Veja nossas canecas personalizadas com nome, foto ou arte exclusiva. Ideais para presentes e lembranças.'
    }
  },

  {
    path: '/produtos/:tipo',
    component: () => import('../views/ProductsView.vue'),
    props: true,
    meta: {
      title: 'Caneca Personalizada com Foto ou Nome | Manuari',
      description: 'Escolha sua caneca personalizada com foto ou nome. Personalize sua xícara com arte exclusiva.'
    }
  },

  {
    path: '/produto/:id',
    component: () => import('../views/ProductDatailsView.vue'),
    meta: {
      title: 'Comprar Caneca Personalizada | Manuari',
      description: 'Compre caneca personalizada com foto, nome ou arte exclusiva. Produção rápida em Manaus.'
    }
  },

  {
    path: '/sobre',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'Sobre a Manuari | Canecas Personalizadas',
      description: 'Conheça a Manuari, especialista em caneca personalizada em Manaus.'
    }
  },

  {
    path: '/para-empresas',
    component: () => import('../views/B2BView.vue'),
    meta: {
      title: 'Canecas Personalizadas para Empresas | Manuari',
      description: 'Produção de canecas personalizadas para empresas, brindes corporativos e eventos.'
    }
  },

  {
    path: '/politica-privacidade',
    component: () => import('../views/PrivacyPolicyView.vue'),
    meta: {
      title: 'Política de Privacidade | Manuari',
      description: 'Política de privacidade da Manuari.'
    }
  },

  {
    path: '/politica-entrega',
    component: () => import('../views/DeliveryPolicy.vue'),
    meta: {
      title: 'Política de Entrega | Manuari',
      description: 'Veja como funciona a entrega das canecas personalizadas em Manaus.'
    }
  },

  {
    path: '/nossos-termos',
    component: () => import('../views/OurTermsView.vue'),
    meta: {
      title: 'Termos de Uso | Manuari',
      description: 'Termos de uso da loja Manuari.'
    }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Página não encontrada | Manuari',
      description: 'A página que você procura não existe.'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router