<template>
  <card class="card-user">
    <img slot="image" src="http://a.tile.stamen.com/watercolor/15/17196/11658.jpg" alt="Lago Lario"/>
    <div class="author">
      <a href="#/admin/lago-lugano">
        <img class="avatar border-gray" src="https://cdn.pixabay.com/photo/2018/09/28/17/39/lake-3709807_1280.jpg" alt="Lago di Como"/>

        <h4 class="title">Lago di Como<br />
          <small>Lago Lario</small>
        </h4>
      </a>
    </div>
    <p class="description text-center">
      Lorem ipsum dolor sit amet.<br />
      Ea dignissimos aspernatur et quaerat quia et<br />
      quasi ipsa et voluptates debitis sit ipsum<br />
      laudantium sed nobis accusantium<br />
      quo quidem debitis.
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
