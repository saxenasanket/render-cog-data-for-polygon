/** Vector layer 
 * 
 */
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Format from 'ol/format/GeoJSON'

import map from './map'
import data from '../data/fond_guerre.geojson'

var vectorSource = new VectorSource({
  url: data,
  projection: 'EPSG:3857',
  format: new Format(),
  attributions: [ "&copy; <a href='https://www.data.gouv.fr/fr/datasets/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire/'>data.gouv.fr</a>" ],
  logo:"https://www.data.gouv.fr/s/avatars/37/e56718abd4465985ddde68b33be1ef.jpg" 
});

var vector = new VectorLayer({
  name: '1914-18',
  preview: "http://www.culture.gouv.fr/Wave/image/memoire/2445/sap40_z0004141_v.jpg",
  source: vectorSource
})

map.addLayer(vector);
  
export {vector}
