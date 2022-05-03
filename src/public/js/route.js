export default class Route {

    constructor(map) {

        this.map = map;
        this.ubicaciones = [
                {
                "bloque a": [
                    11.018487234359526,
                    -74.85100686550142
                ]
                },
                {
                "bloque b": [
                    11.01875261690006,
                    -74.85092318071112
                ]
                },
                {
                "bloque c": [
                    11.018906370042883,
                    -74.85087382799976
                ]
                },
                {
                "bloque d": [
                    11.018235542076992,
                    -74.85025048255922
                ]
                },
                {
                "bloque e": [
                    11.018506190291923,
                    -74.85017752627756
                ]
                },
                {
                "bloque f": [
                    11.018768413389111,
                    -74.8500916959165
                ]
                },
                {
                "bloque g": [
                    11.019581408902248,
                    -74.84969902045124
                ]
                },
                {
                "bloque i": [
                    11.019482417391279,
                    -74.85071504135705
                ]
                },
                {
                "bloque j": [
                    11.020813535537163,
                    -74.85185444355012
                ]
                },
                {
                "bloque k": [
                    11.020086897358158,
                    -74.85118067244913
                ]
                },
                {
                "bloque l": [
                    11.019371841736502,
                    -74.85136306266214
                ]
                },
                {
                "bloque salud": [
                    11.018826334136229,
                    -74.85173857225163
                ]
                }
            ]
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

    posicionActual(latitud, longitud) {

        var limite1 = L.latLng(11.019671743304457, -74.85006318239753);
        var limite2 = L.latLng(11.019774252799353, -74.84944780776422);

        var bounds = L.latLngBounds(limite1, limite2).contains(L.latLng(latitud, longitud));

        if (bounds) {

            console.log("Te encuentras en el bloque G");
        }
    }

    obtenerCoordenadas(destino) {

        ;
    }


}

