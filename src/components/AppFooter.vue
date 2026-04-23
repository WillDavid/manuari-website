<template>
  <footer class="footer">
    <div class="footer-top">

      <!-- COLUNA 1 — PRODUTOS -->
      <div class="footer-col">
        <h3>Produtos</h3>
        <ul>
          <li><RouterLink to="/produtos/canecas">Canecas Personalizadas</RouterLink></li>
          <li><RouterLink to="/produtos/bottons">Botton Personalizado</RouterLink></li>
          <li><RouterLink to="/produtos/xicaras">Xícaras</RouterLink></li>
          <li><RouterLink to="/produtos/azulejos">Azulejos</RouterLink></li>
          <li><RouterLink to="/para-empresas">Para Empresas</RouterLink></li>
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
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@manuari.loja" target="_blank" aria-label="TikTok">
            <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"/></svg>
          </a>
          <a :href="`https://wa.me/${whatsappPhone}`" target="_blank" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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

<script>
import { WHATSAPP } from '../constants/config'

export default {
  data() {
    return {
      whatsappPhone: WHATSAPP.phone
    }
  }
}
</script>


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

.social-icons a svg {
  width: 20px;
  height: 20px;
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
