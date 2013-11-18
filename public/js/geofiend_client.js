var socket = io.connect('http://localhost');
var markers = {};
var map;

$().ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		$("#demo").text("Geolocation is not supported by this browser.");
	}

});

function showPosition(geoData) {
	$("#demo").text(
			"Latitude: " + geoData.coords.latitude + " Longitude: "
					+ geoData.coords.longitude);
	addMap(geoData);
	sendClientGeoDataViaWebSocket(geoData);
}

function addMap(geoData) {
	tilesource = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
	attributiontext = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
	lat = geoData.coords.latitude;
	long = geoData.coords.longitude;

	map = L.map('map');
	map.setView([ lat, long ], 13);
	L.tileLayer(tilesource, {
		attribution : attributiontext
	}).addTo(map);
	markers[geoData.id] = L.marker([ lat, long ]);
	markers[geoData.id].addTo(map).bindPopup('Here are you!').openPopup();
}

function sendClientGeoDataViaWebSocket(geoData) {
	socket.emit('clientGeoData', geoData);
}

socket.on('serverGeoData', function(data) {
	console.log(data);
	positions = data.positions;
	for ( var index in data.positions) {
		var geoData = data.positions[index];
		lat = geoData.coords.latitude;
		long = geoData.coords.longitude;
		L.marker([ lat, long ]).addTo(map).bindPopup(geoData.userName);
	}

});