// ################ inicializaciones ################ //

var map = L.map("map", {preferCanvas: false, zoom: 19}).setView([11.018699961903724, -74.85051655756253]);
var usuario;
var usuarioCirculo;
var router = new Route(map);
var recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();

// ################################################# //

// ################ configuraciones ################ //

// ---------------- speech ---------------- // 

recognition.continuous = false;
recognition.lang = 'es';
recognition.maxAlternatives = 1;
recognition.interimResults = false;

recognition.start();
recognition.stop();


// ---------------- Webcam ---------------- //

Webcam.set({

    width: 320,
    height: 320,
    image_format: 'jpg',
    jpeg_quality: 90

    });
    
Webcam.attach("#cam");

// ---------------- mapa ---------------- //

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaWNvZGVydGMiLCJhIjoiY2wxdjdsYm5oMmYycDNqbW9zcjljeGM5ciJ9.Dda3KrTtHyDW_zaKRveTuQ'

}).addTo(map);

map.locate({setView: false, watch: true, maxZoom: 16, enableHighAccuracy: true});

map.on('locationfound', function (e) {

    var radio = e.accuracy / 2;
    
    if (!usuario) {

            usuario = L.marker(e.latlng).addTo(map);

        } else {

            usuario.setLatLng(e.latlng);
            router.actualizarPosicion(e.latlng);
        }

    if (!usuarioCirculo) {
        
        usuarioCirculo = L.circle(e.latlng, radio).addTo(map);

    } else {

        usuarioCirculo.setLatLng(e.latlng);
        usuarioCirculo.setRadius(radio);
    }

});


// ################################################# //