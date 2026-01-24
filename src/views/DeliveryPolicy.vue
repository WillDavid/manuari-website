<template>
  <section class="content-about">
    <h2>Política de Entrega</h2>

    <p>
      A <strong>Manuari</strong> realiza entregas exclusivamente em Manaus e região,
      por meio de serviços de transporte terceirizados, como <strong>Uber Flash</strong>,
      <strong>99</strong> ou plataformas similares.
    </p>

    <h3>1. Responsabilidade pelo frete</h3>
    <p>
      O custo do frete é integralmente de responsabilidade do cliente.
      Antes da confirmação do pedido, o cliente pode solicitar à Manuari
      uma estimativa de valor do frete, baseada nos preços praticados no
      momento da consulta.
    </p>

    <p>
      Ressaltamos que essa estimativa:
    </p>

    <ul>
      <li>Não possui valor fixo;</li>
      <li>Pode sofrer variações de acordo com horário, dia, condições climáticas,
          demanda e disponibilidade do serviço de transporte.</li>
    </ul>

    <p>
      O valor final cobrado pelo aplicativo poderá ser diferente da estimativa
      informada previamente.
    </p>

    <h3>2. Forma de solicitação da entrega</h3>
    <p>
      A entrega poderá ser realizada de duas formas:
    </p>

    <ul>
      <li>
        Solicitada diretamente pelo cliente junto ao aplicativo de transporte
        (opção recomendada);
      </li>
      <li>
        Solicitada pela Manuari, mediante autorização expressa do cliente.
      </li>
    </ul>

    <p>
      Mesmo quando a entrega for solicitada pela Manuari, o serviço é prestado
      por empresa terceirizada, não havendo vínculo direto entre a Manuari
      e o transportador.
    </p>

    <h3>3. Responsabilidade pelo recebimento</h3>
    <p>
      É de responsabilidade do cliente:
    </p>

    <ul>
      <li>Informar corretamente o endereço de entrega;</li>
      <li>Garantir que haja alguém disponível para receber o pedido no local informado;</li>
      <li>Acompanhar a entrega quando esta for solicitada pela própria Manuari.</li>
    </ul>

    <p>
      A Manuari não se responsabiliza por tentativas de entrega não concluídas
      em razão de ausência do cliente, endereço incorreto ou impossibilidade
      de contato no momento da entrega.
    </p>

    <h3>4. Devolução automática pelo aplicativo</h3>
    <p>
      Caso a entrega seja solicitada pela Manuari conforme orientação do cliente
      e o cliente não esteja disponível para o recebimento, os aplicativos de
      transporte poderão realizar a devolução automática do pedido ao ponto de origem.
    </p>

    <p>
      Nesses casos:
    </p>

    <ul>
      <li>Poderá ser cobrada uma taxa adicional de retorno pelo aplicativo;</li>
      <li>O custo dessa taxa será de responsabilidade do cliente;</li>
      <li>
        Para uma nova tentativa de entrega, será necessário o pagamento integral
        de um novo frete pelo cliente.
      </li>
    </ul>

    <p>
      A Manuari não se responsabiliza por custos adicionais decorrentes dessas situações.
    </p>

    <h3>5. Situações excepcionais</h3>
    <p>
      O prazo e a realização da entrega podem sofrer alterações em casos de:
    </p>

    <ul>
      <li>Condições climáticas adversas;</li>
      <li>Problemas operacionais dos aplicativos de transporte;</li>
      <li>Restrições de acesso ao endereço informado.</li>
    </ul>

    <p>
      Sempre que possível, o cliente será informado.
    </p>

    <p>
      Ao realizar um pedido na Manuari, o cliente declara estar ciente
      e de acordo com esta Política de Entrega.
    </p>

    <p class="legal-update">
      Última atualização: 10 de janeiro de 2026
    </p>
  </section>

  <h2>Leia também sobre</h2>

  <section class="content-about-cards">
    <RouterLink to="/sobre">
      <div class="card-links">Sobre a Manuari</div>
    </RouterLink>
    
    <RouterLink to="/politica-privacidade">
      <div class="card-links">Política de Privacidade</div>
    </RouterLink>

    <RouterLink to="/nossos-termos">
      <div class="card-links">Nossos Termos</div>
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


