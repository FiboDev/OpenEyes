var recognition = new webkitSpeechRecognition();
var recognizing = false 
var final_transcript = ''

var speaker = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();

speaker.voice = voices[0]; 

speaker.lang = "es";

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
            'bloque salud'];


recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'es-CO';

recognition.onstart = function() {

    recognizing = true;
    final_transcript = '';
};

recognition.onend = function() {

    recognizing = false;
}

recognition.onresult = function(event) {

    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {

        if (event.results[i].isFinal) {

        final_transcript += event.results[i][0].transcript;

        } else {

        interim_transcript += event.results[i][0].transcript;
        }
    }
    
    if (validarDestino(final_transcript.toLowerCase())) {

        router.obtenerCoordenadas(final_transcript);
        speaker.text = "Calculando ruta a " + final_transcript;
        console.log(`Calculando ruta a ${final_transcript}`)

    } else {

        speaker.text = "Lo siento, no pude entender.";
        console.log("No se pudo calcular la ruta")
        
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
