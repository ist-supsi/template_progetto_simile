<template>
  <div class="card">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <highcharts :id="chartId"></highcharts>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import {Chart} from 'highcharts-vue';
import Highcharts from 'highcharts';
import loadBullet from 'highcharts/modules/bullet.js';
import Card from './Card.vue'

export default {
    name: 'highchart-card',
    components: {
        Card
    },
    props: {
      // chartType: {
      //   type: String,
      //   default: 'Line' // Line | Pie | Bar
      // },
      // chartOptions: {
      //   type: Object,
      //   default: () => {
      //     return {}
      //   }
      // },
      chartOptions: {
        type: Object,
        default: function () { return {} }
      }
    },
    data () {
        return {
            chartId: 'no-id',
            // $Chartist: null,
            chart: null,
            wtf: null
        }
    },
    watch: {
        chartOptions(val) {
            this.chart = Highcharts.chart(this.chartId, val);
        }
    },
    methods: {
        /***
        * Initializes the chart by merging the chart options sent via props and the default chart options
        */
        initChart () {
            // var chartIdQuery = `#${this.chartId}`
            // this.chart = this.$Chartist[this.chartType](chartIdQuery, this.chartData, this.chartOptions, this.responsiveOptions)
            console.log(['chart-wtf', this, this.chartOptions]);
            this.chart = Highcharts.chart(this.chartId, this.$options.propsData.chartOptions);
            this.$emit('initialized', this.chart);
        },
        /***
        * Assigns a random id to the chart
        */
        updateChartId () {
            // is it unique?!?
            const currentTime = new Date().getTime().toString()
            const randomInt = this.getRandomInt(0, currentTime)
            this.chartId = `hchart_${randomInt}`
        },
        getRandomInt (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    },
    async mounted () {
        this.updateChartId()
        await import('highcharts');
        this.initChart();
    }
}
</script>
<style></style>
