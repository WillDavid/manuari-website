<template>
  <footer class="footer">
    <div class="footer-top">

      <!-- COLUNA 1 — PRODUTOS -->
      <div class="footer-col">
        <h3>Produtos</h3>
        <ul>
          <li><RouterLink to="/produtos/canecas">Canecas</RouterLink></li>
          <li><RouterLink to="/produtos/xicaras">Xícaras</RouterLink></li>
          <li><RouterLink to="/produtos/azulejos">Azulejos</RouterLink></li>
          <li><RouterLink to="/produtos/artes">Artes</RouterLink></li>
          <li><RouterLink to="/produtos/mdf">Placas de MDF</RouterLink></li>
        </ul>
      </div>

      <!-- COLUNA 2 — INFORMAÇÕES -->
      <div class="footer-col">
        <h3>Informações</h3>
        <ul>
          <li><RouterLink to="/sobre">Sobre a Manuari</RouterLink></li>
          <li><RouterLink to="/politica-privacidade">Política de Privacidade</RouterLink></li>
           <li><RouterLink to="/politica-entrega">Política de Entrega</RouterLink></li>
          <li><RouterLink to="/nossos-termos">Nossos Termos</RouterLink></li>
        </ul>
      </div>

      <!-- COLUNA 3 — ATENDIMENTO -->
      <div class="footer-col">
        <h3>Atendimento</h3>

        <p class="footer-info">
          WhatsApp: <br />
          <span>(92) 99180-2094</span>
        </p>

        <p class="footer-info">
          Email: <br />
          <span>manuari.loja@gmail.com</span>
        </p>

        <p class="footer-info">
          Seg à Sáb <br />
          <span>9:00h às 18:00</span>
        </p>

        <strong class="no-store">Não temos loja física</strong>
      </div>

      <!-- COLUNA 4 — SOCIAL -->
      <div class="footer-col">
        <h3>Social</h3>

        <div class="social-icons">
          <a href="https://instagram.com/manuari.loja" target="_blank" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@manuari.loja" target="_blank" aria-label="TikTok">
            <i class="fab fa-tiktok"></i>
          </a>
          <a href="https://wa.me/5592991802094" target="_blank" aria-label="WhatsApp">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

    </div>

    <!-- BOTTOM -->
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} Manuari · CNPJ 61.175.754/0001-77 · Manaus – AM
    </div>
  </footer>
</template>


<style scoped>

.footer {
  background: #111;
  color: #eaeaea;
  margin-top: 4rem;
  font-size: 0.9rem;
}

/* TOP */
.footer-top {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2.5rem;
}

.footer-col h3 {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 0.5rem;
}

.footer-col a {
  color: #bbb;
  text-decoration: none;
}

.footer-col a:hover {
  color: #e94b35;
}

/* Atendimento */
.footer-info {
  margin-bottom: 0.75rem;
  color: #bbb;
  line-height: 1.4;
}

.footer-info span {
  color: #eee;
}

.no-store {
  display: block;
  margin-top: 1rem;
  color: #fff;
}

/* Social */
.social-icons {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.social-icons a {
  width: 42px;
  height: 42px;
  border: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.social-icons a:hover {
  background: #c9c7c7;
  border-color: #e94b35;
}

/* BOTTOM */
.footer-bottom {
  border-top: 1px solid #222;
  text-align: center;
  padding: 1rem;
  color: #999;
  font-size: 0.8rem;
}

/* MOBILE */
@media (max-width: 768px) {
  .footer-top {
    padding: 2rem 1rem;
  }
}


</style>
