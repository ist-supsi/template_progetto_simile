<template>
  <footer class="footer">
    
    <div class="container-fluid">
     <div class="row justify-content-end">
      <nav>
        <ul>
          <li>
            <!-- <router-link :to="">Dashboard</router-link> -->
            <disclaimerMessage/>
          </li>
        </ul>
      </nav>
      <!-- <div class="copyright text-center">
        &copy; Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="" target="_blank">Disclaimer</a>.
        Designed by <a href="https://www.creative-tim.com/?ref=pdf-vuejs" target="_blank">Creative Tim</a>.
      </div> -->
    </div>
    </div>
  </footer>
</template>

<script>
import disclaimerMessage from '../components/disclaimerMessage.vue';
import Modal from '../components/ModalButton.vue';
  export default {
    components:{
      disclaimerMessage,
      Modal,
     },
     data(){
      return {
        
      }
     },
     methods: {
      
    } 
  }

</script>
<style>

</style>
