<script>
import { fetchProductById, incrementarAcessos } from '../services/supabaseApi'
import { PRODUCT_TYPES, WHATSAPP } from '../constants/config'
import Breadcrumb from '../components/Breadcrumb.vue'
import Specifications from '../components/Specifications.vue'

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
      precoArte: null,
      whatsappPhone: WHATSAPP.phone
    }
  },

  computed: {
    variacoesDisponiveis() {
      if (!this.produto) return []
      const config = PRODUCT_TYPES[this.produto.tipo]
      return config?.variations || []
    },

    mensagemWhats() {
      if (!this.produto || !this.precoFinal) return ''

      return `Olá! Quero o produto "${this.produto.name}"
Opção: ${this.variacaoSelecionada.label}
Valor: R$ ${this.precoFinal.toFixed(2)}`
    },

    linkWhats() {
      return `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(this.mensagemWhats)}`
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
      incrementarAcessos(id)
      const data = await fetchProductById(id)
      this.produto = data
      this.imagemAtiva = data.images?.[0] || null

      const config = PRODUCT_TYPES[data.tipo]
      if (config?.variations?.length) {
        this.variacaoSelecionada = config.variations[0]
        this.precoFinal = config.variations[0].price
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

      <div v-if="precoFinal" class="price">
        R$ {{ precoFinal.toFixed(2) }}
      </div>

      <a
        v-if="precoFinal"
        :href="linkWhats"
        target="_blank"
        class="buy-btn"
      >
        <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
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
</style>