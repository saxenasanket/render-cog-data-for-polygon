/** Add layers to the map
 */

import map from '../map';
import TileLayer from 'ol/layer/Tile.js';
import Stamen from 'ol/source/Stamen.js';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group'


/* Stamen layers */
const watercolor = new TileLayer({
  title: 'Stamen-WaterColor',
  source: new Stamen({
    layer: 'watercolor'
  })
});

const labels = new TileLayer({
  title: 'Stamen-Labels',
  source: new Stamen({
    layer: 'terrain-labels'
  })
});
const stamen = new LayerGroup({ title: 'Stamen', layers: [watercolor, labels]});

/* OSM layer */
const osm = new TileLayer({
    title: 'OSM',
    source: new OSM()
});

/* Add to map */
map.addLayer(osm);
map.addLayer(stamen);

export {osm, stamen, labels, watercolor}
