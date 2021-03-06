/*
TODO
1. Min and Max should be text values like "More Educated" or "Leans Male"
2. Add labels ONTOP of layers (see http://leafletjs.com/examples/map-panes/example.html) z-index assistance
*/
jQuery(document).ready(function($) {
	///section for select2 dropdown components.
	'use strict';

	let heliolopilis_center = [-23.6151, -46.5892];
	let saofrancisco_center = [-23.6293, -46.4521];
	/* initializing map and base maps */
	var map = L.map('map1', {
		center: heliolopilis_center,
		zoom: 16,
		zoomControl: true,
		maxZoom: 28,
		minZoom: 1,
		inertia: true,
		inertiaDeceleration: 6000
	});

	/* initializing map and base maps */
	var map2 = L.map('map2', {
		center: saofrancisco_center,
		zoom: 16,
		zoomControl: true,
		maxZoom: 28,
		minZoom: 1,
		inertia: true,
		inertiaDeceleration: 6000
	});
	// var hash = new L.Hash(map); //add hashes to html address to easy share locations

	var basemap0 = L.tileLayer(
		'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
		{
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
			subdomains: 'abcd',
			maxZoom: 22
		}
	);
	var basemap_0 = L.tileLayer(
		'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
		{
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
			subdomains: 'abcd',
			maxZoom: 22
		}
	);
	var basemap1 = L.tileLayer(
		'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
		{
			maxZoom: 22,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}
	);
	var basemap_1 = L.tileLayer(
		'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
		{
			maxZoom: 22,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}
	);
	var aerialHybrid2 = L.layerGroup([
		L.tileLayer(
			'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			{
				attribution:
					'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}
		),
		L.tileLayer(
			'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.{ext}',
			{
				attribution:
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20,
				ext: 'png'
			}
		),
		L.tileLayer(
			'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.{ext}',
			{
				attribution:
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20,
				ext: 'png'
			}
		)
	]);
	var aerialHybrid_2 = L.layerGroup([
		L.tileLayer(
			'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			{
				attribution:
					'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
			}
		),
		L.tileLayer(
			'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.{ext}',
			{
				attribution:
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20,
				ext: 'png'
			}
		),
		L.tileLayer(
			'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.{ext}',
			{
				attribution:
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20,
				ext: 'png'
			}
		)
	]);
	let choice = 0;
	$('#base-map-selection').on('click', function() {
		// console.log('click', choice);
		if (choice === 0) {
			aerialHybrid2.remove();
			aerialHybrid_2.remove();
			basemap0.addTo(map);
			basemap_0.addTo(map2);
			choice++;
		} else if (choice === 1) {
			basemap0.remove();
			basemap_0.remove();
			basemap1.addTo(map);
			basemap_1.addTo(map2);
			choice++;
		} else {
			basemap1.remove();
			basemap_1.remove();
			aerialHybrid2.addTo(map);
			aerialHybrid_2.addTo(map2);
			choice = 0;
		}
		$('#background-slider').slider({ value: 1 });
	});
	$('#base-map-selection').trigger('click');

	// map.scrollWheelZoom.disable();	// map2.scrollWheelZoom.disable();	//	// map2.on('dblclick', function(ev) {	// 	map.setZoom(this.getZoom() + 1);	// 	map.setView(this.getCenter());	// });	// map.on('zoomend', function() {	// 	map2.setZoom(this.getZoom());	// 	map2.setView(this.getCenter());	// });	//	// map.on('dragend', function(ev) {	// 	map2.setZoom(this.getZoom());	// 	map2.setView(this.getCenter());	// });	// map2.on('dragend', function(ev) {	// 	map.setZoom(this.getZoom());	// 	map.setView(this.getCenter());	// });

	/* UTILITY FUNCTIONS*/
	var toTitleCase = function(str) {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	var toCurrency = function(num) {
		var txt = parseFloat(num)
			.toFixed(2)
			.toString();
		if (txt.length > 5) {
			return (
				'R$' +
				parseFloat(num)
					.toFixed(0)
					.toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
			);
		} else {
			return (
				'R$' +
				parseFloat(num)
					.toFixed(2)
					.toString()
					.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
			);
		}
	};

	var toPercent = function(num) {
		var a = parseFloat(num * 100).toFixed(1);
		return a + '%';
	};

	var _valueConversion = function(label, value) {
		// console.log(label);
		var tempLabel = _fullMetricLookup[label];
		//get metric text
		// if contains   , "poverty rate,", "", "% of Total", , projected change
		if (
			tempLabel.indexOf('Growth') !== -1 ||
			tempLabel.indexOf('Poverty Rate') !== -1 ||
			tempLabel.indexOf('Percent:') !== -1 ||
			tempLabel.indexOf('%') !== -1
		) {
			//convert number depending on type
			if (value === 0 || value === null || value === '') {
				return 'Insuff. Data';
			} else {
				return toPercent(value);
			}
		} else if (
			tempLabel.indexOf('Wage') !== -1 ||
			tempLabel.indexOf('Earning') !== -1 ||
			tempLabel.indexOf('Household Income') !== -1
		) {
			if (value === 0 || value === null || value === '') {
				return 'Insuff. Data';
			} else {
				return toCurrency(value);
			}
		} else {
			value = Math.floor(value);
			value = value.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,');
			return value;
		}
	};

	function highlightFeature(e) {
		var highlightLayer = e.target;
		highlightLayer.openPopup();
	}

	L.ImageOverlay.include({
		getBounds: function() {
			return this._bounds;
		}
	});

	function basic_popup(feature, layer) {
		layer.on({
			// mouseout: function(e) {
			// 	// layer.setStyle(initial_style(feature));
			//
			// 	if (typeof layer.closePopup == 'function') {
			// 		layer.closePopup();
			// 	} else {
			// 		layer.eachLayer(function(feature) {
			// 			feature.closePopup();
			// 		});
			// 	}
			// },
			// mouseover: highlightFeature
			click: highlightFeature
		});

		var popupContent =
			'<p><b>LOCATION: </b>' + feature.properties['LABEL'] + '</p>';
		layer.bindPopup(popupContent);
	}
	function initial_style() {
		return {
			opacity: 0.6,
			color: 'rgb(0,0,0)',
			dashArray: '',
			lineCap: 'butt',
			lineJoin: 'miter',
			weight: 1.0,
			fillOpacity: 0.6,
			fillColor: '#333333'
		};
	}

	function myFillOpacity(x) {
		if (x === null) {
			return 0.2;
		} else {
			return 0.8;
		}
	}

	var map1LayerGroup = {};
	var map2LayerGroup = {};

	let dist_shapes = ['helio_di', 'sao_di'];
	let blck_shapes = ['helio_bl', 'sao_bl'];
	let _key1, _key2;
	map.createPane('pane_heliopolis_di');
	map.getPane('pane_heliopolis_di').style.zIndex = 400;
	map.getPane('pane_heliopolis_di').style['mix-blend-mode'] = 'normal';
	map1LayerGroup.helio_di = new L.geoJson(json_heliopolisdistrict, {
		// attribution: '<a href=""></a>',
		pane: 'pane_heliopolis_di',
		onEachFeature: basic_popup,
		style: initial_style
	});
	// map.addLayer(layer_saofrancisco0729);

	map.createPane('pane_heliopolis0729');
	map.getPane('pane_heliopolis0729').style.zIndex = 401;
	map.getPane('pane_heliopolis0729').style['mix-blend-mode'] = 'normal';
	// var layer_heliopolis0729 = new L.geoJson(json_heliopolis0729, {
	map1LayerGroup.helio_bl = new L.geoJson(json_heliopolis0729, {
		// attribution: '<a href=""></a>',
		pane: 'pane_heliopolis0729',
		onEachFeature: basic_popup,
		style: initial_style
	});
	_key1 = dist_shapes[0];
	map.addLayer(map1LayerGroup[_key1]);

	map2.createPane('pane_saofrancisco0729');
	map2.getPane('pane_saofrancisco0729').style.zIndex = 400;
	map2.getPane('pane_saofrancisco0729').style['mix-blend-mode'] = 'normal';
	// var layer_saofrancisco0729 = new L.geoJson(json_saofrancisco0729, {
	map2LayerGroup.sao_bl = new L.geoJson(json_saofrancisco0729, {
		// attribution: '<a href=""></a>',
		pane: 'pane_saofrancisco0729',
		onEachFeature: basic_popup,
		style: initial_style
	});

	map2.createPane('pane_saofrancisco_di');
	map2.getPane('pane_saofrancisco_di').style.zIndex = 400;
	map2.getPane('pane_saofrancisco_di').style['mix-blend-mode'] = 'normal';
	map2LayerGroup.sao_di = new L.geoJson(json_saofranciscodistrict, {
		// attribution: '<a href=""></a>',
		pane: 'pane_saofrancisco_di',
		onEachFeature: basic_popup,
		style: initial_style
	});
	_key2 = dist_shapes[1];
	map2.addLayer(map2LayerGroup[_key2]);

	$('.site-selection').select2({
		placeholder: 'Districts',
		minimumResultsForSearch: Infinity
	});
	var $siteSelect2 = $('.site-selection');
	let shape_type = 'districts';
	$siteSelect2.on('select2:select', function(e) {
		if (shape_type == e.params.data.element.attributes.value.value) {
			return;
		}
		shape_type = e.params.data.element.attributes.value.value;

		map.removeLayer(map1LayerGroup[_key1]);
		map2.removeLayer(map2LayerGroup[_key2]);
		if (shape_type == 'districts') {
			_key1 = dist_shapes[0];
			_key2 = dist_shapes[1];
			//map1 adjustment
			// map.fitBounds(map1LayerGroup[_key1].getBounds());
			map.addLayer(map1LayerGroup[_key1]);
			//map2 adjustment
			// map2.fitBounds(map2LayerGroup[_key2].getBounds());
			map2.addLayer(map2LayerGroup[_key2]);
		} else {
			_key1 = blck_shapes[0];
			_key2 = blck_shapes[1];
			//map1 adjustment
			// map.fitBounds(map1LayerGroup[_key1].getBounds());
			map.addLayer(map1LayerGroup[_key1]);
			//map2 adjustment
			// map2.fitBounds(map2LayerGroup[_key2].getBounds());
			map2.addLayer(map2LayerGroup[_key2]);
		}

		//reset the metric selection
		$('.metric-selection')
			.val(null)
			.trigger('change');
	});

	$('.metric-selection').select2({
		placeholder: 'Select a metric'
	});
	var $metricSelect2 = $('.metric-selection');
	$metricSelect2.on('select2:select', function(e) {
		//qual, sequential or diverging
		var metricType = e.params.data.element.attributes.value.value;
		//label='C1568'
		var columnLookup = e.params.data.element.attributes.label.value.trim();
		//> Gender - Male <
		var selection = e.params.data.text;
		//reset pallette
		var chosenPallete;

		if (metricType == 'qual') {
			//qualititative style
			chosenPallete = qualitativeSchemes[Math.floor(Math.random() * 2) + 1];

			////perform visualization for map1
			map1LayerGroup[_key1].eachLayer(function(layer) {
				layer.setStyle({
					fillColor: myQualColor(layer.feature.properties[columnLookup]),
					fillOpacity: myFillOpacity(layer.feature.properties[columnLookup])
				});

				function myQualColor(x) {
					if (x) {
						return chosenPallete[x % chosenPallete.length];
					} else {
						return '#999999';
					}
				}
				var qualFeature = parseInt(layer.feature.properties[columnLookup]);
				// console.log(qualFeature);
				var customPopUp =
					'<p><b>LOCATION: </b>' +
					layer.feature.properties['LABEL'].toUpperCase() +
					'</p>' +
					'<p><b>' +
					selection +
					': </b>' +
					fullColorLookup[columnLookup][qualFeature] +
					'</p>';
				layer.bindPopup(customPopUp);
				// console.log(layer.feature.properties['LABEL']);
				// layer.on({
				// 	mouseout: function(e) {
				// 		if (typeof layer.closePopup == 'function') {
				// 			layer.closePopup();
				// 		} else {
				// 			layer.eachLayer(function(feature) {
				// 				feature.closePopup();
				// 			});
				// 		}
				// 	}
				// });
			});
			////perform visualization for map2
			map2LayerGroup[_key2].eachLayer(function(layer) {
				layer.setStyle({
					fillColor: myQualColor(layer.feature.properties[columnLookup]),
					fillOpacity: myFillOpacity(layer.feature.properties[columnLookup])
				});

				function myQualColor(x) {
					if (x) {
						return chosenPallete[x % chosenPallete.length];
					} else {
						return '#999999';
					}
				}
				var qualFeature = parseInt(layer.feature.properties[columnLookup]);
				// console.log(qualFeature);
				var customPopUp =
					'<p><b>LOCATION: </b>' +
					layer.feature.properties['LABEL'].toUpperCase() +
					'</p>' +
					'<p><b>' +
					selection +
					': </b>' +
					fullColorLookup[columnLookup][qualFeature] +
					'</p>';
				layer.bindPopup(customPopUp);
				// console.log(layer.feature.properties['LABEL']);
				// layer.on({
				// 	mouseout: function(e) {
				// 		if (typeof layer.closePopup == 'function') {
				// 			layer.closePopup();
				// 		} else {
				// 			layer.eachLayer(function(feature) {
				// 				feature.closePopup();
				// 			});
				// 		}
				// 	}
				// });
			});
			//qualitative legend template
			//updateLegend
			$('#feature-info').show();
			$('#attribute-legend-area').show();
			$('#color-range').show();
			$('#color-range li.max').html('');
			$('#color-range li.min').html(
				'Qualitative scheme: examine feature to view data'
			);
			$('#selected_column_title').html(selection);
			$('div.colors div').each(function(index, elem) {
				// console.log(index);
				$(elem).css('background-color', chosenPallete[index]);
			});
		} else {
			//max='616'
			var columnMax = parseFloat(
				e.params.data.element.attributes.max.value
			).toFixed(2);
			//min='184'
			var columnMin = parseFloat(
				e.params.data.element.attributes.min.value
			).toFixed(2);
			//breaks='4,8,27,65'
			var columnBreaks = e.params.data.element.attributes.breaks.value;
			//legend support
			var legendCue = e.params.data.element.attributes.legend.value;

			if (columnLookup == 'Q40' || columnLookup == 'Q205_1') {
				columnMax = toCurrency(columnMax);
				columnMin = toCurrency(columnMin);
			}
			//get values, break into an array of numbers and cleanup a touch
			columnBreaks = columnBreaks.split(',').map(function(elem, index) {
				return parseFloat(Math.round(elem * 100) / 100).toFixed(5);
			});
			//text and value conversions
			var textDisplay;
			if (metricType == 'diver') {
				chosenPallete = divergingSchemes[Math.floor(Math.random() * 7) + 1];
			} else {
				chosenPallete = sequentialSchemes[Math.floor(Math.random() * 7) + 1];
			}
			////perform visualization for map1
			map1LayerGroup[_key1].eachLayer(function(layer) {
				layer.setStyle({
					fillColor: myFillColor(layer.feature.properties[columnLookup]),
					fillOpacity: myFillOpacity(layer.feature.properties[columnLookup])
				});

				function myFillColor(x) {
					if (x === null) {
						return '#999999';
					} else {
						if (metricType == 'diver') {
							return x >= columnMax
								? chosenPallete[4]
								: x >= columnBreaks[3]
									? chosenPallete[3]
									: x >= columnBreaks[2]
										? chosenPallete[2]
										: x >= columnBreaks[1]
											? chosenPallete[1]
											: chosenPallete[0];
						} else {
							return x > columnBreaks[3]
								? chosenPallete[4]
								: x > columnBreaks[2]
									? chosenPallete[3]
									: x > columnBreaks[1]
										? chosenPallete[2]
										: x > columnBreaks[0] ? chosenPallete[1] : chosenPallete[0];
						}
					}
				}
				if (columnLookup == 'Q40' || columnLookup == 'Q205_1') {
					textDisplay = toCurrency(layer.feature.properties[columnLookup]);
				} else {
					if (layer.feature.properties[columnLookup]) {
						textDisplay = parseFloat(
							layer.feature.properties[columnLookup]
						).toFixed(2);
					} else {
						textDisplay = layer.feature.properties[columnLookup];
					}
				}
				var customPopUp =
					'<p><b>LOCATION: </b>' +
					layer.feature.properties['LABEL'].toUpperCase() +
					'</p>' +
					'<p><b>' +
					selection +
					': </b>' +
					textDisplay +
					'</p>';
				layer.bindPopup(customPopUp);
				// console.log(layer.feature.properties['LABEL']);
				// layer.on({
				// 	mouseout: function(e) {
				// 		if (typeof layer.closePopup == 'function') {
				// 			layer.closePopup();
				// 		} else {
				// 			layer.eachLayer(function(feature) {
				// 				feature.closePopup();
				// 			});
				// 		}
				// 	}
				// });
			});

			//perform visualization for map2
			map2LayerGroup[_key2].eachLayer(function(layer) {
				layer.setStyle({
					fillColor: myFillColor(layer.feature.properties[columnLookup]),
					fillOpacity: myFillOpacity(layer.feature.properties[columnLookup])
				});

				function myFillColor(x) {
					if (x === null) {
						return '#999999';
					} else {
						if (metricType == 'diver') {
							return x >= columnMax
								? chosenPallete[4]
								: x >= columnBreaks[3]
									? chosenPallete[3]
									: x >= columnBreaks[2]
										? chosenPallete[2]
										: x >= columnBreaks[1]
											? chosenPallete[1]
											: chosenPallete[0];
						} else {
							return x > columnBreaks[3]
								? chosenPallete[4]
								: x > columnBreaks[2]
									? chosenPallete[3]
									: x > columnBreaks[1]
										? chosenPallete[2]
										: x > columnBreaks[0] ? chosenPallete[1] : chosenPallete[0];
						}
					}
				}
				if (columnLookup == 'Q40' || columnLookup == 'Q205_1') {
					textDisplay = toCurrency(layer.feature.properties[columnLookup]);
				} else {
					if (layer.feature.properties[columnLookup]) {
						textDisplay = parseFloat(
							layer.feature.properties[columnLookup]
						).toFixed(2);
					} else {
						textDisplay = layer.feature.properties[columnLookup];
					}
				}
				var customPopUp =
					'<p><b>LOCATION: </b>' +
					layer.feature.properties['LABEL'].toUpperCase() +
					'</p>' +
					'<p><b>' +
					selection +
					': </b>' +
					textDisplay +
					'</p>';
				layer.bindPopup(customPopUp);
				// console.log(layer.feature.properties['LABEL']);
				// layer.on({
				// 	mouseout: function(e) {
				// 		if (typeof layer.closePopup == 'function') {
				// 			layer.closePopup();
				// 		} else {
				// 			layer.eachLayer(function(feature) {
				// 				feature.closePopup();
				// 			});
				// 		}
				// 	}
				// });
			});

			function legendHelper(cue) {
				return legendLookup[cue];
			}
			//updateLegend
			$('#feature-info').show();
			$('#attribute-legend-area').show();
			$('#color-range').show();
			if (legendCue == 'none') {
				$('#color-range li.max').html(
					legendHelper(legendCue)[1] + ' ' + columnMax
				);
				$('#color-range li.min').html(
					legendHelper(legendCue)[0] + ' ' + columnMin
				);
			} else {
				$('#color-range li.max').html(legendHelper(legendCue)[1]);
				$('#color-range li.min').html(legendHelper(legendCue)[0]);
			}
			$('#selected_column_title').html(selection);
			$('div.colors div').each(function(index, elem) {
				// console.log(index);
				$(elem).css('background-color', chosenPallete[index]);
			});
		}
	});

	$('#background-slider').slider({
		value: 1,
		min: 0,
		max: 1,
		step: 0.2,
		slide: function(event, ui) {
			//oggle the opacity of the base map with this slide
			$(
				'div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-tile-pane > div'
			).css('opacity', ui.value);
		}
	});
}); //end of jQuery closure

