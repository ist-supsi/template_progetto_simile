<template>
  <card class="card-user">
    <img slot="image" src="http://a.tile.stamen.com/watercolor/15/17198/11657.jpg" alt="Lago Ceresio"/>
    <div class="author">
      <a href="#/admin/lago-lugano">
        <img class="avatar border-gray" src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Der_Lago_di_Lugano.jpg" alt="Lago di Lugano"/>

        <h4 class="title">Lago di Lugano<br />
          <small>Lago Ceresio</small>
        </h4>
      </a>
    </div>
    <p class="description text-center">
        Il lago giace in una valle plasmata dall'erosione dei ghiacciai durante l'ultimo periodo glaciale.<br>
        Si trova ad una quota di 270 m s.l.m. ed è costituito da tre diversi bacini:
        Il bacino nord (tra Melide e Porlezza), il bacino sud (tra Capolago e Agno),
        separati dal ponte-diga di Melide costruito in passato su una morena sublacuale,
        ed il piccolo bacino di Ponte Tresa.<br>
        Il bacino nord è il più profondo (288 m) e presenta un bacino imbrifero di modeste dimensioni rispetto al volume,
        di conseguenza ha un elevato tempo teorico di ricambio (12.3 anni). 
        Le acque del lago sono utilizzate per il consumo idropotabile, il prelievo ad uso termico e industriale, la balneazione, la pesca professionale e sportiva.
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
