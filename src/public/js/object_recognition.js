function reconocer(xhr) {

    xhr.open("POST", "/image", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    Webcam.snap(function(data_uri) {

        var dato = JSON.stringify({"url": data_uri.slice(22,)});

        xhr.send(dato);

    });

}
