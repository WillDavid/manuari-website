<script>
import canecaColorida from '../assets/caneca-colorida-exemplo.png'

const SPEC_BY_TYPE = {
  canecas: {
  descricao: 'Caneca de cerâmica 11oz personalizada com estampa exclusiva, ideal para uso diário ou para presentear.',
  caracteristicas: [
    ['Material', 'Cerâmica'],
    ['Capacidade', '325 ml (11 oz)'],
    ['Peso', '350 g'],
    ['Altura', '9,5 cm'],
    ['Diâmetro', '8,0 cm'],
    ['Largura c/ alça', '12 cm'],
    ['Embalagem', 'Caixa branca individual']
  ],
  duvidas: [
    ['Posso usar palha de aço?', 'Não. Use apenas esponja macia.'],
    ['Pode ir ao micro-ondas?', 'Sim. Produto próprio para micro-ondas.'],
    ['Pode ir na lava-louças?', 'Pode, mas lavar à mão aumenta a durabilidade.']
  ],

  extras: {
  titulo: 'Canecas com alça e interior coloridos',
  texto: `
As canecas com alça e interior coloridos possuem acabamento especial,
pensado para quem busca um visual diferenciado sem perder a elegância da estampa.

A parte externa permanece branca para valorizar a arte impressa,
enquanto a alça e o interior recebem cor sólida, criando um detalhe
visual marcante e moderno.
`,
  observacao: `
Esse modelo passa por um processo adicional de fabricação e pintura,
o que garante maior qualidade no acabamento. Por isso, o valor é
diferente da caneca totalmente branca.
`,
  imagem: canecaColorida
}
},


  xicaras: {
    descricao: 'Xícara de cerâmica personalizada, ideal para café e bebidas quentes.',
    caracteristicas: [
      ['Material', 'Cerâmica'],
      ['Capacidade', '180 ml'],
      ['Acompanha pires', 'Sim'],
      ['Peso', '300 g'],
      ['Embalagem', 'Caixa branca individual']
    ],
    duvidas: [
      ['Pode ir ao micro-ondas?', 'Sim.'],
      ['Pode ir na lava-louças?', 'Sim, com cuidado.']
    ]
  },

  azulejos: {
    descricao: 'Azulejo decorativo personalizado, ideal para decoração de ambientes.',
    caracteristicas: [
      ['Material', 'Cerâmica'],
      ['Tamanhos', '15x15 cm ou 20x20 cm'],
      ['Uso', 'Decorativo'],
      ['Acompanha suporte', 'Sim'],
      ['Embalagem', 'Caixa protetora']
    ],
    duvidas: [
      ['Pode molhar?', 'Sim.'],
      ['Pode usar produtos abrasivos?', 'Não.'],
      ['É resistente ao calor?', 'Sim, uso decorativo.']
    ]
  },

  canecas3d: {
    descricao: 'Caneca 3D em cerâmica com relevo, ideal para colecionadores.',
    caracteristicas: [
      ['Material', 'Cerâmica'],
      ['Capacidade', '350 ml'],
      ['Acabamento', 'Relevo 3D'],
      ['Uso', 'Decorativo e funcional'],
      ['Embalagem', 'Caixa reforçada']
    ],
    duvidas: [
      ['Pode ir ao micro-ondas?', 'Não recomendado.'],
      ['Pode ir na lava-louças?', 'Não. Lavar à mão.']
    ]
  },

bottons: {
    descricao: 'Botton personalizado com sua arte, logo ou foto. Alta qualidade e acabamento profissional.',
    caracteristicas: [
      ['Material', 'Plástico resistente'],
      ['Tamanhos', '33mm - 44mm - 58mm'],
      ['Fixação', 'Alfinete metálico'],
      ['Impressão', 'Cores vibrantes']
    ],
    duvidas: [
      ['Resistente à água?', 'Sim, proteção contra respingos.'],
      ['Qual o tamanho ideal?', '33mm para finesse, 44mm padrão, 58mm para destaque.'],
      ['Tempo de produção?', '1 a 3 dias úteis.'],
      ['Posso enviar minha arte?', 'Sim! Envie sua logo, foto ou arte.'],
      ['Serve para evento corporativo?', 'Sim! Ideal para feiras, eventos e ações de RH.']
    ]
  }
}

export default {
  name: 'Specifications',
  props: {
    tipo: {
      type: String,
      required: true
    }
  },
  computed: {
    spec() {
      return SPEC_BY_TYPE[this.tipo] || null
    }
  }
}
</script>


<template>
  <div v-if="spec" class="spec-content">

    <div class="column">
      <h3>Descrição</h3>
      <p>{{ spec.descricao }}</p>
    </div>

    <div class="column divider">
      <h3>Características</h3>
      <ul>
        <li v-for="(item, i) in spec.caracteristicas" :key="i">
          <strong>{{ item[0] }}:</strong> {{ item[1] }}
        </li>
      </ul>
    </div>

    <div class="column divider">
      <h3>Dúvidas</h3>
      <div class="faq">
        <div v-for="(d, i) in spec.duvidas" :key="i">
          <h4>{{ d[0] }}</h4>
          <p>{{ d[1] }}</p>
        </div>
      </div>
    </div>

  </div>

  

</template>


<style scoped>
.spec-content {
  margin: 1.5rem 0;
  padding: 1rem 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

/* Colunas */
.column {
  font-size: 0.85rem;
  line-height: 1.45;
  color: #555;
}

/* Divisória vertical */
.divider {
  padding-left: 1.5rem;
  border-left: 1px solid #eee;
}

/* Títulos */
.column h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #222;
}

/* Texto */
.column p {
  font-size: 0.9rem;
}

/* Lista */
.column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.column li {
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

/* FAQ */
.faq h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0.45rem 0 0.15rem;
  color: #333;
}

.faq p {
  font-size: 0.8rem;
  margin: 0 0 0.3rem;
  color: #666;
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .spec-content {
    grid-template-columns: 1fr;
  }

  .divider {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid #eee;
    padding-top: 1rem;
  }
}

.spec-extra {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;

  display: grid;
  grid-template-columns: 1fr 360px; /* imagem fixa à direita */
  gap: 2rem;

  align-items: flex-start;
}

.extra-text {
  padding-right: 1rem;
}

.extra-text h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.extra-text p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.extra-text small {
  font-size: 0.8rem;
  color: #777;
}

.extra-image {
  display: flex;
  justify-content: flex-end; /* empurra a imagem pra direita */
}

.extra-image img {
  width: 100%;
  max-width: 360px; /* igual à coluna */
  object-fit: contain;
}


/* MOBILE */
@media (max-width: 768px) {
  .spec-extra {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .extra-image img {
    margin: 0 auto;
  }
}

</style>
