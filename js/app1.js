function point(name, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: false
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

google.maps.event.addDomListener(window, 'load', point);
//*****************Starting Point on my map*****************
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(43.771341, 11.256875),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});



//*******************view Model starts here******************
var viewModel = {
    points: ko.observableArray([
        new point('Duomo-Cathedral', 43.7732, 11.2560),
        new point('Orsanmichele-Church', 43.770947, 11.254981), 
        new point('Ponte Vecchio-Old Bridge', 43.768350, 11.253323),
        new point('Galleria delgi Uffizzi-Art Gallery', 43.768657, 11.255737),
        new point('Santa Croce-Church', 43.768816, 11.262394),
        new point('Palazzo Vecchio-TownHall', 43.769670, 11.256075),
        new point('Piazza della Signoria-OpenSquare', 43.769725, 11.255474),
        new point('Santa Maria Novella-Church', 43.774502, 11.249466),
        new point('Santa Maria Novella-TrainStation', 43.776261, 11.248737),
        new point('San Lorenzo- ChurchMarket', 43.774858, 11.254584),
        ])
};

ko.applyBindings(viewModel);
