
import {watercolor} from '../layer/layers'
import dep from '../data/dep'

import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import Crop from 'ol-ext/filter/Crop'

const f = new Feature(new Polygon(dep.geometry.coordinates));
const crop = new Crop({ feature: f, inner:true });
watercolor.addFilter(crop);