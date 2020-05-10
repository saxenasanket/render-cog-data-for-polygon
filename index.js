import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/vector';
import XYZ from 'ol/source/xyz';
import {transformExtent} from 'ol/proj'; //is this the right way to pull this in? Or should it just be a single class?
import sync from 'ol-hashed';
import hashed from 'hashed';
import { getJSON } from 'jquery';
import validUrl from 'valid-url';
import sourceVector from 'ol/source/vector';
import Fill from 'ol/style/Fill';
import Draw from 'ol/interaction/Draw';
import OSM from 'ol/source/OSM';
import TileDebug from 'ol/source/TileDebug';

import Polygon from 'ol/geom/polygon';
import Feature from 'ol/feature';
import Mask from 'ol-ext/filter/Mask';
import Crop from 'ol-ext/filter/Crop';


var global_url='';

var labels = new TileLayer({
  title: 'Labels',
  source: new XYZ({
    url: 'https://{1-4}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png',
    attributions: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, ' + 
    '© <a href="https://carto.com/attribution">CARTO</a>',
  })
});

var mapLayer=new TileLayer({
  source: new XYZ({
    url: 'https://{1-4}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
  })
});

var debugLayer=new TileLayer({
  source: new TileDebug()
});

var osm = new TileLayer({ source: new OSM() });

var source = new sourceVector({wrapX: false});

var polygonLayer = new VectorLayer({
  source: source
});

const map = new Map({
  target: 'map',
  layers: [
    osm,
    debugLayer,
    //labels,
    //polygonLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

source.on('addfeature', function(evt){
  var feature = evt.feature;
  var polygon=feature.getGeometry();
  var coords = feature.getGeometry().getCoordinates();
  loadTiles(polygon,feature);
  console.log("coords",coords)
});

var draw; 
function addInteraction() {
  var value = 'Polygon';
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: 'Polygon'
    });
    draw.on('drawend',function (e) {
      var currentFeature = e.feature;//this is the feature fired the event
      var restOfFeats = source.getFeatures();//rest of feats
      var allFeats = restOfFeats.concat(currentFeature);//concatenate the event feat to the array of source feats
      console.log(e.feature);
      });
    map.addInteraction(draw);
  }
}

function onClick(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
}

function loadTiles(polygon,ftr){

  if(global_url!=''){

    var url = encodeURIComponent(global_url)
    var tilesUrl = createTilesUrl(url);

    var cog=new XYZ({
      url: tilesUrl
    });

    var cogLayer = new TileLayer({
      source: cog
    });
    
    var defaultUrlFunction = cog.getTileUrlFunction();
    cog.setTileUrlFunction( function(tileCoord, pixelRatio, projection) {
      var condition=polygon.intersectsExtent(this.getTileGrid().getTileCoordExtent(tileCoord));
      if (condition) {
          return defaultUrlFunction(tileCoord, pixelRatio, projection);
      } 
    });

    var layers = map.getLayers();
    //layers.removeAt(2); //remove the previous COG map, so we're not loading extra tiles as we move around.
    map.addLayer(cogLayer);
    //map.addLayer(polygonLayer)

    var mask = new Mask({ feature: ftr, inner:false});
    var crop = new Crop({ feature: ftr, inner:false ,fill: new Fill({ color:[0,0,0,0] })});

    function setFilter(){
      cogLayer.addFilter(crop);
      crop.set('active', true);
    }

    setFilter();
    update({
      url: name
    });
  }

}

function zoomLoad(name) {
  if (ValidURL(name)) {
    var url = encodeURIComponent(name)
    var boundsUrl = "https://tiles.rdnt.io/bounds?url=" + url;
    getJSON(boundsUrl, function(result) {
      var extent = transformExtent(result.bounds, 'EPSG:4326', 'EPSG:3857');
      map.getView().fit(extent, map.getSize());
    }).fail(function(jqXHR, textStatus, errorThrown) {
      alert("Request failed. Are you sure '" + name + "' is a valid COG?  ");
    });
  }
}

/* 
 * This creates the tiles URL. Change here to use another lambda server, or change the default params.
 */
 function createTilesUrl(url) {
  return  "https://tiles.rdnt.io/tiles/{z}/{x}/{y}?url=" + url;
}

//TODO: Add labels back in. Need a nice button for them, and also need to get them to overlay on the map.
// onClick('labels', function() {
//   labels.setVisible(document.getElementById("labels").checked);
// })

onClick('sample-1', function() {
  var planetUrl = "https://tiffstore.s3-ap-southeast-2.amazonaws.com/ndvikt_cog.tif"
 // document.getElementById("cog-url").value = planetUrl;
  global_url=planetUrl;
  zoomLoad(planetUrl);
});

onClick('sample-2', function() {
  var oamUrl = "https://tiffstore.s3-ap-southeast-2.amazonaws.com/ndvi_pz_cog.tif"
  //document.getElementById("cog-url").value = oamUrl;
  global_url=oamUrl;
  zoomLoad(oamUrl);
});

onClick('sample-3', function() {
  var oamUrl = "http://oin-hotosm.s3.amazonaws.com/59c66c5223c8440011d7b1e4/0/7ad397c0-bba2-4f98-a08a-931ec3a6e943.tif"
  //.getElementById("cog-url").value = oamUrl;
  global_url=oamUrl;
  zoomLoad(oamUrl);
});

onClick('sample-4', function() {
  var oamUrl = "https://tiffstore.s3-ap-southeast-2.amazonaws.com/sdd.tif"
  //.getElementById("cog-url").value = oamUrl;
  global_url=oamUrl;
  zoomLoad(oamUrl);
});

onClick('submit-url', function(event) {
  event.preventDefault();
  var name = document.getElementById("cog-url").value;
  console.log("submitted url" + name);
  global_url=name;
  zoomLoad(name);
})

onClick('draw-button',function(event) {
  addInteraction();
})


function toggleControl(element) {
  console.log("called" + element)
  labels.setVisible(element.checked);
}

var state = {
  url: {
    default: "",
    deserialize: function (url) {
      return decodeURIComponent(url)
    },
    serialize: function (url) {
      return encodeURIComponent(url)
    }
  }
};

function listener(newState) {

  if ('url' in newState) {

    //TODO: refactor in to common method with the submit, so we don't duplicate code
    var tilesUrl = createTilesUrl(encodeURIComponent(newState.url));
    var cogLayer = new TileLayer({
      type: 'base',
      source: new XYZ({
        url: tilesUrl
      })
    });

    map.addLayer(cogLayer);
    document.getElementById("cog-url").value = newState.url;
  }
}

function ValidURL(str) {
  if (!validUrl.isUri(str)) {
    alert("'" + str + "' is not a valid URL. Did you forget to include http://? ");
    return false;
  } else {
    return true;
  }
}

// register a state provider
var update = hashed.register(state, listener);

// persist center and zoom in the URL hash
sync(map);

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("about");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
