var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
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

var grammar = '#JSGF V1.0; grammar bloques; public <bloque> = ' + bloques.join(' | ') + ' ;'
var respuesta = ""

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var voices = window.speechSynthesis.getVoices();

speaker.voice = voices[0]; 

speechRecognitionList.addFromString(grammar, 1);

speaker.lang = "es";

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'es-CO';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {

    var bloque = event.results[0][0].transcript; 
    
    console.log(`Confidence: ${event.results[0][0].confidence}`);
    
    if (validarDestino(bloque)) {

        respuesta += bloque

    } else {

        console.log("EY PEDAZO DE IMBECIL, APRENDE HABLAR");
    }

}

recognition.onspeechend = () => {

    recognition.stop();

}


export function reconocer() {


    console.log("escuchando a tus porquerias :D");
    respuesta = "";
    
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



