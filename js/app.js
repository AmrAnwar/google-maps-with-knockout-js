var map;
var markers = [];

var init_data = [
          {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ];

var Location = function(data){
   this.title = ko.observable(data.title);
   this.location = ko.observable(data.location)

}

var init = function() {
        // Constructor creates a new map - only center and zoom are required.
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13
      
      });

      ////

      var largeInfowindow = new google.maps.InfoWindow();

     // Create a "highlighted location" marker color for when the user
     // mouses over the marker.
     var highlightedIcon = makeMarkerIcon('FFFF24');

     var largeInfowindow = new google.maps.InfoWindow();
     // The following group uses the location array to create an array of markers on initialize.
     for (var i = 0; i < init_data.length; i++) {
       // Get the position from the location array.
       var position = init_data[i].location;
       var title = init_data[i].title;
       // Create a marker per location, and put into markers array.
       var marker = new google.maps.Marker({
         position: position,
         map: map,
         title: title,
         animation: google.maps.Animation.DROP,
         id: i

       });
       // Push the marker to our array of markers.
       markers.push(marker);

       // Create an onclick event to open the large infowindow at each marker.
       marker.addListener('click', function() {
         populateInfoWindow(this, largeInfowindow);
       });
       // Two event listeners - one for mouseover, one for mouseout,
       // to change the colors back and forth.
       marker.addListener('mouseover', function() {
         this.setIcon(highlightedIcon);
       });
       marker.addListener('mouseout', function() {
         this.setIcon(null);
       });

   /////
   }

}

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

var ViewModel = function() {
        // Constructor creates a new map - only center and zoom are required.
      self = this;
      this.locations = ko.observableArray([]);
      init_data.forEach(function(location){
         self.locations.push(new Location(location));
      });
      

}


ko.applyBindings(new ViewModel());