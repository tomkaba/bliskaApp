'use strict';
var MapApp = angular.module('MapApp', [
	'ionic']);

/**
 * Routing table including associated controllers.
 */
MapApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('menu', {
			url: "/map", 
			abstract: true, 
			templateUrl: "menu.html"})
		.state('menu.home', {
			url: '/home', 
			views: {'menuContent': {templateUrl: 'gpsView.html', controller: 'GpsCtrl',resolve: {
				userdata: function(UserdataService) {	return UserdataService.getUserdata();  }  
				} } }
			 })
		.state('menu.settings', {
			url: '/settings', 
			views: {'menuContent': {templateUrl: 'templates/settingsView.html', controller: 'SettingsCtrl',resolve: {
				userdata: function(UserdataService) {	return UserdataService.getUserdata(); }  
				} } },
			})
 		.state('menu.personal', {url: '/personal', views: {'menuContent': {templateUrl: 'templates/personalView.html', controller:
 'PersonalCtrl'} }  })

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/map/home');
}]);

/**
 * HEADER - handle menu toggle
 */
MapApp.controller('HeaderCtrl', function($scope) {
	// Main app controller, empty for the example

});
/**
 * MAIN CONTROLLER - handle inapp browser
 */
MapApp.controller('MainCtrl', ['$scope', function($scope) {
	
	
}]);

/**
 * A google map / GPS controller.
 */
MapApp.controller('GpsCtrl', 	function($scope, $ionicPlatform, $location,userdata) {
	 $scope.user = userdata;	
	// init gps array
    $scope.whoiswhere = [];
    $scope.basel = { lat: 51.107885, lon: 17.038538 };
	
	console.log($scope.userdata);
	
    // check login code
	$ionicPlatform.ready(function() {	
			
			if(typeof($scope.centerMe)=='function')
				$scope.centerMe();
			
		    // some points of interest to show on the map
		    // to be user as markers, objects should have "lat", "lon", and "name" properties
		    $scope.whoiswhere = [ 
			{ 'name': 'Ja', 'type':'me', 'lat':  $scope.basel.lat, 'lon' : $scope.basel.lon}, 
			{ 'name': 'Krynicka InPost', 'type':'point', 'priority':2, 'address':'ul. Krynicka 59', 'tel':'500 001 123', 'lat': 51.079788, 'lon' : 17.047384, 'open':'9:00-18:00', 'maxloan':2000, 'waittime':30}, 
			{ 'name': 'FerioGaj Pożyczki', 'type':'point', 'priority':1, 'lat': 51.076548, 'address':'ul. Świeradowska 61', 'tel':'500 002 987', 'lon' : 17.044273,  'open':'10:00-17:00', 'maxloan':10000,'waittime':180 } ,
			{ 'name': 'Góralska Pożyczki', 'type':'point', 'priority':1, 'lat': 51.109062, 'lon' : 17.002332, 'address':'ul. góralska 5', 'tel':'500 002 987',  'open':'07:00-24:00', 'maxloan':1000,'waittime':30 } ,
			{ 'name': 'ULTIMO SA', 'type':'point', 'priority':2, 'lat': 51.111711, 'lon' : 17.009078, 'address':'ul. Braniborska 58', 'tel':'500 002 987',  'open':'10:00-16:00', 'maxloan':10000,'waittime':240 } ,
			{ 'name': 'SKY TOWER', 'type':'point', 'priority':1, 'lat': 51.094332, 'lon' : 17.020215, 'address':'ul. Szczęśliwa 12', 'tel':'500 002 987',  'open':'09:00-21:00', 'maxloan':10000,'waittime':120 } 
			
			
			];

	});
			
	$scope.$on('$ionicView.afterEnter', function(){
			
		
	}); 
  		
		
	$scope.centerMe = function () {
			navigator.geolocation.getCurrentPosition(function(position) {
				$scope.position=position;
				var c = position.coords;
				console.log('Current position:'+c.latitude+','+c.longitude);
				$scope.gotoLocation(c.latitude, c.longitude);
				$scope.$apply();
		    },function(e) { console.log("Error retrieving position " + e.code + " " + e.message) });
			
			$scope.gotoLocation = function (lat, lon) {
				if ($scope.lat != lat || $scope.lon != lon) 
				{
					$scope.basel = { lat: lat, lon: lon };
					$scope.$apply("basel");
				}
			};	
	};
	
});

/**
 * MAIN CONTROLLER - handle inapp browser
 */
MapApp.controller('SettingsCtrl', function($scope,userdata) {
	$scope.user = userdata;
	console.log($scope.user);
	$scope.saveSettings = function () {
		
		window.location.hash="#t/home";
	}
  
});


MapApp.controller('PersonalCtrl', ['$scope', function($scope) {
	
  
}]);



// formats a number as a latitude (e.g. 40.46... => "40°27'44"N")
MapApp.filter('lat', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? "N" : "S";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
});

// formats a number as a longitude (e.g. -80.02... => "80°1'24"W")
MapApp.filter('lon', function () {
    return function (input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ew = input > 0 ? "E" : "W";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ew;
    }
});



MapApp.service('UserdataService', function($q) {

	return {
		userdata: 
			{
				loanmin: '200',
				loanmax: '3000',
				loanvalue: '1000',
				waittime: '60',
				waittimemin: '15',
				waittimemax: '240'
			},
		getUserdata: function() {
			//console.log(this.userdata);
			return this.userdata;
		    }
	}
});

/**
 * Handle Google Maps API V3+
 */
