<template>
  <div v-if="visible" class="modal-overlay">

    <div class="modal-box">

      <!-- botão fechar -->
      <button class="close-btn" @click="continuar">
        ✕
      </button>

      <!-- logo -->
      <img
        src="../assets/manuari-logotipo-300dpi.png"
        alt="Manuari"
        class="logo"
      />

      <h2 class="modal-title">
        Que tal uma caneca única?
      </h2>

      <p class="modal-text">
        Um atendente pode <strong>personalizar do zero</strong> para você!
      </p>

      <div class="buttons">

        <a
          class="btn-whatsapp"
          :href="whatsappLink"
          target="_blank"
          @click="setCookie"
        >
          <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar com um atendente
        </a>

        <button class="btn-site" @click="continuar">
          Continuar Navegando
        </button>

      </div>

    </div>

  </div>
</template>

<script>
import { WHATSAPP } from '../constants/config'

export default {

  name: "ModalOrcamento",

  data(){
    return{
      visible: false,
      whatsappPhone: WHATSAPP.phone,
      mensagem: "Olá! Quero fazer um orçamento de caneca personalizada."
    }
  },

  computed:{
    whatsappLink(){
      return `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(this.mensagem)}`
    }
  },

  mounted(){

    if(!this.getCookie("modal_orcamento")){

      setTimeout(()=>{
        this.visible = true
      },10000)

    }

  },

  methods:{

    continuar(){
      this.setCookie()
      this.visible = false
    },

    setCookie(){

  const horas = 6
  const data = new Date()

  data.setTime(data.getTime() + (horas * 60 * 60 * 1000))

  document.cookie =
    `modal_orcamento=true; expires=${data.toUTCString()}; path=/`

},

    getCookie(nome){

      const nomeEQ = nome + "="
      const ca = document.cookie.split(';')

      for(let i=0;i<ca.length;i++){

        let c = ca[i]

        while(c.charAt(0)==' ') c = c.substring(1)

        if(c.indexOf(nomeEQ) == 0){
          return c.substring(nomeEQ.length,c.length)
        }

      }

      return null

    }

  }

}
</script>

<style scoped>

.modal-overlay{

  position:fixed;
  inset:0;

  background:rgba(0,0,0,0.55);

  display:flex;
  align-items:center;
  justify-content:center;

  padding:20px;

  backdrop-filter: blur(5px);

  z-index:9999;

}

.modal-box{

  position:relative;

  background:white;

  padding:34px 28px;

  border-radius:18px;

  width:100%;
  max-width:380px;

  text-align:center;

  box-shadow:
  0 25px 60px rgba(0,0,0,0.18);

  animation: modalEnter .35s ease;

}

/* botão fechar */

.close-btn{

  position:absolute;
  top:12px;
  right:14px;

  border:none;
  background:none;

  font-size:18px;

  cursor:pointer;

  color:#999;

}

.close-btn:hover{

  color:#333;

}

.logo{

  width:200px;

  margin-bottom:18px;

}

.modal-title{

  font-size:21px;

  font-weight:700;

  margin-bottom:8px;

}

.modal-text{

  font-size:14px;

  color:#666;

  margin-bottom:24px;

  line-height:1.4;

}

.buttons{

  display:flex;
  flex-direction:column;

  gap:12px;

}

/* botão principal */

.btn-whatsapp{

  background:#ff6a2b;

  color:white;

  border:none;

  border-radius:12px;

  padding:15px;

  font-weight:600;

  font-size:15px;

  text-decoration:none;

  transition:.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

}

.btn-whatsapp:hover{

  transform:scale(1.03);

  box-shadow:
  0 10px 20px rgba(255,106,43,0.25);

}

.whatsapp-icon {
  width: 20px;
  height: 20px;
}

/* botão secundário */

.btn-site{

  background:#f4f4f4;

  border:none;

  padding:13px;

  border-radius:10px;

  font-size:14px;

  color:#ff6a2b;

  cursor:pointer;

}

/* animação */

@keyframes modalEnter{

  from{
    opacity:0;
    transform:translateY(25px) scale(.96);
  }

  to{
    opacity:1;
    transform:translateY(0) scale(1);
  }

}

</style>