<script>
import { fetchProductById, fetchProductsByType, incrementarAcessos } from '../services/supabaseApi'
import { WHATSAPP } from '../constants/config'
import { usePreferencias } from '../composables/usePreferencias'
import Breadcrumb from '../components/Breadcrumb.vue'
import Specifications from '../components/Specifications.vue'
import ProductCarousel from '../components/ProductCarousel.vue'

export default {
  name: 'ProductDetailsView',
  components: { Breadcrumb, Specifications, ProductCarousel },

  setup() {
    const { adicionarVisualizacao } = usePreferencias()
    return { adicionarVisualizacao }
  },

  data() {
    return {
      produto: null,
      loading: true,
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

    faixasPrecoComTotal() {
      return this.faixasPreco.map((faixa) => ({
        ...faixa,
        valorTotal: faixa.quantidadeMinima && faixa.preco != null
          ? faixa.quantidadeMinima * faixa.preco
          : null
      }))
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
      return this.ehBottonSobDemanda && this.faixasPreco.length > 0
    },

    mostrarPreco() {
      return Boolean(this.precoExibicao)
    },

    textoBotao() {
      return this.temTabelaPreco || this.ehBottonKitOuIndividual ? 'Fazer Orçamento' : 'Pedir no WhatsApp'
    }
  },

  async mounted() {
    try {
      const id = this.$route.params.id
      try {
        incrementarAcessos(id)
      } catch (e) {}
      
      const data = await fetchProductById(id)
      
      if (!data) {
        this.loading = false
        return
      }
      
      this.produto = data
      this.imagemAtiva = data.images?.[0] || null
      this.variacaoIdSelecionada = data.variacoes?.[0]?.id || null

      this.adicionarVisualizacao(data)

      const tipo = data?.tipo

      await this.carregarSemelhantes(tipo, data?.categorias, id)

    } catch (err) {
      console.error('Erro ao carregar produto', err)
    } finally {
      this.loading = false
    }
  },

  methods: {
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
          :src="img"
          :class="{ active: imagemAtiva === img }"
          @click="imagemAtiva = img"
        />
      </div>

      <div class="main-image">
        <img :src="imagemAtiva" :alt="produto.name" />
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

      <div v-if="temTabelaPreco" class="tabela-bottons">
        <table class="tabela-precos">
          <thead>
            <tr>
              <th>Quantidade</th>
              <th>Preço unitário</th>
              <th>Valor total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="faixa in faixasPrecoComTotal"
              :key="faixa.id"
              :class="{ destaque: faixa.destaque }"
            >
              <td class="qty">
                {{ faixa.quantidadeLabel || `${faixa.quantidadeMinima}+` }}
              </td>
              <td class="unit">
                R$ {{ faixa.preco.toFixed(2) }}
              </td>
              <td class="total">
                <template v-if="faixa.valorTotal != null">
                  R$ {{ faixa.valorTotal.toFixed(2) }}
                </template>
              </td>
              <td class="check">
                <span v-if="faixa.destaque" class="mais-vendido">mais vendido</span>
              </td>
            </tr>
          </tbody>
        </table>
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

.tabela-precos tr.destaque {
  background: #fff3cd;
}

.tabela-precos tr.destaque td {
  font-weight: 700;
}

.tabela-precos .qty {
  font-weight: 600;
}

.tabela-precos .unit {
  font-size: 1.1rem;
  font-weight: 500;
}

.tabela-precos .total {
  font-size: 1rem;
  font-weight: 600;
}

.tabela-precos .mais-vendido {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #e94b35;
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
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
