<script>
import { fetchProductById, fetchProductBySlug, fetchProductsByType, registrarAcesso } from '../services/supabaseApi'
import { WHATSAPP } from '../constants/config'
import { usePreferencias } from '../composables/usePreferencias'
import { useJsonLd, jsonLd } from '../composables/useJsonLd'
import { getSeoImageUrl, getSeoImageUrls } from '../utils/seoImage'
import Breadcrumb from '../components/Breadcrumb.vue'
import Specifications from '../components/Specifications.vue'
import ProductCarousel from '../components/ProductCarousel.vue'

const BOTTON_VARIACAO_LABELS = {
  '33mm': 'Button 33mm (Pequeno)',
  '44mm': 'Button 44mm (Padrão)',
  '58mm': 'Button 58mm (Premium)'
}

export default {
  name: 'ProductDetailsView',
  components: { Breadcrumb, Specifications, ProductCarousel },

  setup() {
    const { adicionarVisualizacao } = usePreferencias()
    const { inject: injectJsonLd } = useJsonLd()
    return { adicionarVisualizacao, injectJsonLd }
  },

  data() {
    return {
      produto: null,
      loading: true,
      notFound: false,
      imagemAtiva: null,
      variacaoIdSelecionada: null,
      whatsappPhone: WHATSAPP.phone,
      produtosSemelhantes: []
    }
  },

  computed: {
    nomeProdutoNormalizado() {
      return String(this.produto?.name || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    },

    variacoes() {
      return this.produto?.variacoes || []
    },

    variacaoSelecionada() {
      if (!this.variacoes.length) return null

      return this.variacoes.find((variacao) => variacao.id === this.variacaoIdSelecionada)
        || this.variacoes[0]
        || null
    },

    rotuloSeletor() {
      switch (this.variacaoSelecionada?.tipoVariacao) {
        case 'cor':
          return 'Escolha a cor:'
        case 'tamanho':
          return 'Escolha o tamanho:'
        case 'modelo':
          return 'Escolha o modelo:'
        default:
          return 'Escolha uma opção:'
      }
    },

    rotuloWhats() {
      switch (this.variacaoSelecionada?.tipoVariacao) {
        case 'cor':
          return 'Cor'
        case 'tamanho':
          return 'Tamanho'
        case 'modelo':
          return 'Modelo'
        default:
          return 'Opção'
      }
    },

    mensagemWhats() {
      if (!this.produto) return ''

      const linhas = [`Olá! Quero o produto "${this.produto.name}"`]

      if (this.variacaoSelecionada?.nome) {
        linhas.push(`${this.rotuloWhats}: ${this.variacaoSelecionada.nome}`)
      }

      if (this.precoSelecionado != null) {
        linhas.push(`Valor: R$ ${this.precoSelecionado.toFixed(2)}`)
      }

      return linhas.join('\n')
    },

    linkWhats() {
      return `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(this.mensagemWhats)}`
    },

    tipoProduto() {
      return this.produto?.tipo || null
    },

    categoriasProduto() {
      return this.produto?.categorias || []
    },

    ehBotton() {
      return this.produto?.tipo === 'bottons'
    },

    ehBottonSobDemanda() {
      return this.ehBotton && this.nomeProdutoNormalizado.includes('envie sua arte')
    },

    ehBottonKitOuIndividual() {
      return this.ehBotton && !this.ehBottonSobDemanda && (
        this.nomeProdutoNormalizado.includes('kit')
        || this.nomeProdutoNormalizado.includes('individual')
      )
    },

    quantidadeKit() {
      const match = this.produto?.name?.match(/kit\s+(\d+)/i)
      return match ? Number(match[1]) : 1
    },

    faixasPreco() {
      return this.variacaoSelecionada?.priceTiers || []
    },

    precoBaseBottonPronto() {
      if (!this.ehBottonKitOuIndividual || !this.faixasPreco.length) return null

      const faixaDestaque = this.faixasPreco.find((faixa) => faixa.destaque)
      const faixaReferencia = faixaDestaque || this.faixasPreco[0]

      if (!faixaReferencia?.preco) return null

      if (this.nomeProdutoNormalizado.includes('kit')) {
        return faixaReferencia.preco * this.quantidadeKit
      }

      return faixaReferencia.preco
    },

    precoSelecionado() {
      if (!this.variacaoSelecionada) {
        return this.produto?.preco ?? this.produto?.precoMinimo ?? null
      }

      if (this.variacaoSelecionada.preco != null) return this.variacaoSelecionada.preco
      if (this.ehBottonKitOuIndividual) return this.precoBaseBottonPronto
      if (!this.faixasPreco.length) return this.variacaoSelecionada.precoMinimo

      return null
    },

    precoExibicao() {
      if (this.ehBottonSobDemanda) {
        return ''
      }

      if (this.precoSelecionado != null) {
        return `R$ ${this.precoSelecionado.toFixed(2)}`
      }

      return this.produto?.priceRange || ''
    },

    temTabelaPreco() {
      if (!this.ehBottonSobDemanda) return false

      return this.variacoes.some((variacao) => (variacao.priceTiers || []).length > 0)
    },

    tabelaPrecoBottons() {
      if (!this.temTabelaPreco) return null

      const variacoesOrdenadas = [...this.variacoes]
        .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
        .map((variacao) => ({
          id: variacao.id,
          titulo: BOTTON_VARIACAO_LABELS[variacao.nome] || `Button ${variacao.nome}`,
          priceTiers: variacao.priceTiers || []
        }))

      const linhasMap = new Map()

      variacoesOrdenadas.forEach((variacao) => {
        variacao.priceTiers.forEach((faixa) => {
          if (!faixa || faixa.preco == null) return

          const labelOriginal = faixa.quantidadeLabel || `${faixa.quantidadeMinima}+`
          const chave = `${faixa.quantidadeMinima}-${labelOriginal}`

          if (!linhasMap.has(chave)) {
            linhasMap.set(chave, {
              chave,
              quantidadeLabel: labelOriginal.replace(/\*/g, '').trim(),
              quantidadeMinima: faixa.quantidadeMinima || 0,
              possuiObservacao: /\*/.test(labelOriginal),
              precos: {}
            })
          }

          const linha = linhasMap.get(chave)
          linha.precos[variacao.id] = faixa.preco

          if (/\*/.test(labelOriginal)) {
            linha.possuiObservacao = true
          }
        })
      })

      const linhas = Array.from(linhasMap.values())
        .sort((a, b) => a.quantidadeMinima - b.quantidadeMinima)

      if (!variacoesOrdenadas.length || !linhas.length) return null

      return {
        variacoes: variacoesOrdenadas,
        linhas
      }
    },

    possuiObsTabelaBottons() {
      return Boolean(this.tabelaPrecoBottons?.linhas.some((linha) => linha.possuiObservacao))
    },

    mostrarPreco() {
      return Boolean(this.precoExibicao)
    },

    textoBotao() {
      return this.temTabelaPreco || this.ehBottonKitOuIndividual ? 'Fazer Orçamento' : 'Pedir no WhatsApp'
    },

    productJsonLd() {
      if (!this.produto) return null

      const BASE_URL = 'https://manuari.com.br'
      const productPath = this.getCanonicalProductPath(this.produto)

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: this.produto.name,
        description: this.produto.name,
        image: getSeoImageUrls(this.produto.images || []).map((url) => (
          url.startsWith('/') ? `https://manuari.com.br${url}` : url
        )),
        url: `${BASE_URL}${productPath}`,
        productID: String(this.produto.id),
        brand: {
          '@type': 'Brand',
          name: 'Manuari'
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Manuari',
          url: BASE_URL
        },
        category: this.produto.tipo === 'bottons' ? 'Botton personalizado' : 'Caneca personalizada',
        offers: {
          '@type': 'Offer',
          url: `${BASE_URL}${productPath}`,
          availability: 'https://schema.org/InStock',
          priceCurrency: 'BRL',
          seller: {
            '@type': 'Organization',
            name: 'Manuari'
          }
        }
      }

      if (this.precoSelecionado != null) {
        schema.offers.price = this.precoSelecionado.toFixed(2)
      } else if (this.produto.precoMinimo != null) {
        schema.offers.price = this.produto.precoMinimo.toFixed(2)
      }

      return schema
    }
  },

  watch: {
    productJsonLd(newVal) {
      if (newVal && this.produto) {
        this.injectJsonLd(`produto-${this.produto.id}`, newVal)
      }
    },
    '$route.fullPath'() {
      this.carregarProduto()
    }
  },

  async mounted() {
    await this.carregarProduto()
  },

  beforeUnmount() {
    jsonLd.remove()
  },

  methods: {
    getCanonicalProductPath(product) {
      if (!product?.tipo || !product?.slug) return '/produtos'
      return `/produtos/${product.tipo}/${product.slug}`
    },

    resolveSeoImageUrl(url) {
      return getSeoImageUrl(url)
    },

    atualizarSeoProduto(product) {
      if (!product) return

      const canonicalPath = this.getCanonicalProductPath(product)
      const productImage = product.images?.[0] ? getSeoImageUrl(product.images[0]) : null
      const tipoLabel = product.tipo === 'bottons'
        ? 'botton personalizado'
        : product.tipo === 'xicaras'
          ? 'xícara personalizada'
          : product.tipo === 'azulejos'
            ? 'azulejo personalizado'
            : 'caneca personalizada'

      document.title = `${product.name} | ${tipoLabel} em Manaus | Manuari`

      const description = document.querySelector("meta[name='description']")
      if (description) {
        description.setAttribute('content', `${product.name}. ${tipoLabel} da Manuari com personalização exclusiva e atendimento via WhatsApp em Manaus.`)
      }

      const canonical = document.getElementById('canonical-url')
      if (canonical) {
        canonical.setAttribute('href', `https://manuari.com.br${canonicalPath}`)
      }

      const ogUrl = document.getElementById('og-url')
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://manuari.com.br${canonicalPath}`)
      }

      const ogTitle = document.querySelector("meta[property='og:title']")
      if (ogTitle) {
        ogTitle.setAttribute('content', document.title)
      }

      const ogDescription = document.querySelector("meta[property='og:description']")
      if (ogDescription) {
        ogDescription.setAttribute('content', `${product.name}. ${tipoLabel} em Manaus pela Manuari.`)
      }

      const ogImageAlt = document.querySelector("meta[property='og:image:alt']")
      if (ogImageAlt) {
        ogImageAlt.setAttribute('content', `${product.name} - ${tipoLabel} da Manuari em Manaus`)
      }

      const twitterTitle = document.querySelector("meta[name='twitter:title']")
      if (twitterTitle) {
        twitterTitle.setAttribute('content', document.title)
      }

      const twitterDescription = document.querySelector("meta[name='twitter:description']")
      if (twitterDescription) {
        twitterDescription.setAttribute('content', `${product.name}. ${tipoLabel} em Manaus pela Manuari.`)
      }

      if (productImage) {
        const ogImage = document.querySelector("meta[property='og:image']")
        if (ogImage) {
          ogImage.setAttribute('content', productImage.startsWith('/') ? `https://manuari.com.br${productImage}` : productImage)
        }

        const twitterImage = document.querySelector("meta[name='twitter:image']")
        if (twitterImage) {
          twitterImage.setAttribute('content', productImage.startsWith('/') ? `https://manuari.com.br${productImage}` : productImage)
        }
      }
    },

    definirProduto(data) {
      this.produto = data
      this.imagemAtiva = data.images?.[0] || null
      this.variacaoIdSelecionada = data.variacoes?.[0]?.id || null

      this.adicionarVisualizacao(data)

      if (this.productJsonLd) {
        this.injectJsonLd(`produto-${data.id}`, this.productJsonLd)
      }
    },

    async carregarProduto() {
      this.loading = true
      this.notFound = false

      try {
        const legacyId = this.$route.params.id
        const tipo = this.$route.params.tipo
        const slug = this.$route.params.slug

        let data = null

        if (legacyId) {
          data = await fetchProductById(legacyId)
        } else {
          data = await fetchProductBySlug(tipo, slug)
        }

        if (!data) {
          this.produto = null
          this.produtosSemelhantes = []
          this.notFound = true
          return
        }

        this.definirProduto(data)

        const canonicalPath = this.getCanonicalProductPath(data)
        if (this.$route.path !== canonicalPath) {
          await this.$router.replace(canonicalPath)
          return
        }

        try {
          registrarAcesso(data.id)
        } catch {
          // noop
        }

        this.atualizarSeoProduto(data)

        await this.carregarSemelhantes(data.tipo, data.categorias, data.id)
      } catch (err) {
        console.error('Erro ao carregar produto', err)
      } finally {
        this.loading = false
      }
    },

    async carregarSemelhantes(tipo, categorias, produtoId) {
      if (!tipo) return
      
      try {
        const todos = await fetchProductsByType(tipo)

        const produtosMesmoTipo = todos.filter((p) => p.id !== produtoId)
        const produtosPorCategoria = produtosMesmoTipo
          .filter(p => {
            if (!p.categorias?.length) return false
            if (!categorias?.length) return false
            const temCategoriaComum = p.categorias.some(cat => categorias.includes(cat))
            return temCategoriaComum
          })

        const filtrados = (produtosPorCategoria.length ? produtosPorCategoria : produtosMesmoTipo)
          .slice(0, 6)
         
        this.produtosSemelhantes = filtrados
      } catch (e) {
        console.error(e)
      }
    },

    selecionarVariacao(variacaoId) {
      this.variacaoIdSelecionada = variacaoId
    }
  }
}
</script>


