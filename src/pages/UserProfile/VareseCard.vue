<template>
  <card class="card-user h-100">
    <img slot="image" src="http://stamen-tiles-d.a.ssl.fastly.net/watercolor/15/17176/11679.jpg" alt="Lago di Varese"/>
    <div class="author">
      <a href="#/admin/lago-varese">
        <img class="avatar border-gray" src="https://upload.wikimedia.org/wikipedia/commons/4/49/Lagovaresevento.jpg" alt="Lago di Varese"/>

        <h4 class="title">Lago di Varese<br />
          <small>Varese</small>
        </h4>
      </a>
    </div>
    <p class="description text-justify">
        Il Lago di Varese è un lago di origine proglaciale con una superficie di circa 14 km2 e un’altitudine media di 238 m s.l.m. Il suo bacino idrografico ha un’area di 107 km2 che comprende il lago di Comabbio e il territorio di 21 comuni. La profondità media del lago è di circa 11 m, con una zona più profonda (24 m) nella metà settentrionale. L’immissario principale è il Canale Brabbia, mentre gli altri hanno per lo più carattere torrentizio. L’emissario è il fiume Bardello che si immette nel Lago Maggiore. Il deflusso delle acque è regolato tramite uno sbarramento costruito agli inizi del 1900. Il lago e la sua fascia perilacuale sono considerati Zona di Protezione Speciale per l’avifauna. È stata istituita anche la ZSC - Zona Speciale di Conservazione “Alnete del Lago di Varese” per i territori che si affacciano a lago nel settore orientale. Il lago dal 2016 fa parte delle “aree designate per la protezione di specie acquatiche significative dal punto di vista economico” (PTUA, 2016), in particolare è considerato idoneo alla vita dei ciprinidi.
    </p>
    <div slot="footer" class="text-center d-flex justify-content-center">
      <!-- <button href="#" class="btn btn-simple"><i class="fa fa-facebook-square"></i></button>
      <button href="#" class="btn btn-simple"><i class="fa fa-twitter"></i></button>
      <button href="#" class="btn btn-simple"><i class="fa fa-google-plus-square"></i></button> -->
    </div>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      Card
    },
    data () {
      return {
        details: [
          {
            title: '12',
            subTitle: 'Files'
          },
          {
            title: '2GB',
            subTitle: 'Used'
          },
          {
            title: '24,6$',
            subTitle: 'Spent'
          }
        ]
      }
    },
    methods: {
      getClasses (index) {
        var remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      }
    }
  }

</script>
<style>

</style>
