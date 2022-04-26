import route from "./route.js"

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

// ############################################### speech ###############################################

//var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var speaker = new SpeechSynthesisUtterance();

var bloques = ['bloque a',
            'bloque b',
            'bloque c',
            'bloque d',
            'bloque e',
            'bloque f',
            'bloque g',
            'bloque i',
            'bloque k',
            'bloque j',
            'bloque l',
            'bloque m',
            'bloque de salud']

var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
var voices = window.speechSynthesis.getVoices();

speaker.voice = voices[0]; 

speaker.lang = "es";

recognition.continuous = false;
recognition.lang = 'es-CO';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {

    var bloque = event.results[0][0].transcript; 
    
    console.log(`Confidence: ${event.results[0][0].confidence}`);
    
    if (validarDestino(bloque)) {

        router.crearRuta(bloque);

    } else {

        console.log("EY PEDAZO DE IMBECIL, APRENDE HABLAR");
    }

    alert(bloque)

}

recognition.onspeechend = () => {

    recognition.stop();

}


function reconocer() {


    console.log("escuchando a tus porquerias :D");
    
    speaker.text = "Por favor, di el lugar al que quieres ir";
    speechSynthesis.speak(speaker);


    try {

        recognition.start();

    } catch (e) {

        recognition.stop();
    }
    
}

function validarDestino(destino) {

    for (var bloque in bloques) {

        if (bloques[bloque].localeCompare(destino) == 0) {

            return true;
        }
    }

    return false;
}


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

map.locate({setView: true, watch: false, maxZoom: 16, enableHighAccuracy: true});
map.on('locationfound', onLocationFound);

window.addEventListener("click", reconocer);

