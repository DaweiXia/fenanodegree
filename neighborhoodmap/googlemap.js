"use strict";

/** Basic information of five locations */
var locationSeeds = [
	{
		name: "Northern Software College",
		lat: 41.920357,
		lng: 123.449367
	},
	{
		name: "Beiling Park",
		lat: 41.839764,
		lng: 123.428420
	},
	{
		name: "North Railway Station",
		lat: 41.817067,
		lng: 123.437389
	},
	{
		name: "Palace Museum",
		lat: 41.796389,
		lng: 123.456343
	},
	{
		name: "Qipanshan",
		lat: 41.924587,
		lng: 123.652345
	}
];

var closeSidebar = function(){
	if (document.body.clientWidth < 1000){
		var drawer = document.querySelector(".sidebar");
		drawer.classList.remove("open");
	}
};

var toggleSidebar = function(data, event) {
	if (document.body.clientWidth < 1000) {
		var drawer = document.querySelector(".sidebar");
		drawer.classList.toggle("open");
	}
	event.stopPropagation();
}
/** Initialize map when google map api successfully loaded */
var map, infoWindow;

function initMap() {
	var mapProp = {
		center: new google.maps.LatLng(41.920357, 123.449367),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	// Create a map and a blank infowindow
	map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	infoWindow = new google.maps.InfoWindow({content: ""});

	// Add google position, marker to every location and listen to click event on every marker
	locations.forEach(function(location){
		location.position = new google.maps.LatLng(location.lat, location.lng);
		location.marker = new google.maps.Marker({
			position: location.position,
			map: map
		});

		location.marker.addListener('click', function(){
			location.animate();
		});
	});

	infoWindow.setContent(locations[0].defaultDescription);
	infoWindow.open(map, locations[0].marker);
	locations[0].marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){locations[0].marker.setAnimation(null);}, 4500);
}

function googleMapError() {
	alert("Can't load google map!");
}

/**
 * Represents a location
 * @constructor
 */
var LocationModel = function(location) {
	var self = this;
	self.name = location.name;
	self.lat = location.lat;
	self.lng = location.lng;

	// Default location description
	self.defaultDescription = "Latitude: " + self.lat + ", Longitude: " + self.lng;
	self.description = null;
	self.marker = null;
	self.position = null;

	// URL that used for getting coffee shop names near current locaiton async from Foursquare
	self.fsurl = "https://api.foursquare.com/v2/venues/explore?client_id=U1SH5VLS5AAFACUU0GZDUPJOOWRA5NL0MN2PVQRVJEB4KDHW&client_secret=IFDGUN2U3IXPQLVZMDMOCVRQ43J4CUZSHYREBRNK34RFSBIO&v=20130815&section=coffee&ll="+self.lat+","+self.lng;
};

/** Request  nearby coffe shops asynchronously */
LocationModel.prototype.ajax = function() {
	var self = this;
	$.ajax({
		url: self.fsurl,
		dataType: 'json',
		type: 'GET',
		success: function(data, textStatus, jqXHR) {
			var items = data.response.groups[0].items;
			if(items.length !== 0) {
				var names = [];
				items.forEach(function(item){
					names.push(item.venue.name);
				});

				// When successfully get data from Foursquare, reset location description
				self.description = "There are " + items.length + " coffee shops nearby! They are: " + names.join(",");
				infoWindow.setContent(self.description);
			}

		},
		error: function(jqXHR, textStatus, errorThrown){
			alert(textStatus);
		}
	});
};

/** Bounce marker and info window */
LocationModel.prototype.animate = function() {
	var self = this;
	if (!self.description) {
		self.ajax();
		infoWindow.setContent(this.defaultDescription);
	} else {
		infoWindow.setContent(this.description);
	}
	infoWindow.open(map, this.marker);
	this.marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){self.marker.setAnimation(null);}, 750);
	closeSidebar();
};

/**
 * Location list view model
 * @constructor
 */
var locationListViewModel = function(locations) {
	var self = this;
	self.locations = ko.observableArray(locations);
	self.filter = ko.observable("");

	// Push locations that filtered out the list into this array
	self.invisibleLocations = [];

	self.filteredLocations = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if(!filter) { // If has no filter, set all invisible locations visible and show all locations
			self.invisibleLocations.forEach(function(location) {
				location.marker.setVisible(true);
			});
			return self.locations();
		} else { // show locations that name contain filter or set them invisible
			return ko.utils.arrayFilter(self.locations(), function(location) {
				var name = location.name.toLowerCase();
				if (name.indexOf(filter) > -1) {
					location.marker.setVisible(true);
					return true;
				}
				location.marker.setVisible(false);

				// Close info window when related marker is invisible
				if (location.marker.position === infoWindow.position) {
					infoWindow.close();
				}

				self.invisibleLocations.push(location);
				return false;
			});
		}
	});
};

/** Initialize locations and show center location info */
var locations = (function(locationSeeds) {
	var locations = [];
	locationSeeds.forEach(function(location) {
		locations.push(new LocationModel(location));
	});
	return locations;
}(locationSeeds));

/** Apply location list view model */
ko.applyBindings(new locationListViewModel(locations));