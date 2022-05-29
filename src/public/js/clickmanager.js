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
                    2 veces para detectar objetos o 3 veces para conocer tu ubicación actual";
    window.speechSynthesis.speak(speaker);

    setTimeout(() => {
        menu.classList.remove("active");

        EjecutarAccion();
    }, 13000);

}

function EjecutarAccion() {
    
    switch (clicks) {
        
        case 1:
            
            speaker.text = "Por favor, indica el bloque al que quieres ir";
            window.speechSynthesis.speak(speaker);


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

        case 2:

            var xhr = new XMLHttpRequest();

            reconocer(xhr);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) {
            
                    var respuesta = JSON.parse(xhr.responseText);
                    
                    let texto = "A tu alrededor hay ";

                    for (var objeto in respuesta) {

                        texto += `${respuesta[objeto]} ${objeto}`;
                    }

                    speaker.text = texto;
                    window.speechSynthesis.speak(speaker);
                }
            
            };

            console.log("reconcocimiento");
            break;

        case 3:
            
            router.posicionActual(usuario.getLatLng()["lat"], usuario.getLatLng()["lng"], speaker);
            console.log("ubicacion actual");
            break;

        default:
            
            speaker.text = "Lo sentimos. Intenta de nuevo";
            window.speechSynthesis.speak(speaker);
        }

    clicks = 0;
}



