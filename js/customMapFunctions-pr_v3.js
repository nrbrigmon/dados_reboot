var metricType,
	columnLookup,
	selection,
	columnMax,
	columnMin,
	columnBreaks,
	textDisplay,
	chosenPallete;
jQuery(document).ready(function($) {
	///section for select2 dropdown components.
	'use strict';

	let heliolopilis_center = [-23.6135, -46.59];
	let saofrancisco_center = [-23.6321, -46.453];
	/* initializing map and base maps */
	var map = L.map('map1', {
		center: heliolopilis_center,
		zoom: 15,
		zoomControl: true,
		maxZoom: 20,
		minZoom: 2,
		inertia: true,
		inertiaDeceleration: 6000
	});

	/* initializing map and base maps */
	var map2 = L.map('map2', {
		center: saofrancisco_center,
		zoom: 15,
		zoomControl: true,
		maxZoom: 20,
		minZoom: 2,
		inertia: true,
		inertiaDeceleration: 6000
	});
	// var hash = new L.Hash(map2); //add hashes to html address to easy share locations

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

	let shape_type = 'districts';
	$('.site-selection').select2({
		placeholder: 'Distritos',
		minimumResultsForSearch: Infinity
	});

	var $siteSelect2 = $('.site-selection');
	$siteSelect2.on('select2:select', function(e) {
		if (shape_type == e.params.data.element.attributes.value.value) {
			return; //shape is already selected
		}
		shape_type = e.params.data.element.attributes.value.value;

		map.removeLayer(map1LayerGroup[_key1]);
		map2.removeLayer(map2LayerGroup[_key2]);
		$('#description-legend').hide();
		if (shape_type == 'districts') {
			$('#block-dropdown').hide();
			$('#district-dropdown').show();
			_key1 = dist_shapes[0];
			_key2 = dist_shapes[1];
			//map1 adjustment
			map.addLayer(map1LayerGroup[_key1]);
			//map2 adjustment
			map2.addLayer(map2LayerGroup[_key2]);
		} else {
			$('#district-dropdown').hide();
			$('#block-dropdown').show();
			_key1 = blck_shapes[0];
			_key2 = blck_shapes[1];
			//map1 adjustment
			map.addLayer(map1LayerGroup[_key1]);
			//map2 adjustment
			map2.addLayer(map2LayerGroup[_key2]);
		}

		//reset the metric selection
		$('.metric-selection1, .metric-selection2')
			.val(null)
			.trigger('change');
	});

	$('.metric-selection1, .metric-selection2').select2({
		placeholder: 'Selecione uma métrica'
	});
	var $metricSelect2 = $('.metric-selection1, .metric-selection2');
	$metricSelect2.on('select2:select', function(e) {
		//qual, sequential or diverging
		metricType = e.params.data.element.attributes.value.value;
		//label='C1568'
		columnLookup = e.params.data.element.attributes.label.value.trim();
		//> Gender - Male <
		selection = e.params.data.text;
		//max='616'
		columnMax = e.params.data.element.attributes.max.value;
		//min='184'
		columnMin = e.params.data.element.attributes.min.value;
		//breaks='4,8,27,65'
		columnBreaks = e.params.data.element.attributes.breaks.value;

		//get values, break into an array of numbers and cleanup a touch
		columnBreaks = columnBreaks.split(',').map(function(elem, index) {
			return parseFloat(Math.round(elem * 100) / 100).toFixed(5);
		});
		//text and value conversions

		if (metricType == 'diver') {
			chosenPallete = divergingSchemes[Math.floor(Math.random() * 7) + 1];
		} else {
			chosenPallete =
				sequentialSchemes[Math.floor(Math.random() * 7) + 1];
		}
		////perform visualization for map1
		map1LayerGroup[_key1].eachLayer(function(layer) {
			let layerVal1 = layer.feature.properties[columnLookup];
			layer.setStyle({
				fillColor: myFillColor(layerVal1),
				fillOpacity: myFillOpacity(layerVal1),
				opacity: myStrokeOpacity(layerVal1)
			});

			textDisplay = getTextDisplay(columnLookup, layerVal1);
			
			var customPopUp =
				popupLocationPR(layer.feature.properties['LABEL']) +
				'<p><b>N: </b>' +
				textDisplay +
				'</p>';
			layer.bindPopup(customPopUp);
		});

		//perform visualization for map2
		map2LayerGroup[_key2].eachLayer(function(layer) {
			let layerVal2 = layer.feature.properties[columnLookup];
			layer.setStyle({
				fillColor: myFillColor(layerVal2),
				fillOpacity: myFillOpacity(layerVal2),
				opacity: myStrokeOpacity(layerVal2)
			});

			textDisplay = getTextDisplay(columnLookup, layerVal2);
			
			var customPopUp =
				popupLocationPR(layer.feature.properties['LABEL']) +
				'<p><b>N: </b>' +
				textDisplay +
				'</p>';
			layer.bindPopup(customPopUp);
		});

		//updateLegend
		$('#feature-info').show();
		$('#attribute-legend-area').show();

		$('#description-legend').show();

		$('#selected_column_title').html(selection);
		$('#about-text').html(getDescriptionPR(columnLookup));
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

	// $('#info-btn').trigger('click');
}); //end of jQuery closure
