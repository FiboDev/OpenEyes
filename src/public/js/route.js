class Route {

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

    crearPlan(destino, speaker) {

        this.eliminarRuta();

        var latitudUsuario = this.ubicacionUsuario["lat"];
        var longitudUsuario = this.ubicacionUsuario["lng"];

        var latitudDestino = destino["lat"];
        var longitudDestino = destino["lng"];

        this.crearRuta(latitudUsuario, longitudUsuario, latitudDestino, longitudDestino);

        this.darInstrucciones(this.ubicacionUsuario, destino, speaker);

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

    async darInstrucciones(ubicacionUsuario, destino, speaker) {

        async function obtenerRequest() {

            return fetch(`https://graphhopper.com/api/1/route?point=${ubicacionUsuario["lat"]},${ubicacionUsuario["lng"]}&point=${destino["lat"]},${destino["lng"]}&instructions=true&type=json&key=71b42389-46b4-4f34-b2bd-ac83be6f0cf6&vehicle=foot`).then(res => res.json());
        }

        var instrucciones  = await obtenerRequest();

        instrucciones = instrucciones["paths"]["0"]["instructions"];

        var posicion = 1;
        
        var distanciaRecorrida = 0;
        var estado = true;

        var self = this;

        speaker.text = instrucciones[0]["text"];
        window.speechSynthesis.speak(speaker);

        function orientador() {

            setTimeout(function() {

                distanciaRecorrida = self.calcularDistancia();

                if ((instrucciones[posicion]["distance"] < distanciaRecorrida)) {

                    speaker.text = instrucciones[posicion]["text"];
                    window.speechSynthesis.speak(speaker);

                    self.ubicacionUsuario = undefined; 

                    posicion++;
                    
                }

                if (posicion > instrucciones.length) {

                    estado = false;
                    clearInterval(orientador);
                    self.eliminarRuta();

                    location.reload();
                } 

                console.log(distanciaRecorrida)

                if (estado) orientador();
            
            }, 3000)
        }

        orientador();

        
    }

    calcularDistancia() {
        
        return L.GeometryUtil.distance(this.map, this.ubicacionUsuario, this.coordenadasActual);
        
    }

    actualizarPosicion(coordenadas) {

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

    posicionActual(latitud, longitud, speaker, bloques) {

        if (L.latLngBounds(L.latLng(bloques["uninorte"][0][1], bloques["uninorte"][0][0]), L.latLng(bloques["uninorte"][1][1], bloques["uninorte"][1][0])).contains(L.latLng(latitud, longitud))) {

            for (var bloque in bloques) {

                var limite1 = L.latLng(bloques[bloque][0][1], bloques[bloque][0][0]);
                var limite2 = L.latLng(bloques[bloque][1][1], bloques[bloque][1][0]);

                if (L.latLngBounds(limite1, limite2).contains(L.latLng(latitud, longitud))) {

                    speaker.text = `Te encuentras en ${bloque}`;
                    window.speechSynthesis.speak(speaker);

                    break;
                }
            }

        } else {

            speaker.text = "No estas en uninorte";
            window.speechSynthesis.speak(speaker);
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

    validarDestino(bloque) {

        for (let destino in this.ubicaciones) {

            if (bloque.localeCompare(Object.keys(this.ubicaciones[destino])[0]) == 0) {

                return true;
            }
        }

        return false;
    }

}

