var myRealtorApp = new angular.module('myRealtorApp', []);
var map = null;
var currInfobox = null;

myRealtorApp.controller('bodyCtrl', [
	'$scope', 
	function($scope) {
		$scope.listings = [
			{'name': 'Codefusion',
			'address': '29 Gervais Dr, Toronto ON M3C 1Y9'},
			{'name': 'Canada Christian College',
			'address': '50 Gervais Dr, North York ON M3C 1Z3'},
			{'name': 'Don Mills Civitan Area',
			'address': '1030 Don Mills Rd, North York ON M3C 1W6'},
			{'name': 'Korean Catholic Church',
			'address': '849 Don Mills Rd, North York ON M3C 1W1'},
			{'name': 'Ryerson University',
			'address': '350 Victoria Street, Toronto Ontario M5B 2K3'},
			{'name': 'Mattamy Athletic centre',
			'address': '60 Carlton St, Toronto ON M5B 1J2'},
			{'name': 'My Crib',
			'address': '209 Fort York blvd, Toronto ON M5V 4A1'}
		];

		//may have to declare this outside

		$scope.getMap = function() {
			//debug purposes
			console.log("Starting map fetch");

			map = new Microsoft.Maps.Map(document.getElementById("mapDisplay"), 
			{credentials: "Arhv5WenzBkSQVEgddiB53B9tPQFSz98Ji2lBsMprNS6UeGXGsU_wkC50hrdY9ip",
			center: new  Microsoft.Maps.Location(43.7000, -79.4000),
			zoom: 10
		});

			Microsoft.Maps.loadModule('Microsoft.Maps.Search', {callback: null});
		}

		$scope.getListings = function(listings) {
			for (var i = 0; i < listings.length; i++) {
				console.log("listing" + i + " : " + listings[i].name);
			};
			
		}
		
		$scope.getPinLocation = function(listing){
			var searchManager = new Microsoft.Maps.Search.SearchManager(map);
			
			var geocodeRequest = {where:listing.address, count:10, callback:createMapPin, errorCallback:null};
			searchManager.geocode(geocodeRequest);
		}

		function createMapPin(geocodeResult){
			console.log("Creating pin for address: " + geocodeResult);

			var pin = new Microsoft.Maps.Pushpin(geocodeResult, null);
			Microsoft.Maps.Events.addHandler(pin, 'click', function () {
				search_showInfoBox(result)
			});
			map.entities.push(pin);
			console.log("pin should be showing now");
		}

		$scope.search_showInfoBox = function(listing){
			if(currInfobox){
				currInfobox.setOptions({ visible: true});
				map.entities.remove(currInfobox);
			}

			currInfobox = new Microsoft.Maps.Infobox(
				listing.address,
				{
					title: listing.name,
					description: [listing.address].join(''),
					showPointer: true,
					titleAction: null, 
					titleClickHandler: null
				});
			currInfobox.setOptions({visible:true});
			map.entities.push(currInfobox);
		}
	}
]);														



