<template>
  <div v-if="visible" class="modal-overlay">

    <div class="modal-box">

      <!-- botão fechar -->
      <button class="close-btn" @click="continuar">
        ✕
      </button>

      <!-- logo -->
      <img
        src="../assets/logoH_principal-300ppi.png"
        alt="Manuari"
        class="logo"
      />

      <h2 class="modal-title">
        Que tal uma caneca única?
      </h2>

      <p class="modal-text">
        Um atendente pode te ajudar a escolher a arte ou <strong>personalizar do zero</strong> para você!
      </p>

      <div class="buttons">

        <a
          class="btn-whatsapp"
          :href="whatsappLink"
          target="_blank"
          @click="setCookie"
        >
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
export default {

  name: "ModalOrcamento",

  data(){
    return{
      visible:false,
      numero:"5592991802094",
      mensagem:"Olá! Quero fazer um orçamento de caneca personalizada."
    }
  },

  computed:{
    whatsappLink(){
      return `https://wa.me/${this.numero}?text=${encodeURIComponent(this.mensagem)}`
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

}

.btn-whatsapp:hover{

  transform:scale(1.03);

  box-shadow:
  0 10px 20px rgba(255,106,43,0.25);

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