<template>
  <section v-if="!loading && produto" class="product-details">
    
    <div class="breadcrumb-wrapper">
      <Breadcrumb
        :tipo="produto.tipo"
        :nomeProduto="produto.name"
      />
    </div>

    <div class="gallery">
      <div class="thumbs">
        <img
          v-for="(img, i) in produto.images"
          :key="i"
          :src="resolveSeoImageUrl(img)"
          :alt="`${produto.name} - ${produto.tipo === 'canecas' ? 'caneca personalizada' : produto.tipo === 'bottons' ? 'botton personalizado' : produto.tipo === 'xicaras' ? 'xícara personalizada' : 'azulejo personalizado'} da Manuari em Manaus - foto ${i + 1}`"
          :title="`${produto.name} - foto ${i + 1}`"
          :class="{ active: imagemAtiva === img }"
          @click="imagemAtiva = img"
        />
      </div>

      <div class="main-image">
        <img
          :src="resolveSeoImageUrl(imagemAtiva)"
          :alt="`${produto.name} - ${produto.tipo === 'canecas' ? 'caneca personalizada' : produto.tipo === 'bottons' ? 'botton personalizado' : produto.tipo === 'xicaras' ? 'xícara personalizada' : 'azulejo personalizado'} da Manuari em Manaus`"
          :title="produto.name"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>

    <div class="info">
      <h1>{{ produto.name }}</h1>

      <div v-if="variacoes.length">
        <h4>{{ rotuloSeletor }}</h4>

        <div class="options">
          <button
            v-for="v in variacoes"
            :key="v.id"
            :class="{ selected: variacaoSelecionada?.id === v.id }"
            @click="selecionarVariacao(v.id)"
          >
            {{ v.nome }}
          </button>
        </div>
      </div>

      <div v-if="temTabelaPreco && tabelaPrecoBottons" class="tabela-bottons">
        <table class="tabela-precos tabela-precos-bottons">
          <thead>
            <tr>
              <th>Quantidade</th>
              <th
                v-for="variacao in tabelaPrecoBottons.variacoes"
                :key="variacao.id"
              >
                {{ variacao.titulo }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="linha in tabelaPrecoBottons.linhas"
              :key="linha.chave"
            >
              <td class="qty">
                {{ linha.quantidadeLabel }}
              </td>
              <td
                v-for="variacao in tabelaPrecoBottons.variacoes"
                :key="`${linha.chave}-${variacao.id}`"
                class="unit"
              >
                <template v-if="linha.precos[variacao.id] != null">
                  R$ {{ linha.precos[variacao.id].toFixed(2) }}
                  <span
                    v-if="linha.possuiObservacao"
                    class="tabela-asterisco"
                  >*</span>
                </template>
                <template v-else>
                  --
                </template>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="possuiObsTabelaBottons" class="tabela-precos-nota">
          * Valores especiais para pedidos a partir de 100 unidades. Confirme com nosso time para validar a arte e o prazo.
        </p>
      </div>

      <div v-if="mostrarPreco" class="price">
        {{ precoExibicao }}
      </div>

      <a
        v-if="variacaoSelecionada"
        :href="linkWhats"
        target="_blank"
        class="buy-btn"
      >
        <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {{ textoBotao }}
      </a>
    </div>
  </section>

  <div v-else-if="!loading && notFound" class="loading">
    Produto não encontrado.
  </div>

  <div v-else class="loading">
    Carregando produto...
  </div>

  <Specifications v-if="tipoProduto" :tipo="tipoProduto" />

  <section v-if="produtosSemelhantes.length" class="semelhantes-section">
    <h2>Produtos Semelhantes</h2>
    <ProductCarousel
      :products="produtosSemelhantes"
      :shuffle="true"
    />
  </section>
</template>


<style scoped>
.product-details {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  padding: 2rem 0;
}

.gallery {
  display: flex;
  gap: 1rem;
}

.thumbs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.thumbs img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  border: 1px solid #ddd;
}

