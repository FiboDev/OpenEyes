const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

//inicializacion de la app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000

//configuraciones 
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));


//rutas de la pagina
app.use(require("./routes/index"));

//archivos estaticos 
app.use(express.static(path.join(__dirname, "public")));

//empezar el servidor
server.listen(port, () => {

    console.log("El servidor esta corriendo");
})



