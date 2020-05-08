import Permalink from 'ol-ext/control/Permalink'
import map from '../map';

const permalink = new Permalink();
map.addControl(permalink);

export default permalink;