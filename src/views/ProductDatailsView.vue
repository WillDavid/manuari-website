<script>
import { fetchProductById } from '../services/supabaseApi'
import Breadcrumb from '../components/Breadcrumb.vue'
import Specifications from '../components/Specifications.vue';

const VARIACOES_POR_TIPO = {
  canecas: [
    { label: 'Total Branca', price: 34.9 },
    { label: 'Alça e Interior Preto', price: 46.9 },
    { label: 'Alça e Interior Rosa', price: 46.9 },
    { label: 'Alça e Interior Vermelho', price: 46.9 },
    { label: 'Alça e Interior Amarelo', price: 46.9 },
    { label: 'Alça e Interior Lilás', price: 46.9 },
    { label: 'Alça e Interior Azul', price: 46.9 }
  ],

  xicaras: [
    { label: 'Com Pires', price: 46.9 },
    { label: 'Sem Pires', price: 42.9 }
  ],

  azulejos: [
    { label: '15x15', price: 29.9 },
    { label: '20x20', price: 34.9 }
  ],

  canecas3d: [
    { label: 'Cerâmica', price: 69.90},
  ],

}

export default {
  name: 'ProductDetailsView',
  components: { Breadcrumb, Specifications },

  data() {
    return {
      produto: null,
      loading: true,

      imagemAtiva: null,

      variacaoSelecionada: null,
      precoFinal: null,
      precoArte: null
    }
  },

  computed: {
    variacoesDisponiveis() {
      if (!this.produto) return []
      return VARIACOES_POR_TIPO[this.produto.tipo] || []
    },

    mensagemWhats() {
      if (!this.produto || !this.precoFinal) return ''

      if (this.produto.tipo === 'artes') {
        return `Olá! Quero a arte "${this.produto.name}" no valor de R$ ${this.precoFinal.toFixed(2)}`
      }

      return `Olá! Quero o produto "${this.produto.name}"
Opção: ${this.variacaoSelecionada.label}
Valor: R$ ${this.precoFinal.toFixed(2)}`
    },

    linkWhats() {
      return `https://wa.me/5592991802094?text=${encodeURIComponent(this.mensagemWhats)}`
    },

    tipoProduto() {
    return this.produto?.tipo || null
  }
  },

  watch: {
    precoArte(val) {
      this.precoFinal = val ? Number(val) : null
    }
  },

  async mounted() {
    try {
      const id = this.$route.params.id
      const data = await fetchProductById(id)

      this.produto = data
      this.imagemAtiva = data.images?.[0] || null

      // ✅ SELECIONA AUTOMATICAMENTE A PRIMEIRA VARIAÇÃO
      const variacoes = VARIACOES_POR_TIPO[data.tipo]
      if (variacoes && variacoes.length) {
        this.variacaoSelecionada = variacoes[0]
        this.precoFinal = variacoes[0].price
      }

    } catch (err) {
      console.error('Erro ao carregar produto', err)
    } finally {
      this.loading = false
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

    <!-- GALERIA -->
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

    <!-- INFORMAÇÕES -->
    <div class="info">

      <h1>{{ produto.name }}</h1>

      <!-- VARIAÇÕES -->
      <div v-if="variacoesDisponiveis.length">
        <h4>Escolha uma opção:</h4>

        <div class="options">
          <button
            v-for="v in variacoesDisponiveis"
            :key="v.label"
            :class="{ selected: variacaoSelecionada?.label === v.label }"
            @click="variacaoSelecionada = v; precoFinal = v.price"
          >
            {{ v.label }}
          </button>
        </div>
      </div>

      <!-- PREÇO -->
      <div v-if="precoFinal" class="price">
        R$ {{ precoFinal.toFixed(2) }}
      </div>

      <!-- CTA -->
      <a
        v-if="precoFinal"
        :href="linkWhats"
        target="_blank"
        class="buy-btn"
      >
        Pedir no WhatsApp
      </a>
    </div>
  </section>

  <div v-else class="loading">
    Carregando produto...
  </div>

  <Specifications v-if="tipoProduto" :tipo="tipoProduto" />
</template>



<style scoped>

    .product-details {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  padding: 2rem 0;
}

/* GALERIA */
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

/* INFO */
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

.input-price input {
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
}

.price {
  font-size: 2rem;
  margin: 1.5rem 0;
}

.buy-btn {
  display: block;
  padding: 1rem;
  background: #25d366;
  color: white;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  border-radius: 2px;
}

/* 📱 MOBILE */
@media (max-width: 768px) {
  .product-details {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-bottom: 5rem; /* espaço pro botão fixo */
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

/* Breadcrumb acima da galeria */
.breadcrumb-wrapper {
  grid-column: 1 / -1; /* ocupa toda a largura do grid */
  font-size: 0.8rem;
  color: #777;
}



</style>