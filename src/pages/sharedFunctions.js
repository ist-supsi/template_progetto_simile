
import config from '../../config.js'
import istsosToHighcharts from './istsosToHighcharts';
import indicatorDescription from '../indicatorDescription';
import { mean,std,min,sqrt,max } from 'mathjs';

// const base_layers = [
//     {
//       name: 'Classic',
//       visible: true,
//       format: 'image/png',
//       url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//       transparent: true/*,
//       attribution: "Weather data © 2012 IEM Nexrad"*/
//     },
//     {
//       name: 'Light',
//       visible: true,
//       format: 'image/png',
//       url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
//       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
//       transparent: true/*,
//       attribution: "Weather data © 2012 IEM Nexrad"*/
//     },
// ]

/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
 * @return {string} Human readable elapsed or remaining time
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/67338038/938822
 * @source https://stackoverflow.com/a/67338038/1039510
 */
function fromNow(date) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    const units = [
        { max: 30 * SECOND, divisor: 1, past1: 'just now', pastN: 'just now', future1: 'just now', futureN: 'just now' },
        { max: MINUTE, divisor: SECOND, past1: 'a second ago', pastN: '# seconds ago', future1: 'in a second', futureN: 'in # seconds' },
        { max: HOUR, divisor: MINUTE, past1: 'a minute ago', pastN: '# minutes ago', future1: 'in a minute', futureN: 'in # minutes' },
        { max: DAY, divisor: HOUR, past1: 'an hour ago', pastN: '# hours ago', future1: 'in an hour', futureN: 'in # hours' },
        { max: WEEK, divisor: DAY, past1: 'yesterday', pastN: '# days ago', future1: 'tomorrow', futureN: 'in # days' },
        { max: 4 * WEEK, divisor: WEEK, past1: 'last week', pastN: '# weeks ago', future1: 'in a week', futureN: 'in # weeks' },
        { max: YEAR, divisor: MONTH, past1: 'last month', pastN: '# months ago', future1: 'in a month', futureN: 'in # months' },
        { max: 100 * YEAR, divisor: YEAR, past1: 'last year', pastN: '# years ago', future1: 'in a year', futureN: 'in # years' },
        { max: 1000 * YEAR, divisor: 100 * YEAR, past1: 'last century', pastN: '# centuries ago', future1: 'in a century', futureN: 'in # centuries' },
        { max: Infinity, divisor: 1000 * YEAR, past1: 'last millennium', pastN: '# millennia ago', future1: 'in a millennium', futureN: 'in # millennia' },
    ];
    const diff = Date.now() - (typeof date === 'object' ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const unit of units) {
        if (diffAbs < unit.max) {
            const isFuture = diff < 0;
            const x = Math.round(Math.abs(diff) / unit.divisor);
            if (x <= 1) return isFuture ? unit.future1 : unit.past1;
            return (isFuture ? unit.futureN : unit.pastN).replace('#', x);
        }
    }
};

const map_layers = [
    {
      name: 'Maschera',
      visible: true,
      format: 'image/png',
      layers: 'Maschera',
      transparent: true/*,
      attribution: "Weather data © 2012 IEM Nexrad"*/
    },
    // {
    //   name: 'Aree naturali poligonali Svizzera',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Aree_naturali_poligonali_Svizzera',
    //   opacity: .5,
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    // {
    //   name: 'Aree protette Piemonte',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Aree_protette_Piemonte',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    // {
    //   name: 'Aree protette poligonali Lombardia',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Aree_protette_poligonali_Lombardia',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    // {
    //   name: 'Aree naturali puntuali Svizzera',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Aree_naturali_puntuali_Svizzera',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    // {
    //   name: 'Aree protette puntuali Lombardia',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Aree_protette_puntuali_Lombardia',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    // {
    //   name: 'Reticolo idrografico',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Reticolo_idrografico',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    {
      name: 'Laghi',
      visible: true,
      format: 'image/png',
      layers: 'Laghi',
      opacity: .5,
      transparent: true/*,
      attribution: "Weather data © 2012 IEM Nexrad"*/
    },
    // {
    //   name: 'Strade',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Strade',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    // {
    //   name: 'Ferrovie',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Ferrovie',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
    // {
    //   name: 'Limiti amministrativi',
    //   visible: true,
    //   format: 'image/png',
    //   layers: 'Limiti_amministrativi',
    //   transparent: true/*,
    //   attribution: "Weather data © 2012 IEM Nexrad"*/
    // },
  //   {
  //     name: 'Uso di suolo (CORINE_2018)',
  //     visible: false,
  //     format: 'image/png',
  //     layers: 'Uso_di_suolo_CORINE_2018',
  //     transparent: true/*,
  //     attribution: "Weather data © 2012 IEM Nexrad"*/
  //   },
  //   {
  //     name: 'Stato delle rive',
  //     visible: false,
  //     format: 'image/png',
  //     layers: 'Stato_delle_rive',
  //     transparent: true/*,
  //     attribution: "Weather data © 2012 IEM Nexrad"*/
  //   },
  //   {
  //     name: 'Depuratori con capacità > 2000 AE',
  //     visible: false,
  //     format: 'image/png',
  //     layers: 'Depuratori_con_capacita_greater_2000_AE',
  //     transparent: true/*,
  //     attribution: "Weather data © 2012 IEM Nexrad"*/
  //   },
  //   {
  //     name: 'Punti prelievo d\'acqua',
  //     visible: false,
  //     format: 'image/png',
  //     layers: 'Punti_prelievo_d_acqua',
  //     transparent: true/*,
  //     attribution: "Weather data © 2012 IEM Nexrad"*/
  //   },
