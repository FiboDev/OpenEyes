export default class Route {

    constructor(map) {

        this.map = map;
    }

    crearRuta(latitud1, longitud1, latitud2, longitud2) {

        L.Routing.control({
        
            waypoints: [L.latLng(latitud1, longitud1), L.latLng(latitud2, longitud2)],
            router: L.Routing.graphHopper("71b42389-46b4-4f34-b2bd-ac83be6f0cf6", {
        
                urlParameters: {
                    vehicle: "foot"
                }
            })
            
        }).addTo(this.map);
    
    }

    eliminarRuta() {

        console.log("Implementar");
    }

    posicionActual() {

        var corner1 = L.latLng(11.019671743304457, -74.85006318239753);
        var corner2 = L.latLng(11.019774252799353, -74.84944780776422);

        var bounds = L.latLngBounds(corner1, corner2).contains(L.latLng(11.01970284826067, -74.84983989139842));

        if (bounds) {

            console.log("Te encuentras en el bloque G");
        }
    }


}

