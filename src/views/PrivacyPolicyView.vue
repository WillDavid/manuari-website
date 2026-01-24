<template>
  <section class="content-about">
    <h2>Política de Privacidade</h2>

    <p>
      A <strong>Manuari</strong> respeita a privacidade de seus clientes e se compromete
      a proteger os dados pessoais coletados durante o atendimento, a produção dos
      pedidos e a entrega dos produtos, em conformidade com a
      <strong>Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>.
    </p>

    <p>
      Ao utilizar nossos serviços, o cliente concorda com as práticas descritas
      nesta Política de Privacidade.
    </p>

    <h3>1. Coleta de dados pessoais</h3>
    <p>
      A Manuari coleta apenas os dados estritamente necessários para a realização
      de seus serviços, podendo incluir:
    </p>

    <ul>
      <li>Nome</li>
      <li>Telefone</li>
      <li>Endereço</li>
      <li>Informações relacionadas ao pedido</li>
      <li>Artes, imagens ou textos enviados para personalização</li>
    </ul>

    <p>
      Esses dados são fornecidos diretamente pelo cliente durante o atendimento.
    </p>

    <h3>2. Finalidade do uso dos dados</h3>
    <p>Os dados coletados são utilizados exclusivamente para:</p>

    <ul>
      <li>Atendimento ao cliente</li>
      <li>Produção e personalização dos produtos</li>
      <li>Comunicação sobre o pedido</li>
      <li>Organização da entrega</li>
    </ul>

    <p>
      A Manuari não utiliza os dados para fins diferentes daqueles informados
      nesta política.
    </p>

    <h3>3. Compartilhamento de dados</h3>
    <p>
      A Manuari não vende, aluga ou compartilha dados pessoais com terceiros,
      exceto quando necessário para a execução do serviço, como:
    </p>

    <ul>
      <li>Informações de endereço para serviços de transporte e entrega</li>
    </ul>

    <p>
      Nesses casos, o compartilhamento ocorre apenas com o objetivo de viabilizar
      a entrega do pedido.
    </p>

    <h3>4. Armazenamento e segurança</h3>
    <p>
      Os dados pessoais são armazenados de forma segura e acessados apenas por
      pessoas autorizadas, sendo utilizados pelo tempo necessário para a execução
      do serviço ou cumprimento de obrigações legais.
    </p>

    <p>
      A Manuari adota medidas razoáveis de segurança para proteger os dados contra
      acessos não autorizados, perda ou uso indevido.
    </p>

    <h3>5. Direitos do titular dos dados</h3>
    <p>O cliente pode, a qualquer momento:</p>

    <ul>
      <li>Solicitar acesso aos seus dados</li>
      <li>Solicitar correção ou atualização</li>
      <li>Solicitar a exclusão dos dados, quando aplicável</li>
    </ul>

    <p>
      As solicitações podem ser feitas por meio dos canais oficiais de atendimento
      da Manuari.
    </p>

    <h3>6. Conteúdos enviados para personalização</h3>
    <p>
      As imagens, textos e artes enviadas pelo cliente são utilizadas
      exclusivamente para a produção do pedido e não são divulgadas publicamente
      sem autorização prévia do cliente.
    </p>

    <h3>7. Alterações nesta política</h3>
    <p>
      A Manuari se reserva o direito de atualizar esta Política de Privacidade
      sempre que necessário, visando melhorias ou adequações legais. A versão mais
      atual estará sempre disponível em nosso site.
    </p>

    <h3>8. Considerações finais</h3>
    <p>
      Ao utilizar os serviços da Manuari, o cliente declara estar ciente e de
      acordo com esta Política de Privacidade.
    </p>

    <p class="legal-update">
      Última atualização: 10 de janeiro de 2026, 15:30
    </p>
  </section>

  <h2>Leia também sobre</h2>

  <section class="content-about-cards">
    <RouterLink to="/sobre">
      <div class="card-links">Sobre a Manuari</div>
    </RouterLink>

    <RouterLink to="/nossos-termos">
      <div class="card-links">Nossos Termos</div>
    </RouterLink>

    <RouterLink to="/politica-entrega">
      <div class="card-links">Política de Entrega</div>
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