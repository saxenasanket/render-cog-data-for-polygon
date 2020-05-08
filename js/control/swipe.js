/** Swipe control
 * Add a swipe control to the map
 */
import map from '../map'
import {osm, stamen, watercolor, labels} from '../layer/layers'
import './swipe.css'

import Swipe from 'ol-ext/control/Swipe'

const swipe = new Swipe();

swipe.addLayer(osm,true);
swipe.addLayer(watercolor);
swipe.addLayer(labels);
map.addControl(swipe);
