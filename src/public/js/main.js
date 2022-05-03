import route from "./route.js"

// Inicializacion del mapa y sus dependencias

var map = L.map("map", {preferCanvas: false, zoom: 19}).setView([11.018699961903724, -74.85051655756253]);
var user;
var locationCircle;
var router = new route(map);

//Referencias del mapa con su respectivo copyright y api 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaWNvZGVydGMiLCJhIjoiY2wxdjdsYm5oMmYycDNqbW9zcjljeGM5ciJ9.Dda3KrTtHyDW_zaKRveTuQ'
}).addTo(map);

map.locate({setView: false, watch: true, maxZoom: 16, enableHighAccuracy: true});
map.on('locationfound', onLocationFound);



function onLocationFound(e) {

    var radius = e.accuracy / 2;
    
    if (!user) {

            user = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
            });

            L.marker(e.latlng, {icon: user}).addTo(map);

        } else {

            user.setLatLng(e.latlng);
        }

    if (!locationCircle) {
        
        locationCircle = L.circle(e.latlng, radius).addTo(map);

    } else {

        locationCircle.setLatLng(e.latlng);
        locationCircle.setRadius(radius);
    }

}