var fullColorLookup = {
	Q3: {
		1: 'Autoconstrução',
		2: 'Mutirão',
		3: 'Cingapura',
		4: 'Urbanization of Favelas'
	},
	Q10: {
		1: 'Original owner',
		2: 'Son, daughter, wife of original owner',
		3: 'Extended family of original owner',
		4: 'Purchased from original owner',
		5: 'Rent from the original owner',
		6: 'Rent from a secondary owner',
		7: 'Exchanged houses',
		8: 'Son, daughter, wife of secondary owner',
		9: 'Purchased from secondary owner',
		10: 'Relative of secondary owner',
		11: 'Purchased the land and constructed home',
		12: 'Purchased from family member',
		13: 'Live for free - secondary owner',
		14: 'Resettlement via local government',
		15: 'Rental assistance via local government'
	},
	Q33: {
		0: 'Unemployed',
		1: 'Employed',
		2: 'Retired',
		3: 'Student',
		4: 'Housewife',
		5: 'Works out of the home',
		6: 'Does not work / never worked',
		7: 'Other',
		8: 'Bico / Informal Economy',
		9: 'Lives on a pension'
	},
	Q179_1: {
		0: 'No participation',
		1: 'Self-builder',
		2: 'Family member constructed home',
		3: 'Contracted a builder',
		4: 'Worked with a builder'
	},
	Q1_3: {
		1: 'H - Gleba K',
		2: 'H - Heliopolis',
		3: 'H - Piloes',
		4: 'H - Provisao',
		5: 'H - Gleba H',
		6: 'H - Janio Quadras',
		7: 'H - Petrobras',
		8: 'H - Portuguesa',
		9: 'H - PAM',
		10: 'H - 120',
		11: 'H - Lagoa',
		12: 'H - Copa Rio',
		13: 'H - Mina',
		14: 'H - Mina 2',
		15: 'H - Redondinha',
		16: 'H - Erundina',
		17: 'H - Cingapuras',
		18: 'SF - Promorar Rio Claro',
		19: 'SF - Nucleo 1A',
		20: 'SF - Nucleo A',
		21: 'SF - Nucleo B',
		22: 'SF - Nucleo 5B',
		23: 'SF - Nucleo C',
		24: 'SF - Nucleo E',
		25: 'SF - Nucleo F',
		26: 'SF - Prover 1',
		27: 'SF - Provisao 1',
		28: 'SF - Prover 2',
		29: 'SF - Provisao 2',
		30: 'SF - Prover 3',
		31: 'SF - Provisao 3',
		32: 'SF - Prover 4',
		33: 'SF - Provisao 4',
		34: 'SF - Prover 5',
		35: 'SF - Provisao 5',
		36: 'SF - Prover 6',
		37: 'SF - Provisao 6',
		38: 'SF - Prover 7'
	}
};
var legendLookup = {
	none: ['Min:', 'Max:'],
	gender: ['Female (1)', 'Male (2)'],
	affirm: ['No (0)', 'Yes (1)'],
	edu: ['Low (0)', 'High (4)'],
	commute: ['Less than 15 min.(1)', 'More than 60 min.(4)'],
	duration: ['0 Months (1)', '12+ Months (3)'],
	secureA: ['Low (0)', 'High (1)'],
	secureB: ['Low (0)', 'High (2)'],
	superf: ['Superficial (1)', 'Expansive (2)']
};
//*   color schemes  *//
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
	1: ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'],
	2: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
	3: ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4dac26'],
	4: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
	5: ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'],
	6: ['#ca0020', '#f4a582', '#ffffff', '#bababa', '#404040'],
	7: ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba']
};
var qualitativeSchemes = {
	1: [
		'#a6cee3',
		'#1f78b4',
		'#b2df8a',
		'#33a02c',
		'#fb9a99',
		'#e31a1c',
		'#fdbf6f',
		'#ff7f00',
		'#cab2d6',
		'#6a3d9a',
		'#ffff99',
		'#b15928'
	],
	2: [
		'#8dd3c7',
		'#ffffb3',
		'#bebada',
		'#fb8072',
		'#80b1d3',
		'#fdb462',
		'#b3de69',
		'#fccde5',
		'#d9d9d9',
		'#bc80bd',
		'#ccebc5',
		'#ffed6f'
	]
};
