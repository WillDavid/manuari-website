<template>
  <section class="lp-b2b">

    <!-- HERO -->
    <div class="hero">
      <div class="hero-text">
        <h1>
          Brindes corporativos<br />
          personalizados para empresas
        </h1>

        <p class="hero-sub">
          Canecas, xícaras, azulejos e projetos sob medida para ações
          corporativas, eventos e endomarketing.
        </p>

        <p class="hero-desc">
          A Manuari desenvolve brindes corporativos personalizados que fortalecem
          a marca da sua empresa e criam conexão real com quem recebe.
          Produção organizada, personalização de verdade e entrega confiável.
        </p>

        <a href="https://wa.me/5592991802094?text=Olá!%20Gostaria%20de%20um%20orçamento%20para%20brindes%20corporativos." target="_blank" class="hero-cta">
        Solicitar orçamento
        </a>

      </div>

      <div class="hero-image">
        <img src="https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/b2b-1.png" alt="Brindes corporativos personalizados para empresas" />
      </div>
    </div>

    <!-- O QUE PERSONALIZAMOS -->
    <section class="produtos">
      <h2>O que personalizamos</h2>

      <div class="produtos-lista">
        <article class="produto">
          <h3>Canecas personalizadas</h3>
          <p>
            O brinde corporativo mais lembrado no dia a dia. Ideal para ações
            internas, eventos e campanhas de marca.
          </p>
        </article>

        <article class="produto">
          <h3>Xícaras corporativas</h3>
          <p>
            Perfeitas para kits executivos, ações premium e datas comemorativas.
          </p>
        </article>

        <article class="produto">
          <h3>Azulejos personalizados</h3>
          <p>
            Ideais para homenagens, campanhas internas e reconhecimento de
            colaboradores.
          </p>
        </article>

        <article class="produto destaque">
          <h3>Projetos sob medida</h3>
          <p>
            Criamos soluções exclusivas de acordo com o objetivo da sua empresa.
          </p>
        </article>
      </div>
    </section>

    <!-- VALOR -->
    <section class="valor">
      <div class="valor-image">
        <img src="https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/b2b-2.png" alt="Brindes corporativos para empresas" />
      </div>

      <div class="valor-text">
        <h2>Por que empresas escolhem a Manuari</h2>

        <ul>
          <li>Brindes úteis, com alto valor percebido</li>
          <li>Personalização alinhada à identidade da sua marca</li>
          <li>Soluções ideais para RH, marketing e eventos corporativos</li>
          <li>Produção organizada, com padrão e prazo</li>
          <li>Atendimento direto, humano e sem burocracia</li>
        </ul>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="processo">
      <h2>Como funciona</h2>

      <div class="passos">
        <div class="passo">
          <span>01</span>
          <p>Entendemos sua necessidade e objetivo</p>
        </div>

        <div class="passo">
          <span>02</span>
          <p>Definimos produto, quantidade, arte e prazo</p>
        </div>

        <div class="passo">
          <span>03</span>
          <p>Você recebe uma proposta personalizada</p>
        </div>

        <div class="passo">
          <span>04</span>
          <p>Produção e entrega conforme combinado</p>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-final">
      <h2>Fale com um especialista em brindes corporativos</h2>
      <p>
        Receba uma proposta sob medida para a sua empresa, sem compromisso.
      </p>

      <a
  href="https://wa.me/5592991802094?text=Olá!%20Quero%20uma%20proposta%20personalizada%20de%20brindes%20corporativos."
  target="_blank"
  class="cta-botao"
>
  Solicitar orçamento agora
</a>

    </section>

  </section>
</template>

<style scoped>
.lp-b2b {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

/* HERO */
.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 5rem;
}

.hero-text h1 {
  font-size: 2.6rem;
  line-height: 1.2;
}

.hero-sub {
  font-size: 1.2rem;
  margin: 1.5rem 0;
}

.hero-desc {
  color: #444;
  max-width: 520px;
}

.hero-cta {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background: #ff4425;
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
}

.hero-image img {
  width: 100%;
  border-radius: 20px;
}

/* PRODUTOS */
.produtos h2 {
  margin-bottom: 2rem;
}

.produtos-lista {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.produto {
  padding: 1.5rem;
  border-radius: 16px;
  background: #f7f7f7;
}

.produto.destaque {
  background: #ff4425;
  color: #fff;
}

/* VALOR */
.valor {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 3rem;
  align-items: center;
  margin: 6rem 0;
}

.valor-image img {
  width: 100%;
  border-radius: 20px;
}

.valor-text ul {
  margin-top: 1.5rem;
}

.valor-text li {
  margin-bottom: .8rem;
}

/* PROCESSO */
.processo h2 {
  margin-bottom: 2rem;
}

.passos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.passo {
  padding: 1.5rem;
  border-radius: 16px;
  background: #f2f2f2;
}

.passo span {
  font-weight: bold;
  font-size: 1.2rem;
}

/* CTA FINAL */
.cta-final {
  margin-top: 6rem;
  padding: 4rem 2rem;
  background: #ff4425;
  color: #fff;
  border-radius: 24px;
  text-align: left;
}

.cta-botao {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 1rem 2.5rem;
  background: #fff;
  color: #000;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}
/* ========================= */
/* RESPONSIVIDADE REVISADA */
/* ========================= */

@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-text {
    order: 1;
  }

  .hero-image {
    order: 2;
  }

  .valor {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .valor-image {
    order: 1;
  }

  .valor-text {
    order: 2;
  }

  .cta-final {
    text-align: center;
  }
}

@media (max-width: 768px) {
  .lp-b2b {
    padding: 2rem 1rem;
  }

  /* HERO */
  .hero {
    margin-bottom: 3.5rem;
  }

  .hero-text h1 {
    font-size: 2.1rem;
  }

  .hero-sub {
    font-size: 1.05rem;
  }

  .hero-desc {
    max-width: 100%;
  }

  .hero-cta {
    margin-top: 1.5rem;
  }

  /* PRODUTOS */
  .produtos-lista {
    grid-template-columns: repeat(2, 1fr);
  }

  /* VALOR */
  .valor {
    margin: 4rem 0;
  }

  .valor-text ul {
    padding-left: 1rem;
  }

  /* PROCESSO */
  .passos {
    grid-template-columns: repeat(2, 1fr);
  }

  /* CTA */
  .cta-final {
    padding: 3rem 1.5rem;
  }
}

@media (max-width: 520px) {
  /* HERO */
  .hero-text h1 {
    font-size: 1.75rem;
    line-height: 1.25;
  }

  .hero-sub {
    font-size: 1rem;
  }

  /* PRODUTOS */
  .produtos-lista {
    grid-template-columns: 1fr;
  }

  .produto {
    padding: 1.25rem;
  }

  /* PROCESSO */
  .passos {
    grid-template-columns: 1fr;
  }

  /* CTA */
  .hero-cta,
  .cta-botao {
    /* width: 100%; */
    text-align: center;
    padding: 1rem;
  }

  .cta-final h2 {
    font-size: 1.6rem;
  }
}



</style>