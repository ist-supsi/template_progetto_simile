<template>
  <card class="card-user h-100">
    <img slot="image" src="http://a.tile.stamen.com/watercolor/15/17196/11658.jpg" alt="Lago Lario"/>
    <div class="author">
      <a href="#/admin/lago-como">
        <img class="avatar border-gray" src="https://cdn.pixabay.com/photo/2018/09/28/17/39/lake-3709807_1280.jpg" alt="Lago di Como"/>

        <h4 class="title">Lago di Como<br />
          <small>Lario</small>
        </h4>
      </a>
    </div>
    <p class="description text-justify">
      Il lago di Como o Lario è un lago subalpino di origine fluvio-glaciale, situato pressochè interamente in territorio 
      lombardo, nelle province di Como e Lecco. E’ posto a un'altitudine di 197,39 m s.l.m. È il lago più profondo d’Italia 
      (410 m nei pressi di Argegno) ed il terzo lago italiano per superficie e volume. Ha una forma caratteristica a "Y" 
      rovesciata ed è composto da tre sottobacini: a sinistra il ramo di Como, a destra il ramo di Lecco e a nord il ramo 
      di Colico. Il fiume Adda è il principale immissario e l'unico emissario. Il bacino idrografico del lago di Como è 
      molto vasto e si estende sia in territorio italiano che svizzero per un totale di 4.508 km<sup>2</sup>, di cui 4.394 km<sup>2</sup> in 
      Lombardia. Il punto più elevato culmina sul Pizzo Bernina al confine fra Italia e Svizzera. 
      Il territorio del lago ha un’elevata valenza turistica. Le acque del lago sono utilizzate a scopo idropotabile, irriguo e 
      per la pesca professionale e sportiva. 
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
