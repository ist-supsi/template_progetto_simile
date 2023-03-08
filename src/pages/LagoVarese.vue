<template>
  <div class="content">
    Lago di Varase
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted () {
    this.$root.whereAmI = 'Lago di Varase';
  }
};
</script>
<style>
.table > thead > tr > th:last-child,
.table > tbody > tr > th:last-child,
.table > tfoot > tr > th:last-child,
.table > thead > tr > td:last-child,
.table > tbody > tr > td:last-child,
.table > tfoot > tr > td:last-child {
  width: auto;
}
.nav-link {
  cursor: pointer;
}
.modal {
  overflow: auto !important;
}

.input-group > .form-control,
.input-group > .form-control-plaintext,
.input-group > .custom-select,
.input-group > .custom-file {
  position: relative;
  -ms-flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  margin-bottom: 0;
  height: auto;
}

.btn {
  border-width: 2px;
  background-color: #eeeeee;
  font-weight: 400;
  opacity: 0.8;
  filter: alpha(opacity=80);
  padding: 8px 16px;
  border-color: #888888;
  color: #888888;
  /* fill-opacity: 0; */
}

.btn-info:hover,
.btn-info:focus,
.btn-info:active,
.btn-info.active,
.open > .btn-info.dropdown-toggle {
  background-color: #eeeeee;
  color: #42d0ed;
  border-color: #42d0ed;
}
</style>
