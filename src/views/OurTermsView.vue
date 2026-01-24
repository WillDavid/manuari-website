<template>
  <section class="content-about">
    <h2>Nossos Termos</h2>

    <p>
      Ao realizar um pedido na <strong>Manuari</strong>, o cliente declara que leu,
      compreendeu e concorda integralmente com os termos e condições descritos abaixo.
    </p>

    <h3>1. Produtos personalizados</h3>
    <p>
      A Manuari trabalha exclusivamente com produtos personalizados, produzidos sob
      encomenda de acordo com as especificações informadas pelo cliente. Cada pedido
      é único e fabricado somente após a confirmação do pagamento e da aprovação do
      modelo final.
    </p>

    <h3>2. Pagamento e aprovação do modelo</h3>
    <p>
      A produção do pedido só é iniciada após a confirmação do pagamento.
      Antes da produção, o cliente recebe um modelo digital para aprovação.
    </p>

    <p>
      Após a aprovação do modelo final, não será possível realizar alterações na arte,
      texto, cores ou layout.
    </p>

    <p>
      A Manuari não se responsabiliza por erros de ortografia, informações incorretas
      ou escolhas aprovadas pelo cliente no modelo final.
    </p>

    <h3>3. Direitos autorais e uso de imagens</h3>
    <p>
      Ao enviar imagens, textos, logotipos, personagens, marcas ou qualquer outro
      material para personalização, o cliente declara ser detentor dos direitos de
      uso ou possuir autorização legal para utilizá-los.
    </p>

    <p>
      A Manuari não se responsabiliza por violações de direitos autorais, marcas
      registradas ou propriedade intelectual relacionadas ao conteúdo fornecido
      pelo cliente. Toda e qualquer responsabilidade pelo uso indevido de material
      protegido é exclusivamente do cliente.
    </p>

    <p>
      A Manuari se reserva o direito de recusar pedidos que envolvam conteúdos ilícitos,
      ofensivos, discriminatórios ou que violem direitos autorais de forma evidente.
    </p>

    <h3>4. Variações de cor e acabamento</h3>
    <p>
      Pequenas variações de cor podem ocorrer em razão do processo de sublimação,
      do material utilizado e das configurações de tela dos dispositivos.
      Essas variações não caracterizam defeito de fabricação.
    </p>

    <h3>5. Limitação de responsabilidade</h3>
    <p>
      A responsabilidade da Manuari limita-se à entrega do produto conforme o modelo
      aprovado pelo cliente. A Manuari não se responsabiliza por danos causados após
      a entrega, uso inadequado do produto ou expectativas diferentes daquelas
      aprovadas no modelo final.
    </p>

    <h3>6. Disposições finais</h3>
    <p>
      Ao concluir um pedido, o cliente concorda com todos os termos aqui descritos
      e assume total responsabilidade pelas informações e materiais fornecidos
      para a personalização.
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

    <RouterLink to="/politica-privacidade">
      <div class="card-links">Política de Privacidade</div>
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