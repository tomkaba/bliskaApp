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
			cache: true,
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
 		.state('menu.personal', {
			url: '/personal', 
			views: {'menuContent': {templateUrl: 'templates/personalView.html', controller: 'PersonalCtrl',resolve: {  
				userdata: function(UserpersonalService) {	return UserpersonalService.getUserdata(); }  
				}  } }
			})
		.state('menu.ordered', {
			url: '/ordered', 
			cache: false,
			views: {'menuContent': {templateUrl: 'templates/orderedView.html', cache:false, controller: 'OrderedCtrl',resolve: {  
				orderdata: function(OrderdataService) {	return OrderdataService.getOrderdata(); }  
				} }  } 
			})
	
			

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
	
	$scope.mapHeight= window.innerHeight-130;
	$scope.mapWidth= window.innerWidth;
	
	
	
    // check login code
	$ionicPlatform.ready(function() {	
			
			if(typeof($scope.centerMe)=='function')
				$scope.centerMe();
			
		    // some points of interest to show on the map
		    // to be user as markers, objects should have "lat", "lon", and "name" properties
		    $scope.whoiswhere = [ 
			{ 'name': 'Ja', 'type':'me', 'lat':  $scope.basel.lat, 'lon' : $scope.basel.lon}, 
			{ 'name': 'Krynicka InPost', 'type':'point', 'priority':2, 'city':'Wrocław', 'address':'ul. Krynicka 59', 'tel':'500 001 123', 'lat': 51.079788, 'lon' : 17.047384, 'open':'9:00-18:00', 'maxloan':2000, 'waittime':30}, 
			{ 'name': 'FerioGaj Pożyczki', 'type':'point', 'priority':1, 'lat': 51.076548, 'city':'Wrocław', 'address':'ul. Świeradowska 61', 'tel':'500 002 987', 'lon' : 17.044273,  'open':'10:00-17:00', 'maxloan':10000,'waittime':180 } ,
			{ 'name': 'Góralska Pożyczki', 'type':'point', 'priority':1, 'lat': 51.109062, 'lon' : 17.002332, 'city':'Wrocław', 'address':'ul. góralska 5', 'tel':'500 002 987',  'open':'07:00-24:00', 'maxloan':1000,'waittime':30 } ,
			{ 'name': 'ULTIMO SA', 'type':'point', 'priority':2, 'lat': 51.111711, 'lon' : 17.009078, 'city':'Wrocław', 'address':'ul. Braniborska 58', 'tel':'500 002 987',  'open':'10:00-16:00', 'maxloan':10000,'waittime':240 } ,
			{ 'name': 'SKY TOWER', 'type':'point', 'priority':1, 'lat': 51.094332, 'lon' : 17.020215, 'city':'Wrocław', 'address':'ul. Szczęśliwa 12', 'tel':'500 002 987',  'open':'09:00-21:00', 'maxloan':10000,'waittime':120 } ,
			
			
			{ 'name': 'Pożyczki PKiN', 'type':'point', 'priority':1, 'lat': 52.231755, 'lon' : 21.006482, 'city':'Warszawa', 'address':'pl. Defilad 1', 'tel':'500 002 005',  'open':'09:00-21:00', 'maxloan':10000,'waittime':130 } ,
			
			{ 'name': 'Pożyczki Centralny', 'type':'point', 'priority':1, 'lat': 52.228663, 'lon' : 21.003553, 'city':'Warszawa', 'address':'al. Jerozolimskie 224', 'tel':'500 002 006',  'open':'09:00-21:00', 'maxloan':10000,'waittime':120 } ,
			
			{ 'name': 'Plac Konstytucji Credito', 'type':'point', 'priority':1, 'lat': 52.222062, 'lon' : 21.015974, 'city':'Warszawa', 'address':'pl. Konstytucji', 'tel':'500 002 666',  'open':'09:00-21:00', 'maxloan':10000,'waittime':120 } ,
			
			{ 'name': 'Nowy Świat', 'type':'point', 'priority':1, 'lat': 52.230034, 'lon' : 21.021732, 'city':'Warszawa', 'address':'ul. Nowy Świat 1', 'tel':'500 002 987',  'open':'09:00-21:00', 'maxloan':10000,'waittime':120 } 
			
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
	$scope.saveSettings = function () {
		
		window.localStorage.setItem('loanvalue',$scope.user.loanvalue);
		window.localStorage.setItem('waittime',$scope.user.waittime);
		
		window.location.hash="#t/home";
	}
  
});


MapApp.controller('PersonalCtrl', function($scope,userdata) {
	
	$scope.user = userdata;
	
	
	$scope.savePersonal = function ()
	{
		var vorname=$("[name='firstname']").val();
		var name=$("[name='surname']").val();
		var email=$("[name='email']").val();
		var phone=$("[name='tel']").val();
		var dowod=$("[name='dowod']").val();
		var pesel=$("[name='pesel']").val();
	
		window.localStorage.setItem('vorname',vorname);
		window.localStorage.setItem('name',name);
		window.localStorage.setItem('email',email);
		window.localStorage.setItem('phone',phone);
		window.localStorage.setItem('dowod',dowod);
		window.localStorage.setItem('pesel',pesel);
		
		window.location.hash="#t/home";
	}
  
});

MapApp.controller('OrderedCtrl', function($scope,orderdata) {
	
	$scope.order = orderdata;
	
});


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

	var loanvalue = window.localStorage.getItem('loanvalue');
	var waittime = window.localStorage.getItem('waittime');
	
	if(!loanvalue) loanvalue=1234;
	if(!waittime) waittime=45;
	
	return {
		userdata: 
			{
				loanmin: '200',
				loanmax: '3000',
				loanvalue: loanvalue,
				waittime: waittime,
				waittimemin: '15',
				waittimemax: '240'
			},
		getUserdata: function() {
			//console.log(this.userdata);
			return this.userdata;
		    }
	}
});


