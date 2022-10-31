<template>
  <card class="card-user h-100">
    <img slot="image" src="http://a.tile.stamen.com/watercolor/15/17198/11658.jpg" alt="Lago Ceresio"/>
    <div class="author">
      <a href="#/admin/lago-maggiore">
        <img class="avatar border-gray" src="https://live.staticflickr.com/65535/49409610966_b93106c08c_b.jpg" alt="Lago Maggiore"/>

        <h4 class="title">Lago Maggiore<br />
          <small>Verbano</small>
        </h4>
      </a>
    </div>
    <p class="description text-justify">
      Il Lago Maggiore, o Verbano, è un grande lago pedemontano originato dalla rimodellazione glaciale di una 
      preesistente valle fluviale. E’ il secondo lago italiano per superficie e volume ed il secondo per profondità 
      massima (370 m) ed è situato tra le provincie di Varese (a est), quelle di Novara e di Verbania ad ovest ed il 
      Canton Ticino (Svizzera) a Nord. Si trova a un’altitudine media di 193.88 m sul livello del mare. 
      Il bacino imbrifero del lago è di 6599 km<sup>2</sup>, divisi equamente tra Italia (3229 km<sup>2</sup>) e Svizzera (3370 km<sup>2</sup>). L'80% della 
      superficie lacustre è però in Italia. La popolazione residente nel bacino imbrifero è di circa 670'000 abitanti; 
      questo numero può però aumentare significativamente in alcuni periodi dell'anno, a causa delle presenze 
      turistiche. 
      Le acque del Lago Maggiore sono importanti per la pesca sportiva e professionale e la nautica da diporto. Le 
      acque in uscita sono d’importanza fondamentale a fini irrigui delle colture di riso e granoturco della Pianura 
      Padana.  
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
