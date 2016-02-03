var mapProp = {
	center: new google.maps.LatLng(41.920357, 123.449367),
	zoom: 10,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

var locationModel = function(location) {
	this.name = location.name;
	this.position = location.position;
	this.marker = new google.maps.Marker({
		position: location.position,
		map: map,
	});
};

var locationsSeed = [
	{
		name: "Northern Software College",
		position: new google.maps.LatLng(41.920357, 123.449367),
	},
	{
		name: "Beiling Park",
		position: new google.maps.LatLng(41.839764, 123.428420),
	},
	{
		name: "North Railway Station",
		position: new google.maps.LatLng(41.817067, 123.437389),
	},
	{
		name: "Palace Museum",
		position: new google.maps.LatLng(41.796389, 123.456343),
	},
	{
		name: "Qipanshan",
		position: new google.maps.LatLng(41.924587, 123.652345),
	}
];

var locations = (function(locationsSeed) {
	var locations = [];
	locationsSeed.forEach(function(location) {
		locations.push(new locationModel(location));
	})
	return locations;
}(locationsSeed));

var locationListViewModel = function(locations) {
	var self = this;
	self.locations = ko.observableArray(locations);
	self.filter = ko.observable("");
	self.invisibleLocations = [];

	self.filteredLocations = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if(!filter) {
			self.invisibleLocations.forEach(function(location) {
				location.marker.setVisible(true);
			})
			return self.locations();
		} else {
			return ko.utils.arrayFilter(self.locations(), function(location) {
				var name = location.name.toLowerCase();
				if (name.indexOf(filter) > -1) {
					location.marker.setVisible(true);
					return true;
				}
				location.marker.setVisible(false);
				self.invisibleLocations.push(location);
				return false;
			});
		}
	});
};

llvm = new locationListViewModel(locations);
ko.applyBindings(llvm);
/*
function initializeGoogleMap() {


	// Set Markers
	var locations = llvm.filteredLocations();
	for(var i = 0, len = locations.length; i < len; i ++) {
		var marker = new google.maps.Marker({
			position: locations[i].position,
		});

		marker.setMap(map);
	}
};
*/
//google.maps.event.addDomListener(window, 'load', initializeGoogleMap);