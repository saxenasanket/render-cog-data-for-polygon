import Select from 'ol/interaction/Select'
import 'ol-ext/overlay/Popup.css'

import vectoLayer from '../fonddeguerre'
import map from '../map'
import popup from '../overlay/popup'

const select = new Select();

select.on('select', (e) => {
  const feature = e.selected[0];
  if (feature) {
    var content = "";
		content += "<img src='"+feature.get("img")+"'/>";
		content += feature.get("text");
		popup.show(feature.getGeometry().getFirstCoordinate(), content); 
  } else {
    popup.hide();
  }
});
map.addInteraction(select);

export default select