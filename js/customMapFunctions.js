var highlightLayer;
function highlightFeature(e) {
  highlightLayer = e.target;
  if (e.target.feature.geometry.type === 'LineString') {
    highlightLayer.setStyle({
      color: '#ffff00',
    });
  } else {
    highlightLayer.setStyle({
      fillColor: '#ffff00',
      fillOpacity: 1
    });
  }
  highlightLayer.openPopup();
}
L.ImageOverlay.include({
  getBounds: function() {
    return this._bounds;
  }
});

var map = L.map('map', {
  zoomControl: true,
  maxZoom: 28,
  minZoom: 1,
  inertia: true,
  inertiaDeceleration: 6000
}).fitBounds([
  [-23.6364774683, -46.4646890128],
  [-23.619802418, -46.4410211995]
]);
var basemap0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 28
});
var basemap1 = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
  maxZoom: 28
});
var aerialHybrid = L.layerGroup([
  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }),
  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.{ext}', {
  	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: 'abcd',
  	minZoom: 0,
  	maxZoom: 20,
  	ext: 'png'
  }),
  L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.{ext}', {
  	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	subdomains: 'abcd',
  	minZoom: 0,
  	maxZoom: 20,
  	ext: 'png'
  })
]);
basemap1.addTo(map);

var bounds_group = new L.featureGroup([]);

var sequentialSchemes = {
  1: ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'],
  2: ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'],
  3: ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'],
  4: ['#f6eff7', '#bdc9e1', '#67a9cf', '#1c9099', '#016c59'],
  5: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
  6: ['#ECF0F6', '#B2C2DB', '#6182B5', '#4E71A6', '#43618F'],
  7: ['#F2D2D3', '#EBB7B9', '#D4686C', '#CC4E52', '#C1373C']
};
var divergingSchemes = {
  1:['#a6611a','#dfc27d','#f5f5f5','#80cdc1','#018571'],
  2:['#ca0020','#f4a582','#f7f7f7','#92c5de','#0571b0'],
  3:['#d01c8b','#f1b6da','#f7f7f7','#b8e186','#4dac26'],
  4:['#d7191c','#fdae61','#ffffbf','#abd9e9','#2c7bb6'],
  5:['#e66101','#fdb863','#f7f7f7','#b2abd2','#5e3c99'],
  6:['#ca0020','#f4a582','#ffffff','#bababa','#404040'],
  7:['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba']
};
var qualitativeSchemes = {
  1: ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'],
  2: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f']
};
var toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

