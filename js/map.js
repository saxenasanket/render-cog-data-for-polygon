/** Create a default map
 */

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj.js';
import popup from './overlay/popup';

// Clear map
$("#map").html('');

const map = new Map({
  target: 'map',
  overlays: [popup],
  view: new View({
    center: fromLonLat([0,30]),
    zoom: 4
  })
});

console.log('Create map:', map);

export default map