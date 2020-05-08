/** Add search control to the map
 */
//import Search from 'ol-ext/control/SearchNominatim'
import Search from 'ol-ext/control/SearchPhoton'
import map from '../map';

const lang = (navigator.language || navigator.userLanguage).split('-')[0] || 'en';
const search = new Search({ lang:lang, position: true });
map.addControl(search);

// Center on select
search.on('select', (e)=>{
  map.getView().animate({
    center: e.coordinate,
    zoom: Math.max(15, map.getView().getZoom())
  });
});

export default search