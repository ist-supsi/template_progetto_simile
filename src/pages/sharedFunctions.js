
function areaLayerOptions (self) {
  return {
      style: function (feature) {
          let color = '#6c757d'
          if ( feature.properties.markerIndex==self.selectedMarker ) {
              color = '#1D62F0 '
          };
          return {
              color: color,
              fillColor: color,
          }
      },
      onEachFeature: function (feature, layer) {
          layer.bindTooltip(`<h6>${feature.properties.label}</h6>`, {sticky: true})
          layer.on('click', ee => {
              self.selectedMarker=feature.properties.markerIndex
          })
      },
  }
}

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
                    clr = 'text-primary'
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
                    self.selectedMarker=feature.properties.markerIndex
                });


                if (feature.properties.names[0].message) {
                    marker.bindTooltip(`<h6>${feature.properties.names[0].message}</h6>`)
                } else {
                    marker.bindTooltip('<h6>Click me!</h6>')
                };

                return marker;
            } else {
                self.basins.features.map(feat => {
                    console.log([feat.properties.basin, suffixes[0]]);
                    if ( feat.properties.basin==suffixes[0] ) {
                        feat.properties.markerIndex = feature.properties.markerIndex;
                    };
                });
                // TO BE REMOVED
                // return L.marker(latlng)
                // return feature;
                // const jsonpoly = self.basins.features.filter(feat => feat.properties.basin==suffixes[0])[0];
                // const poly = L.polygon(jsonpoly.geometry.coordinates, {
                //     weight: 1,
                //     fillOpacity: 0.7,
                //     color: 'blue',
                //     dashArray: '3'
                // });
                // return poly;
            };

        }
    }
}

export default {areaLayerOptions, markerLayerOptions};
