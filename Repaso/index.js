const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT_SERVER = 3000;

const apiRouter = require("./routes/api");
require("./conexion");

// 4.16
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// < 4.16
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// http://localhost:3000/api
app.use("/api", apiRouter);

// http://localhost:3000/
// http://127.0.0.1:3000/
app.get('/', (request, response) => {
    console.info("Dentro de GET");
    response.send('Hola Mundo');
});

app.listen(PORT_SERVER, () => {
    console.info('Inicializando servidor en el puerto: ' + PORT_SERVER); // Concatenación de strings
    console.info(`Inicializando servidor en el puerto: ${PORT_SERVER}`); // Template string
});