MapApp.service('UserpersonalService', function($q) {

	return {
		userdata:
			{
				vorname:window.localStorage.getItem('vorname'),
				name:window.localStorage.getItem('name'),
				email:window.localStorage.getItem('email'),
				phone:window.localStorage.getItem('phone'),
				dowod:window.localStorage.getItem('dowod'),
				pesel:window.localStorage.getItem('pesel')
			},
		getUserdata: function () {
			console.log(this.userdata);
			return this.userdata;
		}
	}
});

MapApp.service('OrderdataService', function($q) {

	return {
		orderdata:
			{
				label:window.localStorage.getItem('orderlabel'),
				address:window.localStorage.getItem('orderaddress'),
			},
		getOrderdata: function () {
			return this.orderdata;
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
			function onItemClick(pin, label, open, city, address, tel, waittime, priority) { 
				/* var description='';
				
				if(priority>1)
				{
					label=label+'&nbsp;<span style="float:right;font-size:8px;margin-top:5px"><img src="star.png" height=24></img></span>';
				}
				*/
				
				var contentString = '<div class="list card" style="padding:0;text-decoration:none;font-family:Helvetica;">'+
								  '<div id="info" ><a class="item bar bar-positive"><span class="title" >'+label+' <i class="icon ion-ios-more-outline" style="float:right"></i></span></a>'+
								  ' <a class="item item-icon-left" style="font-size:12px"><i class="icon ion-ios-time-outline"></i>' + open +'</a>'+
								  ' <a class="item item-icon-left" style="font-size:12px"><i class="icon ion-home"></i>' + city + ', ' + address +'</a>'+
								  ' <a class="item item-icon-left" style="font-size:12px" ><i class="icon ion-ios-stopwatch-outline"></i>' + waittime +' minut</a>'+
								  ' <a class="item "><button id="orderbutton" class="button button-small button-assertive" style="float:right;" onclick="orderLoan(\''+label+'\',\''+address+'\',\''+city+'\',\''+open+'\')">Zamów i odbierz za '+waittime+' minut</button><div id="wait" style="display:none;font-size:12px"><img class="icon" height=16 src="wait.gif"></i> czekaj...</div></a>'+
								  ' </div>'+
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
					onItemClick(marker, member.name, member.open, member.city, member.address,member.tel,member.waittime,member.priority);
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


function orderLoan(label,address,city,open) {

	$("#orderbutton").hide();
	$("#wait").show();

	var userdata =
			{
				vorname:window.localStorage.getItem('vorname'),
				name:window.localStorage.getItem('name'),
				email:window.localStorage.getItem('email'),
				phone:window.localStorage.getItem('phone'),
				dowod:window.localStorage.getItem('dowod'),
				pesel:window.localStorage.getItem('pesel'),
				loanvalue:window.localStorage.getItem('loanvalue'),
				waittime:window.localStorage.getItem('waittime'),
				punkt:label,
				punktadres:address,
				punktcity:city,
				punktopen:open
			};
	
	
	var url = "http://etho.pl/bliskaorder.php";
	
	var request= array2json(userdata);
	jQuery.support.cors = true;
	$.ajax({
								url: url,
								async: false,
								contentType: "text/html",
								data: { 'order': request },
								
								success: function () {
									$("#orderbutton").show();
									$("#wait").hide();
									window.location.hash="#/map/ordered";
								},
								error:  function(jqXHR, textStatus, ex) {
									$("#orderbutton").show();
									$("#wait").hide();
									alert('Błąd sieci!');
									window.location.hash="#/map/home";
								}
							});
							
							

}


function array2json(arr) {
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');

    for(var key in arr) {
    	var value = arr[key];
        if(typeof value == "object") { //Custom handling for arrays
            if(is_list) parts.push(array2json(value)); /* :RECURSION: */
            else parts.push('"' + key + '":' + array2json(value)); /* :RECURSION: */
            //else parts[key] = array2json(value); /* :RECURSION: */
            
        } else {
            var str = "";
            if(!is_list) str = '"' + key + '":';

            //Custom handling for multiple data types
            if(typeof value == "number") str += value; //Numbers
            else if(value === false) str += 'false'; //The booleans
            else if(value === true) str += 'true';
            else str += '"' + value + '"'; //All other things
            // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)

            parts.push(str);
        }
    }
    var json = parts.join(",");
    
    if(is_list) return '[' + json + ']';//Return numerical JSON
    return '{' + json + '}';//Return associative JSON
}