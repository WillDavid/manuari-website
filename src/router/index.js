import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import OurTermsView from '../views/OurTermsView.vue'
import DeliveryPolicy from '../views/DeliveryPolicy.vue'
import ProductDatailsView from '../views/ProductDatailsView.vue'
import B2BView from '../views/B2BView.vue'

const routes = [

  {
    path: '/',
    component: HomeView,
    meta: {
      title: 'Caneca Personalizada em Manaus | Manuari',
      description: 'Compre caneca personalizada em Manaus com nome, foto ou arte exclusiva. Produção rápida e entrega em toda Manaus.'
    }
  },

  {
    path: '/produtos',
    component: ProductsView,
    meta: {
      title: 'Canecas Personalizadas | Manuari',
      description: 'Veja nossas canecas personalizadas com nome, foto ou arte exclusiva. Ideais para presentes e lembranças.'
    }
  },

  {
    path: '/produtos/:tipo',
    component: ProductsView,
    props: true,
    meta: {
      title: 'Caneca Personalizada com Foto ou Nome | Manuari',
      description: 'Escolha sua caneca personalizada com foto ou nome. Personalize sua xícara com arte exclusiva.'
    }
  },

  {
    path: '/produto/:id',
    component: ProductDatailsView,
    meta: {
      title: 'Comprar Caneca Personalizada | Manuari',
      description: 'Compre caneca personalizada com foto, nome ou arte exclusiva. Produção rápida em Manaus.'
    }
  },

  {
    path: '/sobre',
    component: AboutView,
    meta: {
      title: 'Sobre a Manuari | Canecas Personalizadas',
      description: 'Conheça a Manuari, especialista em caneca personalizada em Manaus.'
    }
  },

  {
    path: '/para-empresas',
    component: B2BView,
    meta: {
      title: 'Canecas Personalizadas para Empresas | Manuari',
      description: 'Produção de canecas personalizadas para empresas, brindes corporativos e eventos.'
    }
  },

  {
    path: '/politica-privacidade',
    component: PrivacyPolicyView,
    meta: {
      title: 'Política de Privacidade | Manuari',
      description: 'Política de privacidade da Manuari.'
    }
  },

  {
    path: '/politica-entrega',
    component: DeliveryPolicy,
    meta: {
      title: 'Política de Entrega | Manuari',
      description: 'Veja como funciona a entrega das canecas personalizadas em Manaus.'
    }
  },

  {
    path: '/nossos-termos',
    component: OurTermsView,
    meta: {
      title: 'Termos de Uso | Manuari',
      description: 'Termos de uso da loja Manuari.'
    }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFoundView,
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