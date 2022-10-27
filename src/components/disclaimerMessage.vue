<template>

<!-- <div class="disclaimer" :class="containerPosition" v-if="isOpen" >
    <div class="disclaimer_content">
        <slot name="message">
            {{ message }}
        </slot>
    </div>
    <div class="disclaimer_button accept" @click="accept">
            {{ buttonTextAccept }}
    </div>
    <div class="disclaimer_button deny" @click="deny">
            {{ buttonTextDeny }}
    </div>
</div> -->

<div>
  <a @click="showComponent()"> 
        Disclaimer
  </a>
  
<div class="row" v-if="isOpen">
      <div class="col-md-4 col-sm-12 button-fixed">
        <div class="p-3 pb-4 bg-custom text-white">
          <div class="row">
            <div class="col-10">
              <h2>DISCLAIMER</h2>
            </div>
            <div class="col-2 text-center">
              <i class="fa fa-times" @click="deny()"></i>
            </div>
          </div>
            <p>I dati da sensori pubblicati nella piattaforma sono acquisizioni dirette e in tempo reale 
                e non sono quindi sottoposti a validazione. Hanno funzione informativa e i partner del progetto 
                SIMILE declinano ogni responsabilità per l’uso improprio dei dati.

                I dati sulle mappe satellitari pubblicate nella piattaforma sono derivati dal processamento di 
                immagini satellitari. Le mappe sono pubblicate alcuni giorni dopo la disponibilità delle immagini stesse.
                Le mappe satellitari sono sottoposte ad un procedimento di pulizia dei dati rispetto a possibili problemi 
                derivanti dalle modalità di acquisizione delle immagini, ma non sono sottoposti a validazione rispetto a 
                dati riferimento a terra. Tutti i dati hanno funzione informativa e i partner del progetto SIMILE declinano 
                ogni responsabilità per un uso improprio degli stessi.
                I dati raccolti dai cittadini tramite l'applicazione per smartphone per Citizen Science non sono sottoposti 
                a validazione da operatori esperti o tramite dati sul campo.

                Tutti i dati pubblicati (sensori, satellitari e cittadini) hanno funzione informativa e i partners del progetto SIMILE,
                in qualità di fornitori, non rispondono di perdite o danni di natura materiale o immateriale derivanti 
                dall'accesso, dall'utilizzo, dall'abuso o dal mancato utilizzo dei dati e delle informazioni pubblicate, 
                né a seguito di interruzioni o guasti tecnici del software.


          </p>
          <button type="button" class="btn btn-danger w-100" @click="accept()">Ho capito</button>
        </div>
      </div>
    </div>
</div> 
</template>

<script>
export default{
    
    data(){
        return {
            isOpen:  false
        }
    },
    
    created() {
        if(!this.getConsent() === true) {
            this.isOpen = true;
        }
    },
    methods: {
        getConsent(){
            return localStorage.getItem('Consent:accepted',true);
        },
        accept(){
            this.isOpen = false;
            localStorage.setItem('Consent:accepted', true);
        },
        deny(){
            this.isOpen = false;
            localStorage.setItem('Consent:accepted', false)
        },
        showComponent(){
        this.isOpen=true;
        console.log(this.isOpen)
      }
    }
}
</script>
<style type="text/css">
      .bg-custom{
      background-color:#747380;
      }
      .button-fixed{
      bottom: 0;
      position: fixed;
      right: 0;
      border-radius: 4px;
      }
      .fas{
      cursor: pointer;
      font-size: 24px;
      }
      p{
      font-size: 14px;
      }
      a{
        cursor: pointer;
      }
    </style>