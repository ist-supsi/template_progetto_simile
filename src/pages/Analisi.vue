<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card>

                        <div v-if="Object.keys(series_data).length>0" class="row">
                            <div class="col-md-12">
                                <highcharts :options="series_data"></highcharts>
                            </div>
                        </div>

                        <div slot="footer">
                            <i v-if="Object.keys(series_data).length==0"
                                class="fa fa-refresh fa-spin"></i>
                        </div>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Chart} from 'highcharts-vue';
    import Highcharts from 'highcharts';
    import loadBullet from 'highcharts/modules/bullet.js';

    import ChartCard from 'src/components/Cards/ChartCard.vue'
    import HighchartCard from 'src/components/Cards/HighchartCard.vue'
    import StatsCard from 'src/components/Cards/StatsCard.vue'
    import LTable from 'src/components/Table.vue'

    // import Modal from 'src/components/Modal.vue';
    // import ModalButton from 'src/components/ModalButton.vue';
    import NotifyButton from 'src/components/NotifyButton.vue';
    import AnchorToAnalisysPage from 'src/components/AnchorToAnalisysPage.vue';

    loadBullet(Highcharts);

    Highcharts.setOptions({
      chart: {
          inverted: true,
          marginLeft: 135,
          type: 'bullet'
      },
      title: {
          text: null
      },
      legend: {
          enabled: false
      },
      yAxis: {
          gridLineWidth: 0
      },
      plotOptions: {
          series: {
              pointPadding: 0.25,
              borderWidth: 0,
              color: '#000',
              targetOptions: {
                  width: '200%'
              }
          }
      },
      credits: {
          enabled: false
      },
      exporting: {
          enabled: false
      }
  });

    export default {
        components: {
            LTable,
            ChartCard,
            StatsCard,
            highcharts: Chart,
            HighchartCard,
            NotifyButton,
            // ModalButton,
            // Modal
        },
        data () { return {
            series_data: {},
            allProcedure: this.$root.allProcedure.data,
            groupedProcedures: {},
            procedureInfos: {},
            analisysVariable: this.$root.analisysVariable,
            category_colors: ['#2f7ed8',, '#a6c96a', '#492970', '#f28f43',
                '#0d233a', '#77a1e5', '#8bbc21']
        }},
        watch: {
          series_data: {
             handler(val){
               // do stuff
             },
             deep: true
          }
        },
        mounted() {
            var self = this;
            this.groupedProcedures = this.allProcedure.reduce((acc, it) => {
                let arr = it.name.split('_');
                if ( arr.length<=2 ) {
                    acc[it.name] = [it.name];
                    return acc;
                } else {
                    const key = arr.slice(0, -2).join('_');
                    self.procedureInfos[it.name] = {
                        group: key,
                        observedproperties: it.observedproperties[0].definition
                    };
                    if ( key in acc ) {
                        acc[key].push(it.name);
                    } else {
                        acc[key] = [it.name];
                    };
                    return acc;
                };
            }, {});
            
            let i=0;
            for (const procedure of this.groupedProcedures[self.procedureInfos[this.analisysVariable].group]) {
                this.istsos.fetchSeries(procedure, this.procedureInfos[procedure].observedproperties).then((result)=>{
                    if ( procedure!=self.analisysVariable ) {
                        result.options.series[0].visible = false;
                    };
                    
                    result.options.series[0].color = this.category_colors[i];
                    i = i+1;
                    if ( !self.series_data.series ) {
                        self.series_data = result.options;
                    } else {
                        self.series_data.series.push(result.options.series[0]);
                        self.series_data.series.sort((el1, el2) => { el1.name<el2.name } );
                    };
                });
            };
            
        },
        methods: {},
  }
</script>
<style>
.table > thead > tr > th:last-child, .table > tbody > tr > th:last-child, .table > tfoot > tr > th:last-child, .table > thead > tr > td:last-child, .table > tbody > tr > td:last-child, .table > tfoot > tr > td:last-child {
  width: auto;
}
</style>