// - Documentation: https://developers.google.com/maps/documentation/
MapApp.directive("appMap", function ($window) {
    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        scope: {
            center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            markers: "=",       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
            width: "@",         // Map width in pixels.
            height: "@",        // Map height in pixels.
            zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            mapTypeId: "@",     // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
            panControl: "@",    // Whether to show a pan control on the map.
            zoomControl: "@",   // Whether to show a zoom control on the map.
            scaleControl: "@"   // Whether to show scale control on the map.
        },
        link: function (scope, element, attrs) {
            var toResize, toCenter;
            var map;
            var infowindow;
            var currentMarkers;
   	        var callbackName = 'InitMapCb';

   			// callback when google maps is loaded
			$window[callbackName] = function() {
				console.log("map: init callback");
				createMap(parseInt(scope.zoom));
				updateMarkers();
				};

			if (!$window.google || !$window.google.maps ) {
				console.log("map: not available - load now gmap js");
				loadGMaps();
				}
			else
				{
				console.log("map: IS available - create only map now");
				createMap(parseInt(scope.zoom));
				}
			function loadGMaps() {
				console.log("map: start loading js gmaps");
				var script = $window.document.createElement('script');
				script.type = 'text/javascript';
				script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=InitMapCb';
				$window.document.body.appendChild(script);
				}

			
			
			function createMap(zoompar) {
				console.log("map: create map start");
				var mapOptions = {
					zoom: zoompar,
					center: new google.maps.LatLng(51.10,17.03),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					panControl: true,
					zoomControl: true,
					zoomControlOptions: {
						position: google.maps.ControlPosition.RIGHT_TOP
					},
					mapTypeControl: true,
					scaleControl: false,
					streetViewControl: true,
					streetViewControlOptions: {
						position: google.maps.ControlPosition.RIGHT_TOP
					},
					navigationControl: true,
					disableDefaultUI: true,
					overviewMapControl: true
					};
				if (!(map instanceof google.maps.Map)) {
					console.log("map: create map now as not already available ");
					map = new google.maps.Map(element[0], mapOptions);
					  // EDIT Added this and it works on android now
					  // Stop the side bar from dragging when mousedown/tapdown on the map
					  google.maps.event.addDomListener(element[0], 'click', function(e) {
						e.preventDefault();
						return false;
						});
					infowindow = new google.maps.InfoWindow({pixelOffset: new google.maps.Size(0, -32)}); 
					}
				}
			
			

			scope.$watch('markers', function() {
				updateMarkers();
				})
				
			scope.$watch('center', function() {
				if (map)
				{
					var loc = new google.maps.LatLng(scope.center.lat, scope.center.lon);
					map.panTo(loc);
					
					currentMarkers[0].setPosition( loc);
				}
			})
	

			// Info window trigger function 
			function onItemClick(pin, label, open, address, tel, waittime, priority) { 
				/* var description='';
				
				if(priority>1)
				{
					label=label+'&nbsp;<span style="float:right;font-size:8px;margin-top:5px"><img src="star.png" height=24></img></span>';
				}
				*/
				
				var contentString = '<div class="list card" style="padding:0;text-decoration:none;font-family:Helvetica;">'+
								  '<a class="item bar bar-positive"><span class="title" >'+label+' <i class="icon ion-ios-more-outline" style="float:right"></i></span></a>'+
								  ' <a class="item item-icon-left" style="font-size:12px"><i class="icon ion-ios-time-outline"></i>' + open +'</a>'+
								  ' <a class="item item-icon-left" style="font-size:12px"><i class="icon ion-home"></i>' + address +'</a>'+
								  ' <a class="item item-icon-left" style="font-size:12px" ><i class="icon ion-ios-stopwatch-outline"></i>' + waittime +' minut</a>'+
								  ' <a class="item"><button class="button button-small button-assertive" style="float:right;">Zamów i odbierz za '+waittime+' minut</button></a>'+
								  '</div>';
				
				
				// Replace our Info Window's content and position
				infowindow.setContent(contentString);
				
				infowindow.setPosition(pin.position);
				infowindow.open(map)
				google.maps.event.addListener(infowindow, 'mousedown', function() {
					//console.log("map: info windows close listener triggered ");
					infowindow.close();
					});
				} 

			function markerCb(marker, member, location) {
			    return function() {
					//console.log("map: marker listener for " + member.name);
					var href="http://maps.apple.com/?q="+member.lat+","+member.lon;
					map.setCenter(location);
					onItemClick(marker, member.name, member.open, member.address,member.tel,member.waittime,member.priority);
					};
				}
				
				

			// update map markers to match scope marker collection
			function updateMarkers() {
				if (map && scope.markers) {
					// create new markers
					//console.log("map: make markers ");
					currentMarkers = [];
					var markers = scope.markers;
					if (angular.isString(markers)) markers = scope.$eval(scope.markers);
					for (var i = 0; i < markers.length; i++) {
						var m = markers[i];
						var loc = new google.maps.LatLng(m.lat, m.lon);
						if(m.type=='me')
							var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, icon:'man.png' });
						else
						{
							if(m.priority==1)
								var mm = new google.maps.Marker({ position: loc, map: map, title: m.name });
							else
								var mm = new google.maps.Marker({ position: loc, map: map, title: m.name, icon:'bluemarker.png' });
							
							google.maps.event.addListener(mm, 'mousedown', markerCb(mm, m, loc));
						}
						currentMarkers.push(mm);
						}
					}
				}

			// convert current location to Google maps location
			function getLocation(loc) {
				if (loc == null) return new google.maps.LatLng(40, -73);
				if (angular.isString(loc)) loc = scope.$eval(loc);
				return new google.maps.LatLng(loc.lat, loc.lon);
				}

			} // end of link:
		}; // end of return
});
