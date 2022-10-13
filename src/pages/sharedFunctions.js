
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
    {
      name: 'Reticolo idrografico',
      visible: true,
      format: 'image/png',
      layers: 'Reticolo_idrografico',
      transparent: true/*,
      attribution: "Weather data © 2012 IEM Nexrad"*/
    },
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
    {
      name: 'Limiti amministrativi',
      visible: true,
      format: 'image/png',
      layers: 'Limiti_amministrativi',
      transparent: true/*,
      attribution: "Weather data © 2012 IEM Nexrad"*/
    },
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
    {
      name: 'Bacini idrografici',
      visible: true,
      format: 'image/png',
      layers: 'Bacini_idrografici',
      transparent: true/*,
      attribution: "Weather data © 2012 IEM Nexrad"*/
  }
]

function areaLayerOptions (self) {
  return {
      style: function (feature) {
          let color = '#6c757d'
          if ( feature.properties.markerIndex==self.selectedMarker ) {
            //   color = '#1D62F0 '
            color = '#ed595b'
          };
          return {
              color: color,
              fillColor: color,
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

export default {areaLayerOptions, markerLayerOptions, map_layers,guessLocLabel};