//     {
//       name: 'Bacini idrografici',
//       visible: true,
//       format: 'image/png',
//       layers: 'Bacini_idrografici',
//       transparent: true/*,
//       attribution: "Weather data © 2012 IEM Nexrad"*/
//   }
]


const base_layers = {
    classic: {
        label: 'Openstreetmap',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        options: {
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            minZoom: 0
        }
    },
    tonerLite: {
        label: 'Toner lite',
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
        options: {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
          	minZoom: 0,
          	maxZoom: 20,
          	ext: 'png'
        }
    },
    satellite: {
        label: 'Satellite',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        options: {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }
    },
    terrain: {
        label: 'Terrain',
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
        options: {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 18,
            ext: 'png'
        }
    },
    light: {
        label: 'Light grey',
        // url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        // Doc: https://docs.stadiamaps.com/authentication/#authentication-limits
        url: `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${config.apikeys.stadiamaps}`,
        options: {
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 20,
            minZoom: 0,
            // apikey: config.apikeys.stadiamaps
        }
    },
};


function addBaseLayers(map) {

    let layers = {}
    for (const [key, info] of Object.entries(base_layers)) {
        const layer = L.tileLayer(info.url, info.options);
        // map.addLayer(layer);
        layers[info.label] = layer;
    };
    // Attualmente l'ultimo layer è quello di default
    L.control.layers(layers).addTo(map);
    map.addLayer(layers['Light grey']);

};

function areaLayerOptions (self) {
  return {
      style: function (feature) {
          let color = '#406e96'
          if ( feature.properties.markerIndex==self.selectedMarker ) {
            //   color = '#1D62F0 '
            color = '#ed595b'
          };
          return {
              color: color,
              fillColor: color,
              fillOpacity:0.1,
          }
      },
      onEachFeature: function (feature, layer) {
          layer.bindTooltip(`<h6>${guessLocLabel(feature.properties.label)}</h6>`, {sticky: true})
          layer.on('click', ee => {
              self.selectedMarker=feature.properties.markerIndex
              self.selectedTab='satellitari'
              console.log(self.selectedMarker)
          })
      },
  }
}
function guessLocLabel (foi_name){
    const locLabel= {
        FIGINO:'Figino',
        figino:'Figino',
        GANDRIA:'Gandria',
        gandria:'Gandria',
        MELIDE:'Melide',
        lugano_basin_north:'Bacino Nord',
        lugano_basin_south:'Bacino Sud',
        'Ceresio Nord':'Bacino Nord',
        'Ceresio Sud': 'Bacino Sud',
        DERVIO:'Dervio',
        MANDELLO:'Mandello',
        lake_como_east_basin:'Bacino Est',
        lake_como_west_basin:'Bacino Ovest',
        lake_como_north_basin:'Bacino Nord',
        GHIFFA:'Ghiffa',
        PALLANZA:'Pallanza',
        PALLANZA_D:'Pallanza',
        PALLANZA_S:'Pallanza',
        Pallanza_D:'Pallanza',
        Pallanza_S:'Pallanza',
        maggiore:'Bacino Completo',
        ABBADIA:'Abbadia',
        ARGEGNO:'Argegno',
        COMO:'Como',



    }
    if(foi_name.split('_')[0] in locLabel){
        return locLabel[foi_name.split('_')[0]]
    }
    else if(foi_name in locLabel){
        return locLabel[foi_name]
    }
    else return foi_name
};
function guessLocTitle (foi_name){
    const locTitle= {
        FIGINO:'Dati relativi alla località di Figino',
        GANDRIA:'Dati relativi alla località di Gandria',
        MELIDE:'Dati relativi alla località di Melide',
        lugano_basin_north:'Dati satellitari relativi al Bacino Nord',
        lugano_basin_south:'Dati satellitari relativi al Bacino Sud',
        'Ceresio Nord':'Dati satellitari relativi al Bacino Nord',
        'Ceresio Sud': 'Dati satellitari relativi al Bacino Sud',
        DERVIO:'Dati relativi alla località di Dervio',
        MANDELLO:'Dati relativi alla località di Mandello',
        lake_como_east_basin:'Dati satellitari relativi al Bacino Est',
        lake_como_west_basin:'Dati satellitari relativi al Bacino Ovest',
        lake_como_north_basin:'Dati satellitari relativi al Bacino Nord',
        GHIFFA:'Dati relativi alla località di Ghiffa',
        PALLANZA:'Dati relativi alla località di Pallanza',
        PALLANZA_D:'Dati relativi alla località di Pallanza',
        PALLANZA_S:'Dati relativi alla località di Pallanza',
        Pallanza_D:'Dati relativi alla località di Pallanza',
        Pallanza_S:'Dati relativi alla località di Pallanza',
        maggiore:'Dati satellitari relativi al Bacino Completo',
        ABBADIA:'Dati relativi alla località di Abbadia',
        ARGEGNO:'Dati relativi alla località di Argegno',
        COMO:'Dati relativi alla località di Como',

    }
    if(foi_name.split('_')[0] in locTitle){
        return locTitle[foi_name.split('_')[0]]
    }
    else if(foi_name in locTitle){
        return locTitle[foi_name]
    }
    else return foi_name
};




