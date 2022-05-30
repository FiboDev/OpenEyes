function reconocer(xhr, modo) {

    if (modo) {

        xhr.open("POST", "/image", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        Webcam.snap(function(data_uri) {
    
            var dato = JSON.stringify({"url": data_uri.slice(22,)});
    
            xhr.send(dato);
    
        });

    } else {

        xhr.open("POST", "/text", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        Webcam.snap(function(data_uri) {
    
            var dato = JSON.stringify({"url": data_uri.slice(22,)});
    
            xhr.send(dato);
    
        });
    }

}
