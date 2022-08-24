<template>



                            <div class="col-md-12">
                              <figure  class="highcharts-figure">
                                  <highcharts id="container" :options="lineOptions"></highcharts>
                                </figure>
                            <!-- v-for="infoChart in cipaisData" -->
                            </div>
                           

</template>


<script>

    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import HighchartCard from 'src/components/Cards/HighchartCard.vue';
    import LagoLugano from 'src/pages/LagoLugano.vue';
    import tableDataCipais from 'src/pages/LagoLugano.vue';
    import chartDefaultOptions from 'src/pages/chartDefaultOptions';
    
     


    export default {
        components: {
            highcharts: Chart,
            HighchartCard,
            LagoLugano,
            tableDataCipais
            
        },
         data () { return {
            cipaisOptions: [],
            lineOptions: chartDefaultOptions.LINE_DEFAULTS,
            chartOptions: {},
            category_colors: ['#2f7ed8',, '#a6c96a', '#492970', '#f28f43',
                '#0d233a', '#77a1e5', '#8bbc21'],
            // tableAllData = self.$root.tableAllData,
            cipaisData: {}

        }},
        watch: {
        
        },
        mounted() {
            // self.cipaisData = self.$root.tableAllData.data.filter(el=>{
            //     if(el.procedures[0].includes("CIPAIS")&& selectedProc.includes(el.procedures[0])){
            //         return true;
            //     }
            //     else {
            //         return false;
            //     };
            //     })
            // this.setSeries()
            this.$root.tableDataPrm.then(result=>{
                console.log(result);
            })

        },
        methods: {
            setSeries(){
                
            }
        },
    }
</script>
<style>


.highcharts-figure,
.highcharts-data-table table {
    min-width: 360px;
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>
