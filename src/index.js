const express = require("express");
const bodyParser = require("body-parser");

//iniciando express
const app = express();

//configuracoes da api
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));

//importando o controller
require("./controllers/FilmeController")(app);

app.listen(3050);