function markerLayerOptions (self) {
    return {
        pointToLayer: function (feature, latlng) {
            const prefixes = feature.properties.names.reduce((prev, info) => {
                const name = info.procedure;
                const prefix = name.split('_')[0];
                if ( !prev.includes(prefix) ) { prev.push(prefix); }
                return prev;
            }, []);
            const suffixes = feature.properties.names.reduce((prev, info) => {
                const name = info.procedure;

                const suffix = name.split('_').at(-1);
                if ( !prev.includes(suffix) ) { prev.push(suffix); }
                return prev;
            }, []);
            if (!prefixes.every(prefix => prefix=='SATELLITE')) {
                let clr;
                if ( feature.properties.markerIndex == self.selectedMarker ) {
                    // clr = 'text-primary'
                    clr = 'text-danger'
                } else {
                    clr = 'text-secondary'
                };
                const fontAwesomeIcon = L.divIcon({
                    html: `<i class="fa fa-map-marker fa-4x ${clr}"></i>`,
                    iconSize: [40, 80],
                    iconAnchor: [20, 40],
                    className: ''
                });

                const marker = L.marker(latlng, {icon: fontAwesomeIcon}).on('click', (ee)=>{
                    self.selectedMarker=feature.properties.markerIndex;
                });

                marker.bindTooltip(`<h6>${guessLocLabel(feature.properties.foi_name)}</h6>`)

                return marker;
            } else {
                self.basins.features.map(feat => {
                    if ( feat.properties.basin.startsWith(suffixes[0]) ) {
                        feat.properties.markerIndex = feature.properties.markerIndex;
                    };
                });
                // TO BE REMOVED
                // return L.marker(latlng)
                // return feature;
            };

        }
    }
}

const groupedProceduresList = [
    // ['WaterTemp_S', 'AIR_TEMP'] // raggruppamento di test
];

// let groupedProcedures = groupedProceduresList.reduce((prev, curr)=>{
//     for (let [index, proc] of curr.entries()) {
//         prev[proc] = curr;
//     };
//     return prev;
// }, {});

function groupProcedures (allProcedures) {
    let procedureInfos = {};
    const groupedProcedures = Object.values(allProcedures).reduce((acc, it, idx)=>{
        let foundIt = false;
        for (const [index, group] of groupedProceduresList.entries()) {
            if ( group.includes(it.name) ) {
                foundIt = true;
                const kk = index.toString();
                if (!(kk in acc)) {
                    acc[kk] = group;
                };
                procedureInfos[it.name] = {
                    group: index,
                    observedproperties: it.observedproperties[0].definition
                };
            };
        };
        if (!foundIt) {
            acc[it.name] = [it.name]
            procedureInfos[it.name] = {
                group: it.name,
                observedproperties: it.observedproperties[0].definition
            };
        };

        return acc;
    }, {});
    return [groupedProcedures, procedureInfos];
};


