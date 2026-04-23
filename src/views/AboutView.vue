<template>
  <section class="content-about">
    <h2>Sobre a Manuari</h2>

<p>
      A <strong>Manuari</strong> nasceu do sonho de um casal que acreditou que até os
      objetos mais simples podem carregar histórias, sentimentos e significado.
      Tudo começou com uma ideia despretensiosa: criar canecas personalizadas e bottons com arte exclusiva.
      No início, atendíamos pelo nome <strong>Seu Caneco Canecas Personalizadas</strong>,
      quase como uma brincadeira. Mas, a cada pedido entregue, fomos percebendo
      algo maior.
    </p>

    <p>
      Aquelas canecas não eram apenas produtos. Eram presentes, homenaje,
      lembranças e formas de dizer o que muitas vezes as palavras não conseguiam.
      E os bottons se tornaram um dos produtos mais pedidos — eventos, casamentos,
      formaturas e empresas nunca paravam de solicitar.
      Com o tempo, os pedidos aumentaram, o maquinário cresceu, a equipe se formou
      e os laços com nossos clientes se fortaleceram.
    </p>

    <p>
      Fidelizamos pessoas, conquistamos parceiros importantes e aprendemos, dia
      após dia, que não vendemos apenas canecas e bottons. Entregamos histórias, emoções
      e identidade. Foi nesse momento que a Manuari nasceu: uma marca que
      representa a nossa evolução, mas que mantém o mesmo propósito desde
      o primeiro pedido — dar significado a cada caneca, botton ou peça personalizada produzida.
    </p>

    <p>
      Cada peça é feita com cuidado e atenção aos detalhes, passando por todas as
      etapas com calma e responsabilidade, desde a escolha da estampa até a
      aprovação final antes da produção. Nosso atendimento é próximo, humano e
      sem complicação, porque acreditamos que cada cliente faz parte dessa história.
    </p>

    <p>
      Aquelas canecas não eram apenas produtos. Eram presentes, homenagens,
      lembranças e formas de dizer o que muitas vezes as palavras não conseguiam.
      Com o tempo, os pedidos aumentaram, o maquinário cresceu, a equipe se formou
      e os laços com nossos clientes se fortaleceram.
    </p>

    <p>
      Fidelizamos pessoas, conquistamos parceiros importantes e aprendemos, dia
      após dia, que não vendemos apenas canecas. Entregamos histórias, emoções
      e identidade. Foi nesse momento que a Manuari nasceu: uma marca que
      representa a nossa evolução, mas que mantém o mesmo propósito desde
      o primeiro pedido — dar significado a cada caneca produzida.
    </p>

    <p>
      Cada peça é feita com cuidado e atenção aos detalhes, passando por todas as
      etapas com calma e responsabilidade, desde a escolha da estampa até a
      aprovação final antes da produção. Nosso atendimento é próximo, humano e
      sem complicação, porque acreditamos que cada cliente faz parte dessa história.
    </p>

    <p>
      <strong>Manuari.</strong><br />
      <strong>Do seu jeito, para momentos que realmente importam.</strong><br />
      <RouterLink to="/produtos/bottons" style="color:#e94b35;text-decoration:underline">
        Veja os bottons personalizados
      </RouterLink>
    </p>
  </section>

  <h2>Leia também sobre</h2>

  <section class="content-about-cards">
    <RouterLink to="/politica-privacidade">
      <div class="card-links">Política de Privacidade</div>
    </RouterLink>

    <RouterLink to="/nossos-termos">
      <div class="card-links">Nossos Termos</div>
    </RouterLink>

    <RouterLink to="/politica-entrega">
      <div class="card-links">Política de Entrega</div>
    </RouterLink>

    <RouterLink to="/para-empresas">
      <div class="card-links">Para Empresas</div>
    </RouterLink>
  </section>
</template>



<style scoped>


.content-about {
    display: flex;
    flex-direction: column;
}

h2 {
    text-align: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid black;
}

span {
    text-align: justify;
}

.content-about-cards {
    display: flex;
    justify-content:space-around;
    flex-wrap: wrap;
    gap: 1rem;
    
}

a {
   
    text-decoration: none;
    color: red;
}

.card-links {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
}

.card-links:hover {
    color: rgb(96, 95, 95);
    transition: 0.2s;
}
</style>