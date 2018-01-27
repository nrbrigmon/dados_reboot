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
		// zoomControl: false,
		maxZoom: 20,
		minZoom: 2,
		inertia: true,
		inertiaDeceleration: 6000
	});
	// STILL LOOKING FOR A WAY TO MOVE THE ZOOM CONTORL TO BOTTOM RIGHT

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
	// ///aws here
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
	map.on('draw:created ', function (e) {
		// console.log('draw creation');
		placementBool = true; //true it was created

		placedId = String(Date.now())+String(Math.floor(Math.random()*99999 ) ); //crate random Id
		// console.log(e);
		placedLocation = e.layer.getLatLng(); //hold array;
		// add layer
		let newMarker = e.layer; 
		// console.log(placedLocation);
		//asign random id to placed marker, because we will need it layer
		newMarker.nateObj = placedId;
		markerPoints.addLayer(newMarker);
		
		markerPoints.newMarker.placedId.popup("open");
		
	});

	///drawstop can happen by either clicking CANCEL or FINISHING a CREATE/EDIT
	map.on('draw:drawstop ', function (e) {
		// console.log(e);
		// console.log('draw stoped...');
		//marker was not placed... cancel comment action
		if (placementBool === false){
			return;
		}

		$("div.leaflet-draw.leaflet-control").hide();
		$("#comment-container").show();
		
	});


	const commentDone = function(){
		console.log('comment done action');
		placementBool = false;
		
		$("#inputName").val(''); //zero out inputs
		$("#inputComment").val(''); //zero out inputs

		$("#comment-container").hide();
		$("div.leaflet-draw.leaflet-control").show();
	}
	const createPopUp = function({date, marker}){
		let dateText;
		if (date){
			// console.log(date);
			let _d = new Date(date)
			// console.log(_d);
			dateText = _d.toLocaleString();
			// console.log(dateText);
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
		commentDone();
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
		map.setView([localLat,localLng], 15);
		
		
		placementBool = true; //true it was created
		
		placedId = String(Date.now())+String(Math.floor(Math.random()*99999 ) ); //crate random Id
		// console.log(e);
		// add layer
		
		
		let newMarker = L.marker([localLat,localLng]);
		// console.log(placedLocation);
		placedLocation = newMarker.getLatLng(); //hold array;
		//asign random id to placed marker, because we will need it layer
		newMarker.nateObj = placedId;
		markerPoints.addLayer(newMarker);
		markerPoints.eachLayer(function (marker) {
			console.log(marker);
			if (marker.nateObj === placedId){
				marker.bindPopup('Your location! Care to comment?').openPopup();
			}
		});

	}












}); //end of jQuery closure
