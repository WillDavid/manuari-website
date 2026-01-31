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
  { path: '/', component: HomeView },
  { path: '/produtos', component: ProductsView },
  { path: '/sobre', component: AboutView },
  { path: '/politica-privacidade', component: PrivacyPolicyView },
  { path: '/politica-entrega', component: DeliveryPolicy },
  { path: '/nossos-termos', component: OurTermsView },
  { path: '/produtos/:tipo', component: ProductsView, props: true },
  { path: '/produto/:id', component: ProductDatailsView},
  { path: '/para-empresas', component: B2BView},
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFoundView }

]

export default createRouter({
  history: createWebHistory(),
  routes
})
