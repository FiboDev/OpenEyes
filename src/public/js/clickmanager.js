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
    speaker.text = "Bienvenido a nuestro GPS. Toca la pantalla 1 vez para acceder al menu de rutas,\
                    2 veces para detectar objetos o 3 veces para conocer tu ubicación actual";
    window.speechSynthesis.speak(speaker);

    setTimeout(() => {
        menu.classList.remove("active");

        console.log(clicks - 1);
        EjecutarAccion()
    }, 3000);

}

function EjecutarAccion() {

    clicks = clicks - 1;
    
    switch (clicks) {
        
        case 1:
            
            console.log("el usuario quiere pene");
            break;

        case 2:
            
            console.log("edgar es trapito");
            break;

        case 3:
            
            console.log("rubens tiene xuxa");
            break;

        default:
            console.log("oprime esas bainas bien caremonda :D");
        }

    clicks = 0;
}



