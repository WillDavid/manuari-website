import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prerender from 'vite-plugin-prerender'

export default defineConfig({
  plugins: [
    vue(),
    prerender({
      routes: [
        '/',
        '/produtos',
        '/produtos/canecas',
        '/produtos/xicaras',
        '/produtos/azulejos',
        '/para-empresas',
        '/sobre'
      ]
    })
  ]
})