function loadSatelliteData (self) {
    let dataSatellite = [];
    let dataSatelliteWithSD = [];
    let dataSatelliteWithQQ = [];
    let prms = [];
    for (const proc of self.selectedSatelliteProcedures) {

        const info = self.allProcedures[proc.procedure];

        if (info.samplingTime.beginposition && info.samplingTime.endposition) {
            const begin = new Date(info.samplingTime.beginposition);
            const end = new Date(info.samplingTime.endposition);
            for (const prop of info.observedproperties) {
                const prm = Promise.all([
                    self.istsos.fetchSeries(
                        proc.procedure,
                        prop.definition,
                        begin,
                        end
                    ),
                    self.istsos.fetchSeries(
                        proc.procedure+'_SD',
                        prop.definition,
                        begin,
                        end
                    ),
                    self.istsos.fetchSeries(
                        proc.procedure+'_1Q',
                        prop.definition,
                        begin,
                        end
                    ),
                    self.istsos.fetchSeries(
                        proc.procedure+'_3Q',
                        prop.definition,
                        begin,
                        end
                    )
                ]).then(response=>{
                    const result = istsosToHighcharts.istosToLine(response[0]);
                    const result1Q = istsosToHighcharts.istosToLine(response[2]);
                    const result3Q = istsosToHighcharts.istosToLine(response[3]);
                    // const resultSD = istsosToHighcharts.istosToLine(response[1]);

                    // Courtesy of: https://stackoverflow.com/a/10284006/1039510
                    const zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]));
                    const seriesQQ = zip(
                        result1Q.options.series[0].data,
                        result3Q.options.series[0].data).map((data)=>[...data[0], data[1][1]]);

                    const dataSD = zip(
                        result.options.series[0].data,
                        istsosToHighcharts.istsosToSeries(
                            response[1]).series
                    ).map((data)=>[data[0][0], data[0][1]-data[1][1], data[0][1]+data[1][1]]);

                    // result.options.series.push(result3Q.options.series[0])

                    const variableAverage = mean(result.options.series[0].data.map((xy)=>xy[1]));

                    result.options.yAxis.plotLines = [{
                        color: 'darkgrey',
                        dashStyle: 'ShortDash',
                        width: 2,
                        value: variableAverage,
                        label: {
                            text: 'media della serie',
                            align: 'center',
                            style: {color: 'darkgrey'}
                        }
                    }];

                    if (info.observedproperties[0].name in indicatorDescription.indicatorDescription) {
                        result.options.title.text = indicatorDescription.indicatorDescription[info.observedproperties[0].name].title;
                    } else {
                        result.options.title.text = info.description;
                    };
                    result.options.subtitle.text = `${info.description} (${result.uom})`;
                    dataSatellite.push({...result.options});

                    const opts3Q = result3Q.options.series[0];
                    opts3Q.color = '#f28f43'
                    const opts1Q = result1Q.options.series[0];
                    opts1Q.color = '#f2ff43'

                    // WARNING!
                    // const optsQQ = {...result.options};
                    // const optsQQ = Object.assign({}, result.options);
                    // It seams the only correct way for cloning an object bracking all references
                    const resultQQ = istsosToHighcharts.istosToLine(response[0], undefined, true);
                    resultQQ.options.rangeSelector.selected = 3
                    resultQQ.options.series[0]['showInLegend'] = false;
                    resultQQ.options.yAxis.plotLines = result.options.yAxis.plotLines;

                    let resultSD = JSON.parse(JSON.stringify(result));

                    // TODO: Trasformare in grafico arearange
                    //    (https://www.highcharts.com/demo/arearange)
                    // optsQQ.series.push(opts3Q);
                    // optsQQ.series.push(opts1Q);
                    resultQQ.options.series.push({
                        type: 'errorbar',
                        name: 'deviazione standard',
                        data: dataSD,
                        visible: false,
                        color: '#6d6d6d'
                    });
                    resultQQ.options.series.push({
                        type: 'arearange',
                        name: 'intervallo 1-3° quantile',
                        data: seriesQQ,
                        opacity: .7,
                        visible: true,
                        events: {
                            hide: function () {
                                this.chart.series[1].setVisible(true);
                            },
                            show: function () {
                                this.chart.series[1].setVisible(false);
                            }
                        }
                    });

                    // dataSatelliteWithSD.push(resultSD.options);
                    dataSatelliteWithQQ.push(resultQQ.options);
                    // dataSatelliteWithQQ = [optsQQ, ...dataSatelliteWithQQ];
                });
                prms.push(prm);
            };
        };

    };

    Promise.all(prms).then(()=>{
        self.dataSatellite = dataSatellite;
        self.dataSatelliteWithQQ = dataSatelliteWithQQ;
        // self.dataSatelliteWithSD = dataSatelliteWithSD;
        self.modalClasses=[];
        for (let i = 0; i < self.dataSatellite.length; i++) {
            self.modalClasses.push(['modal','fade']);
        }
    });

};

export default {areaLayerOptions, markerLayerOptions, map_layers,guessLocLabel,
    addBaseLayers, guessLocTitle, fromNow, groupProcedures, loadSatelliteData};
