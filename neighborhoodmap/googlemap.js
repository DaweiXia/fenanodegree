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

	// Default location description
	self.description = "Latitude: " + self.position.lat() + ", Longitude: " + self.position.lng();
	self.marker = new google.maps.Marker({
		position: location.position,
		map: map,
	});

	// Get coffee shop names near current location async from Foursquare
	self.fsurl = "https://api.foursquare.com/v2/venues/explore?client_id=U1SH5VLS5AAFACUU0GZDUPJOOWRA5NL0MN2PVQRVJEB4KDHW&client_secret=IFDGUN2U3IXPQLVZMDMOCVRQ43J4CUZSHYREBRNK34RFSBIO&v=20130815&section=coffee&ll="+self.position.lat()+","+self.position.lng();
	var j = $.ajax({
			url: self.fsurl,
			dataType: 'json',
			type: 'GET',
			success: function(data, textStatus, jqXHR) {
				var items = data.response.groups[0].items;
				if(items.length !== 0) {
					var names = [];
					items.forEach(function(item){
						names.push(item.venue.name);
					})

					// When successfully get data from Foursquare, reset location description
					self.description = "There are " + items.length + " coffee shops nearby! They are: " + names.join(",");
				}

			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log(textStatus);
			}
		});

	self.animation = function(){
		infoWindow.setContent(self.description);
		infoWindow.open(map, self.marker);
		self.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){self.marker.setAnimation(null);}, 750);
	};

	self.marker.addListener('click', self.animation);
};

// Create location list view model
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
			})
			return self.locations();
		} else { // show locations that name contain filter or set them invisible
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

// Create 5 locations as seeds
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

// Initialize locations and show center location info
var locations = (function(locationsSeed) {
	var locations = [];
	locationsSeed.forEach(function(location) {
		locations.push(new locationModel(location));
	})
	infoWindow.setContent(locations[0].description);
	infoWindow.open(map, locations[0].marker);
	locations[0].marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function(){locations[0].marker.setAnimation(null)}, 5000);

	return locations;
}(locationsSeed));

ko.applyBindings(new locationListViewModel(locations));