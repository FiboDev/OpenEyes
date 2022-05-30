//manejador de rutas
const router = require("express").Router(); 
const fs = require("fs");
const python = require("python-shell");

router.get("/", (req, res) => {

    res.render("index");
});

router.get("/sonido", (req, res) => {

    res.render("prueba");
});

router.post("/image", async (req, res) => {

    
    if (req.body["url"].length != 0) {

        fs.writeFile('src/public/python/imagen.jpg', req.body["url"], "base64", function (err) {

            if (err) return console.log(err);

            console.log('Imagen creada');

            });

            python.PythonShell.run("src/public/python/main.py", {args: "r"}, function (err, results) {

                if (err) throw err; 

                console.log(results);

                res.send(results[0]);

                
            });
    
    }
});

router.post("/text", (req, res) => {

    if (req.body["url"].length != 0) {

        fs.writeFile('src/public/python/texto.jpg', req.body["url"], "base64", function (err) {

            if (err) return console.log(err);

            console.log('Imagen creada');

            });

            python.PythonShell.run("src/public/python/main.py", {args: "t"}, function (err, results) {

                if (err) throw err; 

                console.log(results);

                res.send(results);

            });
        }
});


module.exports = router; 