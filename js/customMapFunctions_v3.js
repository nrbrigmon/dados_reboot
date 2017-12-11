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
		$('#background-slider').slider({
			value: 1
		});
	});
	$('#base-map-selection').trigger('click');

	function highlightFeature(e) {
		var highlightLayer = e.target;
		highlightLayer.openPopup();
	}

	L.ImageOverlay.include({
		getBounds: function() {
			return this._bounds;
		}
	});

	function popupLocation(label) {
		return (
			'<p><b>LOCATION: </b>' + toTitleCase(label.substr(2, 20)) + '</p>'
		);
	}

	function basic_popup(feature, layer) {
		layer.on({
			click: highlightFeature
		});

		var popupContent = popupLocation(feature.properties['LABEL']);
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
	map1LayerGroup.helio_di = new L.geoJson(json_heliopolis_dsts, {
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
	map1LayerGroup.helio_bl = new L.geoJson(json_heliopolis_blcks, {
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
	map2LayerGroup.sao_bl = new L.geoJson(json_saofrancisco_blcks, {
		// attribution: '<a href=""></a>',
		pane: 'pane_saofrancisco0729',
		onEachFeature: basic_popup,
		style: initial_style
	});

	map2.createPane('pane_saofrancisco_di');
	map2.getPane('pane_saofrancisco_di').style.zIndex = 400;
	map2.getPane('pane_saofrancisco_di').style['mix-blend-mode'] = 'normal';
	map2LayerGroup.sao_di = new L.geoJson(json_saofrancisco_dsts, {
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
			return; //shape is already selected
		}
		shape_type = e.params.data.element.attributes.value.value;

		map.removeLayer(map1LayerGroup[_key1]);
		map2.removeLayer(map2LayerGroup[_key2]);
		if (shape_type == 'districts') {
			_key1 = dist_shapes[0];
			_key2 = dist_shapes[1];
			//map1 adjustment
			map.addLayer(map1LayerGroup[_key1]);
			//map2 adjustment
			map2.addLayer(map2LayerGroup[_key2]);
		} else {
			_key1 = blck_shapes[0];
			_key2 = blck_shapes[1];
			//map1 adjustment
			map.addLayer(map1LayerGroup[_key1]);
			//map2 adjustment
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
		//max='616'
		var columnMax = e.params.data.element.attributes.max.value;
		//min='184'
		var columnMin = e.params.data.element.attributes.min.value;
		//breaks='4,8,27,65'
		var columnBreaks = e.params.data.element.attributes.breaks.value;
		//legend support
		// var legendCue = e.params.data.element.attributes.legend.value;

		//get values, break into an array of numbers and cleanup a touch
		columnBreaks = columnBreaks.split(',').map(function(elem, index) {
			return parseFloat(Math.round(elem * 100) / 100).toFixed(5);
		});
		//text and value conversions
		var textDisplay, chosenPallete;
		if (metricType == 'diver') {
			chosenPallete = divergingSchemes[Math.floor(Math.random() * 7) + 1];
		} else {
			chosenPallete =
				sequentialSchemes[Math.floor(Math.random() * 7) + 1];
		}
		////perform visualization for map1
		map1LayerGroup[_key1].eachLayer(function(layer) {
			let layerVal = Number(layer.feature.properties[columnLookup]);
			layer.setStyle({
				fillColor: myFillColor(layerVal),
				fillOpacity: myFillOpacity(layerVal)
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
									: x > columnBreaks[0]
										? chosenPallete[1]
										: chosenPallete[0];
					}
				}
			}

			if (columnLookup === 'INCOME') {
				textDisplay = toCurrency(
					layer.feature.properties[columnLookup]
				);
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
				popupLocation(layer.feature.properties['LABEL']) +
				'<p><b>' +
				selection +
				': </b>' +
				textDisplay +
				'</p>';
			layer.bindPopup(customPopUp);
		});

		//perform visualization for map2
		map2LayerGroup[_key2].eachLayer(function(layer) {
			let layerVal = Number(layer.feature.properties[columnLookup]);
			layer.setStyle({
				fillColor: myFillColor(layerVal),
				fillOpacity: myFillOpacity(layerVal)
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
									: x > columnBreaks[0]
										? chosenPallete[1]
										: chosenPallete[0];
					}
				}
			}
			if (columnLookup == 'Q40' || columnLookup == 'Q205_1') {
				textDisplay = toCurrency(
					layer.feature.properties[columnLookup]
				);
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
				popupLocation(layer.feature.properties['LABEL']) +
				'<p><b>' +
				selection +
				': </b>' +
				textDisplay +
				'</p>';
			layer.bindPopup(customPopUp);
		});

		function legendHelper(cue) {
			return legendLookup[cue];
		}
		//updateLegend
		$('#feature-info').show();
		$('#attribute-legend-area').show();

		$('#color-range').show();

		$('#selected_column_title').html(selection);
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
