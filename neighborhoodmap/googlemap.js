// Initialize map property
var mapProp = {
	center: new google.maps.LatLng(41.920357, 123.449367),
	zoom: 10,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

// Create a map and a blank infowindow
var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
var infoWindow = new google.maps.InfoWindow({content: ""});

// Create location model
var locationModel = function(location) {
	var self = this;
	self.name = location.name;
	self.position = location.position;
	self.lat = location.lat;
	self.lng = location.lng;
	self.marker = new google.maps.Marker({
		position: location.position,
		map: map,
	});

	// Get coffee shop names near current location async
	self.fsurl = "https://api.foursquare.com/v2/venues/explore?client_id=U1SH5VLS5AAFACUU0GZDUPJOOWRA5NL0MN2PVQRVJEB4KDHW&client_secret=IFDGUN2U3IXPQLVZMDMOCVRQ43J4CUZSHYREBRNK34RFSBIO&v=20130815&section=coffee&ll="+self.lat+","+self.lng;
	var j = $.ajax({
			url: self.fsurl,
			dataType: 'json',
			type: 'GET',
			success: function(data, textStatus, jqXHR) {
				var items = data.response.groups[0].items;
				var nearCoffeeShops = "Sorry, there is no coffee shops nearby!";
				if(items.length !== 0) {
					var names = [];
					items.forEach(function(item){
						names.push(item.venue.name);
					})
					nearCoffeeShops = "There are " + items.length + " coffee shops! They are: " + names.join(",");
				}
				infoWindow.setContent(nearCoffeeShops);
			},
			error: function(jqXHR, textStatus, errorThrown){
				infoWindow.setContent(textStatus);
			}
		});

	google.maps.event.addListener(self.marker, 'click', function(){
		infoWindow.open(map, self.marker);
	});

	self.animation = function(){
		infoWindow.open(map, self.marker);
	};
};

// Create locations as seeds
var locationsSeed = [
	{
		name: "Northern Software College",
		position: new google.maps.LatLng(41.920357, 123.449367),
		lat: 41.920357,
		lng: 123.449367
	},
	{
		name: "Beiling Park",
		position: new google.maps.LatLng(41.839764, 123.428420),
		lat: 41.839764,
		lng: 123.428420
	},
	{
		name: "North Railway Station",
		position: new google.maps.LatLng(41.817067, 123.437389),
		lat: 41.817067,
		lng: 123.437389
	},
	{
		name: "Palace Museum",
		position: new google.maps.LatLng(41.796389, 123.456343),
		lat: 41.796389,
		lng: 123.456343
	},
	{
		name: "Qipanshan",
		position: new google.maps.LatLng(41.924587, 123.652345),
		lat: 41.924587,
		lng: 123.652345
	}
];

// Initialize locations
var locations = (function(locationsSeed) {
	var locations = [];
	locationsSeed.forEach(function(location) {
		locations.push(new locationModel(location));
	})
	return locations;
}(locationsSeed));

// Create location list view model
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