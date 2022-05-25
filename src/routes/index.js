//manejador de rutas
const router = require("express").Router(); 
const fs = require("fs");
const python = require("python-shell");

router.get("/", (req, res) => {

    res.render("index");
});

router.post("/image", async (req, res) => {

    
    if (req.body["url"].length != 0) {

        fs.writeFile('src/public/python/imagen.jpg', req.body["url"], "base64", function (err) {

            if (err) return console.log(err);

            console.log('Imagen creada');

            });
        
            //await new Promise(resolve => setTimeout(resolve, 3000));

            python.PythonShell.run("src/public/python/object_tracking.py", null, function (err, results) {

                if (err) throw err; 

                console.log(results);

                res.send(results);

                
            })
    
    }

    
    
});


module.exports = router; 