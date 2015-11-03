var elMap = document.getElementById('loc');
var msg = 'Sorry we were unable to get your location.';
var myLat = 0;
var myLon = 0;

var doNav = function () {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(success, fail);
		elMap.textContent = 'Checking location...';
	}else{
		elMap.textContent = msg;
	}
}


function success (position) {
	myLat = position.coords.latitude;
	myLon = position.coords.longitude;

	calcDistance(myLat, myLon);
	
	msg = '<h3>Latitude:<br>';
	msg += position.coords.latitude + '</h3>';
	msg += '<h3>Longitude:<br>';
	msg += position.coords.longitude + '</h3>';
	elMap.innerHTML = msg;
}

function fail (msg) {
	elMap.textContent = msg;
	console.log(msg.code);
}

function calcDistance(lat1, lon1) {
	console.log("Calculating distance");
	var lat2 = document.getElementById('deslat').value;
	var lon2 = document.getElementById('deslong').value;
	var res = document.getElementById('distance');
	console.log("acquired dom elements");

	var R = 6371000; // metres

	var x1 = Math.toRadians(lat1);
	var x2 = Math.toRadians(lat2);
	var y1 = Math.toRadians(lat2-lat1);
	var y2 = Math.toRadians(lon2-lon1);

	var a = Math.sin(y1/2) * Math.sin(y1/2) +
	        Math.cos(x1) * Math.cos(x2) *
	        Math.sin(y2/2) * Math.sin(y2/2);
	
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;

	//set DOM element to result
	res.innerHTML = d;
	console.log("distance is: " + d + " meters");
}

// Converts from degrees to radians.
Math.toRadians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
