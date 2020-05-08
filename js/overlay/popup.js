import 'ol-ext/overlay/Popup.css'
import './popup.css'
import Popup from 'ol-ext/overlay/Popup'

const popup = new Popup({
  popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
  closeBox: true,
  onshow: function(){ console.log("You open the box"); },
  onclose: function(){ console.log("You close the box"); },
  positioning: 'auto',
  autoPan: true,
  autoPanAnimation: { duration: 250 }
});

export default popup