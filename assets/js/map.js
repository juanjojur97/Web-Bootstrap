if(navigator.geolocation){
    // Para obtener la ubicación actual llama getCurrentPosition.
        navigator.geolocation.getCurrentPosition( 
        sucess,
        error,
        options);
    }else{ 
  alert("Los servicios de geolocalización  no están disponibles");
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function sucess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Iniciamos mapa en las coordenadas del usuario
    let map = L.map('map', {
        center: [latitude, longitude],
        zoom: 14
    });
    
    // Aplicamos capa/tipo de mapa
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);

    /*------Definimos un icono inicio---------------*/
    var inicio = L.icon({
        iconUrl: '../assets/images/leaf-green.png',
        shadowUrl: '../assets/images/leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    /*------Definimos un icono final---------------*/
    var final = L.icon({
        iconUrl: '../assets/images/leaf-red.png',
        shadowUrl: '../assets/images/leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    /*------Definimos un icono final---------------*/
    var track = L.icon({
        iconUrl: '../assets/images/leaf-orange.png',
        shadowUrl: '../assets/images/leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    //---Trazamos ruta---
    var control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(37.17059, -3.60552)
        ],
        language: 'es',
        createMarker: function(i, wp, nWps) {
            switch (i) {
                case 0:
                return L.marker(wp.latLng, {
                    icon: inicio,
                    draggable: true
                }).bindPopup("<b>" + "Inicio" + "</b>");
                case nWps - 1:
                return L.marker(wp.latLng, {
                    icon: final,
                    draggable: true
                }).bindPopup("<b>" + "Destino" + "</b>");
                default:
                return L.marker(wp.latLng, {
                    icon: track,
                    draggable: true
                }).bindPopup("<b>" + "Waypoint" + "</b>");
            }
        }
    }).addTo(map);
}

function error() {
    var map = L.map('map', {
        center: [37.17059, -3.60552],
        zoom: 17
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
}