function crearRuta(latitud1, longitud1, latitud2, longitud2) {

    L.Routing.control({
    
        waypoints: [L.latLng(latitud1, longitud1), L.latLng(latitud2, longitud2)],
        router: L.Routing.graphHopper("71b42389-46b4-4f34-b2bd-ac83be6f0cf6", {
    
            urlParameters: {
                vehicle: "foot"
            }
        })
        
    }).addTo(map);

}

function eliminarRuta() {

    map.removeControl();
}

function onLocationFound(e) {

    var radius = e.accuracy / 2;

    var locationMarker = L.marker(e.latlng).addTo(map)
        .bindPopup('You are within ' + radius + ' meters from this point').openPopup();

    var locationCircle = L.circle(e.latlng, radius).addTo(map);
}

// Inicializacion del mapa

var map = L.map("map", {preferCanvas: false, zoom: 19}).setView([11.017318457267693, -74.85047893988772]);

//Referencias del mapa con su respectivo copyright y api 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaWNvZGVydGMiLCJhIjoiY2wxdjdsYm5oMmYycDNqbW9zcjljeGM5ciJ9.Dda3KrTtHyDW_zaKRveTuQ'
}).addTo(map);

var bloques = new Array('bambu1.geojson', 'bambu2.geojson', 'biblioteca.geojson', 'bloqueD.geojson', 'bloqueE.geojson', 'bloqueF.geojson', 'bloqueG.geojson', 'bloqueI1.geojson', 'bloqueI2.geojson', 'bloqueI3.geojson', 'bloqueI4.geojson', 'bloqueJ.geojson', 'bloqueK.geojson', 'bloqueL.geojson', 'cafeDuNord.geojson', 'camion.geojson', 'canchaBaloncesto.geojson', 'canchaTenis.geojson', 'casaEstudio.geojson', 'coliseo.geojson', 'duNordExpress.geojson', 'laEsquina.geojson', 'plaza.geojson', 'puerta7.geojson', 'salasDanza.geojson')

map.on('locationfound', onLocationFound);

map.locate({setView: true, watch: true, maxZoom: 17, enableHighAccuracy: true})

