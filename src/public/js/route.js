export default class Route {

    constructor(map) {

        this.map = map;
        this.ubicacionUsuario;
        this.coordenadasActual;
        this.rutaActual = false;
        this.ubicaciones = [
                {
                "bloque a": [
                    11.018487234359526,
                    -74.85100686550142,
                    11.0185,
                    -74.8510
                ]
                },
                {
                "bloque b": [
                    11.01875261690006,
                    -74.85092318071112,
                    11.0187,
                    -74.8509
                ]
                },
                {
                "bloque c": [
                    11.018906370042883,
                    -74.85087382799976,
                    11.0189,
                    -74.8509
                ]
                },
                {
                "bloque d": [
                    11.018235542076992,
                    -74.85025048255922,
                    11.0183,
                    -74.8502
                ]
                },
                {
                "bloque e": [
                    11.018506190291923,
                    -74.85017752627756,
                    11.0185,
                    -74.8502
                ]
                },
                {
                "bloque f": [
                    11.018768413389111,
                    -74.8500916959165,
                    11.0188,
                    -74.8501
                ]
                },
                {
                "bloque g": [
                    11.019581408902248,
                    -74.84969902045124,
                    11.0196,
                    -74.8497
                ]
                },
                {
                "bloque i": [
                    11.019482417391279,
                    -74.85071504135705,
                    11.0195,
                    -74.8507
                ]
                },
                {
                "bloque j": [
                    11.020813535537163,
                    -74.85185444355012,
                    11.0208,
                    -74.8519
                ]
                },
                {
                "bloque k": [
                    11.020086897358158,
                    -74.85118067244913,
                    11.0201,
                    -74.8512
                ]
                },
                {
                "bloque l": [
                    11.019371841736502,
                    -74.85136306266214,
                    11.0194,
                    -74.8514
                ]
                },
                {
                "bloque salud": [
                    11.018826334136229,
                    -74.85173857225163,
                    11.0189,
                    -74.8518
                ]
                }
            ]
    }

    crearPlan(destino) {

        this.eliminarRuta();

        var latitudUsuario = this.ubicacionUsuario["lat"];
        var longitudUsuario = this.ubicacionUsuario["lng"];

        var latitudDestino = destino["lat"];
        var longitudDestino = destino["lng"];

        this.crearRuta(latitudUsuario, longitudUsuario, latitudDestino, longitudDestino);

        this.darInstrucciones(this.ubicacionUsuario, destino);

    }

    crearRuta(latitudUsuario, longitudUsuario, latitudDestino, longitudDestino) {

        var routing = L.Routing.control({
        
            waypoints: [L.latLng(latitudUsuario, longitudUsuario), L.latLng(latitudDestino, longitudDestino)],
            router: L.Routing.graphHopper("71b42389-46b4-4f34-b2bd-ac83be6f0cf6", {
        
                urlParameters: {
                    vehicle: "foot",
                    instructions: false
                }
            })
            
        }).addTo(this.map);
    
    }

    async darInstrucciones(ubicacionUsuario, destino) {

        async function obtenerRequest() {

            return fetch(`https://graphhopper.com/api/1/route?point=${ubicacionUsuario["lat"]},${ubicacionUsuario["lng"]}&point=${destino["lat"]},${destino["lng"]}&instructions=true&type=json&key=71b42389-46b4-4f34-b2bd-ac83be6f0cf6&vehicle=foot`).then(res => res.json());
        }

        var instrucciones  = await obtenerRequest();

        instrucciones = instrucciones["paths"]["0"]["instructions"];

        var posicion = 1;
        
        var distanciaRecorrida = 0;
        var estado = true;

        var self = this;

        alert(instrucciones[0]["text"])

        function myLoop() {

            setTimeout(function() {

                distanciaRecorrida = self.calcularDistancia();

                if ((instrucciones[posicion]["distance"] < distanciaRecorrida)) {

                    alert(instrucciones[posicion]["text"]);

                    self.ubicacionUsuario = undefined; 

                    posicion++;
                    
                }

                if (posicion > instrucciones.length) {

                    estado = false;
                    clearInterval(myLoop);
                    self.eliminarRuta();
                } 

                console.log(distanciaRecorrida)

              if (estado) myLoop();   //  decrement i and call myLoop again if i > 0
            
            }, 3000)
        }

        myLoop();

        
    }

    calcularDistancia() {
        
        return L.GeometryUtil.distance(this.map, this.ubicacionUsuario, this.coordenadasActual);
        
    }

    obtenerPosicion(coordenadas) {

        this.coordenadasActual = coordenadas;

        if (typeof this.ubicacionUsuario === "undefined") {

            this.ubicacionUsuario = coordenadas;
        }

    }

    eliminarRuta() {

        this.map.eachLayer((layer) => {

            if (layer.options.waypoints && layer.options.waypoints.length) {

                this.map.removeLayer(layer);
                console.log(layer)
            }
        });
    }

    posicionActual(latitud, longitud) {

        var limite1 = L.latLng(11.019671743304457, -74.85006318239753);
        var limite2 = L.latLng(11.019774252799353, -74.84944780776422);

        var area = L.latLngBounds(limite1, limite2).contains(L.latLng(latitud, longitud));

        if (area) { 

            console.log("Te encuentras en el bloque G");
        }
    }

    obtenerCoordenadas(destino) {

        for (var bloque in this.ubicaciones) {

            if (destino.localeCompare(Object.keys(this.ubicaciones[bloque])[0]) == 0) {

                var coordenadas = this.ubicaciones[bloque][destino];

                return {"lat": coordenadas[2], "lng": coordenadas[3]};
            }
            
        }
    }


}

