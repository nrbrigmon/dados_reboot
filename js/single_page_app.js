var metricType,
	columnLookup,
	selection,
	columnMax,
	columnMin,
	columnBreaks,
	textDisplay,
	chosenPallete;
jQuery(document).ready(function($) {
	'use strict';
	/* MAP SETUP*/
	let ATX_center = [30.265966473966337, -97.744399083313];
	let heliolopilis_center = [-23.6135, -46.59];
	// let saofrancisco_center = [-23.6321, -46.453];
	/* initializing map and base maps */
	var map = L.map('map1', {
		center: ATX_center,
		zoom: 13,
		zoomControl: false,
		maxZoom: 20,
		minZoom: 2,
		inertia: true,
		inertiaDeceleration: 6000
	});
	// STILL LOOKING FOR A WAY TO MOVE THE ZOOM CONTORL TO BOTTOM RIGHT
	L.control.zoom({
		position:'topright'
   }).addTo(map);
	// var hash = new L.Hash(map); //add hashes to html address to easy share locations
	
	/* BASEMAP CONFIGURATION  */
	let choice = 0;
	$('#base-map-selection').on('click', function() {
		// console.log('click', choice);
		if (choice === 0) {
			aerialHybrid2.remove();
			aerialHybrid_2.remove();
			basemap0.addTo(map);
			choice++;
		} else if (choice === 1) {
			basemap0.remove();
			basemap_0.remove();
			basemap1.addTo(map);
			choice++;
		} else {
			basemap1.remove();
			basemap_1.remove();
			aerialHybrid2.addTo(map);
			choice = 0;
		}
	});
	
	$('#base-map-selection').trigger('click');

	/** LEAFLET DRAW CONFIGURATION **/

	//markers added to map
	let markerPoints = new L.FeatureGroup();
	map.addLayer(markerPoints);
	//leaflet-draw integration
	let drawControl = new L.Control.Draw({
		draw: {
			polyline: false,
			polygon: false,
			rectangle: false,
			marker: true,
			circle: false,
			circlemarker: false,
		},
		edit: {
			featureGroup: markerPoints
		}
	});
	map.addControl(drawControl);


	/** LOAD EXISTING MARKERS */
	const loadMarkersOnInit = function(markerObj){
		markerObj['Items'].map( (elem) => {
			// console.log(elem);
			let markerPop = createPopUp(elem);
			let loc = elem.marker.location;
			markerPoints.addLayer( L.marker([loc.lat, loc.lng]).bindPopup(markerPop))
		})
	}
	let AWS_COMMENT_URL = 'https://oq35syezse.execute-api.ap-southeast-1.amazonaws.com/sat127/comments'
	// let AWS_USERS_URL;
	// console.log('starting request to AWS');

	$.ajax({
		url: AWS_COMMENT_URL,
		type: 'GET'
	}).done(function(data) {
		// console.log('data received from AWS');
		loadMarkersOnInit(data.body)
		// console.log(data.body);
	});


	let placementBool = false;
	let placedMarker;
	let placedId;
	let placedLocation;
	//drawcreated happens when a feature is offish created
	map.on('draw:created', function (e) {
		placementBool = true; //true it was created

		placedId = String(Date.now())+String(Math.floor(Math.random()*99999 ) ); //crate random Id
		placedLocation = e.layer.getLatLng(); //hold array;
		// add layer
		let newMarker = e.layer; 
		//asign random id to placed marker, because we will need it layer
		newMarker.nateObj = placedId;
		markerPoints.addLayer(newMarker);		
	});

	///drawstop can happen by either clicking CANCEL or FINISHING a CREATE/EDIT
	map.on('draw:drawstop ', function (e) {
		console.log(e);
		//marker was not placed... cancel comment action
		if (placementBool === false){
			return;
		}
		$("#comment-container").show();
		
	});


	const commentDone = function(){
		placementBool = false;
		
		$("#inputName").val(''); //zero out inputs
		$("#inputComment").val(''); //zero out inputs

		$("#comment-container").hide();
		$("#markerCancel").trigger('click');		
	}

	let markerDrawer = new L.Draw.Marker(map);
	
	const enableDrawing = function(){
		markerDrawer.enable();

	}
	const disableDrawing = function(){
		markerDrawer.disable();

	}
	const createPopUp = function({date, marker}){
		let dateText;
		if (date){
			let _d = new Date(date)
			dateText = _d.toLocaleString();
		}
		let dateHTML = (date ? '<small class="text-muted">'+String(dateText)+'</small>': '')
		return	'<div class="card"><div class="card-body">'+
				'<h5 class="card-title">'+marker.name+'</h5>'+
				'<p class="card-text">'+marker.comment+'</p>'+
				'<span>' +dateHTML + '</span></div></div>';
	}

	$("#saveComment").on('click', function (){
		//get form inputs
		let dbObj = {
			_id: placedId,
			marker: {
				name: $("#inputName").val().trim(),
				comment: $("#inputComment").val().trim(),
				location: placedLocation
			}
		}
		// console.log(dbObj);
		
		//create popup,
		let markerPop = createPopUp(dbObj);

		//bind popup to layer
		markerPoints.eachLayer(function (marker) {
			// console.log(marker);
			if (marker.nateObj === placedId){
				marker.bindPopup(markerPop);
			}
		});
		//save obj back to db
		$.ajax({
			url: AWS_COMMENT_URL,
			type: 'POST',
			data: JSON.stringify(dbObj),
			contentType: 'application/json'
		}).done(function(data) {
			console.log('data posted...')
			console.log('response: ', data);
			// location.reload();
		});
		commentDone();
	});

	$("#cancelComment").on('click', function (){
		markerPoints.eachLayer(function (marker) {
			// console.log(marker);
			console.log('loop')
			if (marker.nateObj === placedId){
				// console.log('found');			
				markerPoints.removeLayer(marker);	
				// console.log('removed');
				
			}
		});
		commentDone();
	});

	$("#markerDraw").on('click', function(){
		$("#markerCancel").show();
		$(this).hide();
		enableDrawing();
	});

	$("#markerCancel").on('click', function(){
		//if they placed the marker, and clicked cancel, trigger cancel comment instead
		if (placementBool === true){
			$("#cancelComment").trigger('click');
			return;
		}
		$("#markerDraw").show();
		$(this).hide();
		disableDrawing();
	});




	/* Geolocation section*/
	$('#find_me').on('click', () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(panToPosition);
			// console.log(navigator.geolocation)

		} else {
			alert("Geolocation is not supported by this browser.");
		}
	});

	function panToPosition(position) {
		console.log('panning to...')
		let localLat = position.coords.latitude;
		let localLng = position.coords.longitude;
		let localZoom = 14;
		map.setView([localLat,localLng], localZoom);
		
		
		placementBool = true; //true it was created
		$("#markerDraw").hide();
		$("#markerCancel").show();
		placedId = String(Date.now())+String(Math.floor(Math.random()*99999 ) ); //crate random Id
		// add layer
		
		let newMarker = L.marker([localLat,localLng]);
		placedLocation = newMarker.getLatLng(); //hold array;
		//asign random id to placed marker, because we will need it layer
		newMarker.nateObj = placedId;
		markerPoints.addLayer(newMarker);
		//add popup automatically on visit
		markerPoints.eachLayer(function (marker) {
			if (marker.nateObj === placedId){
				marker.bindPopup('Your location! Care to comment?').openPopup();
			}
		});
		//open up comment box and hide toolbar
		$("div.leaflet-draw.leaflet-control").hide();
		$("#comment-container").show();

	}

	
	function myHandler(geojson) {
		console.log('reg handler:')
		console.log(geojson);
	};
	function mySelectionHandler(geojson) {
		console.log('selection handler:')
		let position = {
			coords: {
				latitude: geojson.geometry.coordinates[1],
				longitude: geojson.geometry.coordinates[0]
			}
		}
		panToPosition(position);
	}

	let photonControlOptions = {
		  resultsHandler: myHandler,
		  placeholder: 'Navigate to...',
		  position: 'topleft',
		  onSelected: mySelectionHandler
	}
	
	
	let searchControl = L.control.photon(photonControlOptions);
	searchControl.addTo(map)
	$(".photon-input").addClass("form-control");



}); //end of jQuery closure
