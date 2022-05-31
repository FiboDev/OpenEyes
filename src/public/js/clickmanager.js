const mapa = document.getElementById("map");
const menu = document.getElementById("menu");
const speaker = new SpeechSynthesisUtterance();
var clicks = 0;

menu.addEventListener("click",() => {
    clicks++;
});

// Funcion de bienvenida a la app para el usuario.
function MostrarMenu() {

    //Mostrar el menú de toques de pantalla
    menu.classList.add("active");

    //Ejecutar codigo de audio
    speaker.text = "Bienvenido a nuestro GPS. Toca la pantalla una vez para acceder al menu de rutas,\
                    2 veces para detectar objetos, 3 veces para conocer tu ubicación actual o 4 veces \
                    para reconocer texto.";

    window.speechSynthesis.speak(speaker);

    setTimeout(() => {
        menu.classList.remove("active");

        EjecutarAccion();
    }, 16000);

}

function EjecutarAccion() {
    
    //manejar la cantidad de clicks
    switch (clicks) {
        //opcion de rutas para ir a cierto bloque
        case 1:
            
            speaker.text = "Por favor, indica el bloque al que quieres ir";
            window.speechSynthesis.speak(speaker);

            //detectar el audio del usuario
            recognition.start();

            var bloque = "";

            recognition.onspeechend = function() {

                console.log("Fin de la grabacion")
                recognition.stop();
            }
            
            recognition.onresult = function(event) {
            
                bloque = event.results[0][0].transcript; 
                
                console.log("Audio detectado");
                console.log(bloque);
                console.log(`Confidence: ${event.results[0][0].confidence}`);

                //validar que el bloque ingresado por el usuario sea correcto
                if (router.validarDestino(bloque)) {

                    let destino = router.obtenerCoordenadas(bloque);

                    router.actualizarPosicion(usuario.getLatLng());
                    router.crearPlan(destino, speaker);
                    
                    mapa.setAttribute("onclick","");

                } else {

                    speaker.text = "El bloque no existe";
                    window.speechSynthesis.speak(speaker);

                }
                
            }
            
            recognition.onerror = (event) => {
            
                console.log(event.error)
            }

            console.log("rutas");
            break;
        
        //detectar objetos
        case 2:
            
            var xhr = new XMLHttpRequest();

            reconocer(xhr, true);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) {
            
                    var respuesta = JSON.parse(xhr.responseText);
                    
                    if (Object.keys(respuesta).length != 0) {

                        let texto = "A tu alrededor hay ";

                        for (var objeto in respuesta) {

                            texto += `${respuesta[objeto]} ${objeto}`;
                        }

                        speaker.text = texto;
                        window.speechSynthesis.speak(speaker);

                    } else {

                        speaker.text = "No pude detectar nada. Intenta de nuevo";
                        window.speechSynthesis.speak(speaker);
                    }
                }
                    
            
            };

            console.log("reconcocimiento");
            break;
        
        //obtener tu ubicacion actual en la universidad
        case 3:
            
            var xhr = new XMLHttpRequest();

            var bloques;

            xhr.open("GET", "/js/bloques.json", true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.send(); 

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) {

                    bloques = JSON.parse(xhr.responseText);

                    router.posicionActual(usuario.getLatLng()["lat"], usuario.getLatLng()["lng"], speaker, bloques);

                }
            }

            console.log("ubicacion actual");
            break;
        
        //detectar texto
        case 4:

            var xhr = new XMLHttpRequest();

            reconocer(xhr, false);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) {
            
                    var respuesta = xhr.responseText;
                    
                    if (!(respuesta.localeCompare("") == 0)) {

                        let texto = `Esto es lo que pude detectar ${respuesta}`;

                        speaker.text = texto;
                        window.speechSynthesis.speak(speaker);

                    } else {

                        speaker.text = "No pude detectar nada. Intenta de nuevo";
                        window.speechSynthesis.speak(speaker);
                    }
                }
                    
            
            };

            console.log("texto");
            break;

        default:
            
            speaker.text = "Lo sentimos. Intenta de nuevo";
            window.speechSynthesis.speak(speaker);
        }

    clicks = 0;
}