.thumbs img.active {
  opacity: 1;
  border-color: #000;
}

.main-image img {
  width: 100%;
  max-width: 420px;
  object-fit: contain;
}


.info h1 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.options button {
  padding: 0.45rem 0.9rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-size: 0.85rem;
}

.options button.selected {
  border-color: #000;
  font-weight: 600;
}

.quantidade-input {
  margin: 1rem 0;
}

.quantidade-input h4 {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.quantidade-input input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 120px;
}

.tabela-bottons {
  margin: 1.5rem 0;
}

.tabela-precos {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  border: 2px solid #111;
  border-radius: 8px;
  overflow: hidden;
}

.tabela-precos th {
  background: #111;
  color: white;
  padding: 0.6rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.tabela-precos td {
  padding: 0.7rem 0.5rem;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.tabela-precos-bottons th {
  font-size: 0.8rem;
  letter-spacing: 0.05em;
}

.tabela-precos-bottons td {
  font-size: 1rem;
}

.tabela-precos .qty {
  font-weight: 600;
  text-align: left;
  padding-left: 1rem;
}

.tabela-precos .unit {
  font-weight: 600;
  font-size: 1rem;
}

.tabela-precos .tabela-asterisco {
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 0.1rem;
  color: #e94b35;
}

.tabela-precos-nota {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #555;
  line-height: 1.4;
}

.price {
  font-size: 2rem;
  margin: 1.5rem 0;
}

.buy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #25d366;
  color: white;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  border-radius: 2px;
}

.whatsapp-icon {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .product-details {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-bottom: 5rem;
  }

  .gallery {
    flex-direction: column;
  }

  .thumbs {
    flex-direction: row;
    justify-content: center;
    gap: 0.4rem;
  }

  .thumbs img {
    width: 48px;
    height: 48px;
  }

  .main-image img {
    max-width: 100%;
  }


  .info h1 {
    font-size: 1.3rem;
    text-align: center;
  }

  .options {
    justify-content: center;
  }

  .price {
    text-align: center;
    font-size: 1.8rem;
  }

  .buy-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;
    z-index: 10;
  }
}

.breadcrumb-wrapper {
  grid-column: 1 / -1;
  font-size: 0.8rem;
  color: #777;
}

.semelhantes-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.semelhantes-section h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .semelhantes-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }

  .semelhantes-section h2 {
    font-size: 1.2rem;
  }
}
</style>
