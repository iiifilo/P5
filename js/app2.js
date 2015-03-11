var initialPoints = [
  {  
  name: 'Duomo-Cathedral',        
  lat: 43.7732,
  long: 11.2560
  },
  {name : 'Orsanmichele-Church',
  lat: 43.770947, 
  long:11.254981
  },
  {name: 'Ponte Vecchio-Old Bridge',
  lat: 43.768350,
  long: 11.253323
  }    
]


//Google Maps Bounce code
var Florence = new google.maps.LatLng(43.771341, 11.256875);
var parliament = new google.maps.LatLng(43.771341, 11.256875);
var marker;
var map;

function initialize() {
  var mapOptions = {
    zoom: 13,
    center: Florence
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

  marker = new google.maps.Marker({
    map:map,
    draggable:false,
    animation: google.maps.Animation.DROP,
    position: parliament
  });
  google.maps.event.addListener(marker, 'click', toggleBounce);
}

function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

//Points function

var Points =function(data){
   this.name = ko.observable(data.name); 
  this.lat = ko.observable(data.lat);
  this.long = ko.observable(data.long);

}

var ViewModel = function(){
    var self = this;
    this.pointsList = ko.observableArray([]);

    initialPoints.forEach(function(pointItem){
    self.pointsList.push(new Points(pointItem) );
  });

    this.currentPoint = ko.observable(this.pointsList()[0]);

    this.setPoint = function (clickedPloint){
    self.currentPoint(clickedPoint)
  }


  }
ko.applyBindings(new ViewModel())