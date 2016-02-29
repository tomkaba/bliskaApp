angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('MapCtrl', function($scope) {
	$scope.user= {
        min:'500',
        max:5000,
        value:'2000',
		minutes:'60'
    };	
	
	$scope.mapmarkers=[];
		
	function startMap() {
			initialize();
			$scope.centerOnMe();
	}
		
	function setMarkers(map, markers) {
		for (var i = 0; i < markers.length; i++) 
		{
				var sites = markers[i];
				var siteLatLng = new google.maps.LatLng(sites['lat'], sites['long']);
				var contentString = '<div class="list card" style="padding:0;text-decoration:none">'+
								  '<a class="item bar bar-positive"><span class="title" >'+sites['name']+'</span></a>'+
								  ' <a class="item item-icon-left" style="font-size:12px"><i class="icon ion-ios-time-outline"></i>' + sites['open'] +'</a>'+
								  ' <a class="item item-icon-left" style="font-size:12px"><i class="icon ion-home"></i>' + sites['address'] +'</a>'+
								  ' <a class="item item-icon-left" style="font-size:12px"><i class="icon ion-ios-telephone"></i>' + sites['tel'] +'</a>'+
								  ' <a class="item item-icon-left" style="font-size:12px" ><i class="icon ion-ios-stopwatch-outline"></i>' + sites['waittime'] +' minut</a>'+
								  ' <a class="item"><button class="button button-small button-assertive" style="float:right;">Zamów i odbierz za '+sites['waittime']+' minut</button></a>'+
								  '</div>';
								  
				var marker = new google.maps.Marker({
					position: siteLatLng,
					map: map,
					title: sites[0],
					html: contentString
				});

				google.maps.event.addListener(marker, "mousedown", function () {
					infowindow.setContent(this.html);
					infowindow.open(map, this);
				});
		}
	}
		
		
	function initialize() 
	{
		var punkty= [ { 'name': 'Krynicka InPost', 'address':'ul. Krynicka 59', 'tel':'500 001 123', 'lat': 51.079788, 'long' : 17.047384, 'open':'9:00-18:00', 'maxloan':2000, 'waittime':30}, { 'name': 'FerioGaj Po¿yczki', 'lat': 51.076548, 'address':'ul. Œwieradowska 61', 'tel':'500 002 987', 'long' : 17.044273,  'open':'10:00-17:00', 'maxloan':10000,'waittime':180 } ];
			
		var myLatlng = new google.maps.LatLng(51.107885,17.038538); //wroc³aw centrum
			
		var mapOptions = {
			  center: myLatlng,
			  zoom: 13,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"),mapOptions);
			
		setMarkers(map, punkty);
		infowindow = new google.maps.InfoWindow({
			content: "³adujê..."
        });
			
		$scope.map = map;
	}
      
      
	$scope.centerOnMe = function() {
		if(!$scope.map) {
			  return;
		}

		$ionicLoading.show({
			content: 'Ustalanie lokalizacji...',
			showBackdrop: false
		});

		navigator.geolocation.getCurrentPosition(function(pos) {
			var position=new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
			var image = { url:'man.png', size:new google.maps.Size(40,64)};
  			var marker = new google.maps.Marker({
					position: position,
					map: $scope.map,
					title: 'Tu jestem',
					icon: image
				});
			google.maps.event.addListener(marker, "mousedown", function () {
					infowindow.setContent('Tu jestem');
					infowindow.open($scope.map, this);
				});
					
			$scope.map.setCenter(position);
			$ionicLoading.hide();
			}, function(error) {
			  alert('Wyst¹pi³ b³¹d - Nie mo¿na ustaliæ lokalizacji: ' + error.message);
			});
	};
      
	google.maps.event.addDomListener(window, 'load', startMap);
	  
	$scope.clickTest = function() {
		alert('Example of infowindow with ng-click')
	};
})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
