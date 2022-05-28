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
        EjecutarAccion();
    }, 13000);

}

function EjecutarAccion() {

    clicks = clicks - 1;
    
    switch (clicks) {
        
        case 1:
            
            console.log("rutas");
            break;

        case 2:

            var xhr = new XMLHttpRequest();

            reconocer(xhr);

            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4 && xhr.status == 200) {
            
                    var respuesta = JSON.parse(xhr.responseText);
                    
                    alert(JSON.stringify(respuesta));
                }
            
            };

            console.log("reconcocimiento");
            break;

        case 3:
            
            console.log("ubicacion actual");
            break;

        default:
            
            console.log("error");
        }

    clicks = 0;
}