var toCurrency = function(num){
    // if()
    // console.log(num);
    // console.log(Number.isInteger(num));
    var txt = parseFloat(num).toFixed(2).toString();
    if (txt.length > 5){
        return '$' + parseFloat(num).toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    } else {
        return '$' + parseFloat(num).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

}

var toPercent = function(num){
    var a = parseFloat(num*100).toFixed(1);
    return a + "%";
}

var _valueConversion = function(label, value){
    // console.log(label);
    var tempLabel = _fullMetricLookup[label];
    //get metric text
    // console.log(tempLabel);
    // if contains   , "poverty rate,", "", "% of Total", , projected change
    if(tempLabel.indexOf("Growth") !== -1 || tempLabel.indexOf("Poverty Rate") !== -1 || tempLabel.indexOf("Percent:") !== -1 || tempLabel.indexOf("%") !== -1){
        //convert number depending on type
        if (value === 0 || value === null || value === ""){
            return "Insuff. Data"
        } else {
            return toPercent(value);
        }
    } else if (tempLabel.indexOf("Wage") !== -1 || tempLabel.indexOf("Earning") !== -1 || tempLabel.indexOf("Household Income") !== -1){
        if (value === 0 || value === null || value === ""){

            return "Insuff. Data"
        } else {
            return toCurrency(value);
        }
    } else {
        value = Math.floor(value);
        value = value.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,');
        return value;
    }
}

function pop_saofrancisco0729(feature, layer) {
  layer.on({
    mouseout: function(e) {
      layer.setStyle(style_saofrancisco0729_0(feature));

      if (typeof layer.closePopup == 'function') {
        layer.closePopup();
      } else {
        layer.eachLayer(function(feature) {
          feature.closePopup()
        });
      }
    },
    mouseover: highlightFeature,
  });
  var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['OBJECTID_1'] !== null ? Autolinker.link(String(feature.properties['OBJECTID_1'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['OBJECTID'] !== null ? Autolinker.link(String(feature.properties['OBJECTID'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Entity'] !== null ? Autolinker.link(String(feature.properties['Entity'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Handle'] !== null ? Autolinker.link(String(feature.properties['Handle'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['LABEL'] !== null ? Autolinker.link(String(feature.properties['LABEL'])) : '') + '</td>\
            </tr>\
        </table>';
  layer.bindPopup(popupContent);
}

function style_saofrancisco0729_0() {
  return {
    pane: 'pane_saofrancisco0729',
    opacity: 0.6,
    color: 'rgb(0,0,0)',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 1.0,
    fillOpacity: 0.6,
    fillColor: 'rgb(177,230,0)',
  }
}

function style_heliopolis0729_0() {
  return {
    pane: 'pane_heliopolis0729',
    opacity: 0.6,
    color: 'rgb(0,0,0)',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 1.0,
    fillOpacity: 0.6,
    fillColor: 'rgb(116,119,190)',
  }
}

map.createPane('pane_saofrancisco0729');
map.getPane('pane_saofrancisco0729').style.zIndex = 400;
map.getPane('pane_saofrancisco0729').style['mix-blend-mode'] = 'normal';
var layer_saofrancisco0729 = new L.geoJson(json_saofrancisco0729, {
  attribution: '<a href=""></a>',
  pane: 'pane_saofrancisco0729',
  onEachFeature: pop_saofrancisco0729,
  style: style_saofrancisco0729_0,
});
bounds_group.addLayer(layer_saofrancisco0729);
map.addLayer(layer_saofrancisco0729);

function pop_heliopolis0729(feature, layer) {
  layer.on({
    mouseout: function(e) {
      layer.setStyle(style_heliopolis0729_0(feature));

      if (typeof layer.closePopup == 'function') {
        layer.closePopup();
      } else {
        layer.eachLayer(function(feature) {
          feature.closePopup()
        });
      }
    },
    mouseover: highlightFeature,
  });
  var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['OBJECTID'] !== null ? Autolinker.link(String(feature.properties['OBJECTID'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Entity'] !== null ? Autolinker.link(String(feature.properties['Entity'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Handle'] !== null ? Autolinker.link(String(feature.properties['Handle'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Layer'] !== null ? Autolinker.link(String(feature.properties['Layer'])) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['LABEL'] !== null ? Autolinker.link(String(feature.properties['LABEL'])) : '') + '</td>\
            </tr>\
        </table>';
  layer.bindPopup(popupContent);
}

map.createPane('pane_heliopolis0729');
map.getPane('pane_heliopolis0729').style.zIndex = 401;
map.getPane('pane_heliopolis0729').style['mix-blend-mode'] = 'normal';
var layer_heliopolis0729 = new L.geoJson(json_heliopolis0729, {
  attribution: '<a href=""></a>',
  pane: 'pane_heliopolis0729',
  onEachFeature: pop_heliopolis0729,
  style: style_heliopolis0729_0,
});
bounds_group.addLayer(layer_heliopolis0729);
map.addLayer(layer_heliopolis0729);
map.attributionControl.addAttribution('<a target="_blank">N. Brigmon</a>');
L.control.locate().addTo(map);
var baseMaps = {
  'OSM': basemap0,
  'OSM B&W': basemap1,
  'Aerial Hybrid': aerialHybrid
};
L.control.layers(baseMaps, {
  '<img src="legend/heliopolis0729.png" /> Heliopolis ': layer_heliopolis0729,
  '<img src="legend/saofrancisco0729.png" /> Sao Francisco ': layer_saofrancisco0729,
}, {
  collapsed: false,
  position: 'bottomright'
}).addTo(map);

var measureControl = new L.Control.Measure({
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'hectares'
});
measureControl.addTo(map);
jQuery(document).ready(function($) {

    'use strict';
    $(".metric-selection").select2({
            placeholder: "Select a metric"
    });
    $(".site-selection").select2({
            placeholder: "Select a site",
            minimumResultsForSearch: Infinity
    });
    var $siteSelect2 = $(".site-selection");
    $siteSelect2.on("select2:select", function(e) {
      var siteSelect = e.params.data.element.attributes.value.value;
      if (siteSelect == 'Helio'){
        map.fitBounds(layer_heliopolis0729.getBounds());
      } else if (siteSelect == 'Sao'){
        map.fitBounds(layer_saofrancisco0729.getBounds());
      } else {}
    });

    var $metricSelect2 = $(".metric-selection");

    $metricSelect2.on("select2:select", function(e) {

      var metricSelect = e.params.data.element.attributes.value.value;
      console.log(metricSelect);
    });
});
