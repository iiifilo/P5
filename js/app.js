var Points = [ {
    name: 'Duomo-Cathedral',
    lat: 43.7732,
    long: 11.2560,    
    url: 'http://www.google.com'
   
    }, {

    name: 'Orsanmichele-Church',  
    lat: 43.770947,
    long: 11.254981,    
    url: 'http://www.google.com' 
    }, {

    name: 'Ponte Vecchio-Old Bridge',  
    lat: 43.768350,
    long: 11.253323,   
    url: 'http://www.google.com'
    }, {

    name: 'Galleria delgi Uffizzi-Art Gallery',  
    lat: 43.768657,
    long: 11.255737,    
    url: 'http://www.google.com'
    }, {

    name: 'Santa Croce-Church',  
    lat: 43.768816,
    long: 11.262394, 
    add1: '10899 Wilshire Blvd',
    add2: 'Los Angeles, CA 90024',
    phone: '310-443-7000',   
    url: 'https://www.google.com'
    }, {

    name: 'Palazzo Vecchio-TownHall',  
    lat: 43.769670,
    long: 11.256075,    
    url: 'https://www.google.com'
    }, {

    name: 'Piazza della Signoria-OpenSquare',  
    lat: 43.769725,
    long: 11.255474,    
    url: 'http://www.google.com/'
    }, {

    name: 'Santa Maria Novella-Church',  
    lat: 43.774502,
    long: 11.249466,   
    url: 'https://www.google.com' 
    }, {

    name: 'Santa Maria Novella-TrainStation',  
    lat: 43.776261,
    long: 11.248737,    
    url: 'https://www.google.com'
    }, {

    name: 'San Lorenzo- ChurchMarket',  
    lat: 43.774858,
    long: 11.254584,    
    url: 'http://www.google.com'
    }
];
var markersArray = ko.observableArray([]);
Points.forEach(populateMarkersArray);

function populateMarkersArray(element) { //, index, array
    markersArray.push(element);
}

// Set up a google map
var mapOptions = {
    center: { lat: 43.771341,lng: 11.256875}, 
    zoom: 16
};

var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

function initialize() {
    Points.forEach(loadMarkers);

    //set up search input
    var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow0 = new google.maps.InfoWindow();
    var marker0 = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        infowindow0.close();
        marker0.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

  // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker0.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker0.setPosition(place.geometry.location);
        marker0.setVisible(true);

         var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

 infowindow0.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow0.open(map, marker0);
    });

     function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        google.maps.event.addDomListener(radioButton, 'click', function() {
            autocomplete.setTypes(types);
        });
    }

 setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);        

$('#wiki-errors').click(function() {
        $('li').remove('.error');
        $('#wiki-errors').addClass('hidden');
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

function loadMarkers(element) { //, index, array
    var myLatlng = new google.maps.LatLng(element.lat,element.long);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: element.name
    });
    loadInfoWindow(element, marker);
}

function loadInfoWindow(element, marker) {
    var contentString = '<div class="strong"><a href="' + element.url + '" target="_blank">' + element.name + '</a></div><div>' + element.add1 + '</div><div>' + element.add2 + '</div><div>'+ element.phone + '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
        toggleBounce(marker);
    });
}

markerBounce: function toggleBounce(marker) {
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}








function viewModel() {

  }
  ko.applyBindings(new viewModel()); 
