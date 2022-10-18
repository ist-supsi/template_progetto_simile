
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
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        options: {
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 20,
            minZoom: 0
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
          })
      },
  }
}
function guessLocLabel (foi_name){
    const locLabel= {
        FIGINO:'Figino',
        GANDRIA:'Gandria',
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

    }
    if(foi_name.split('_')[0] in locLabel){
        return locLabel[foi_name.split('_')[0]]
    }
    else if(foi_name in locLabel){
        return locLabel[foi_name]
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
                    if ( feat.properties.basin==suffixes[0] ) {
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

export default {areaLayerOptions, markerLayerOptions, map_layers,guessLocLabel, addBaseLayers};
