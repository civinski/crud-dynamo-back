const express = require("express");
const dynamodb = require("../database/index");
const router = express.Router();
const table = "filmes_api";
const crypto = require("crypto");
const uuidv4 = require("uuid/v4");
var dateFormat = require("dateformat");

router.get("/", async (req, res) => {
  try {
    var params = {
      TableName: table
    };

    dynamodb.scan(params, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          error: "Falha ao buscar dados",
          decription: JSON.stringify(err.message, null, 2)
        });
      } else {
        return res.send(data.Items);
      }
    });
  } catch (err) {
    return res.status(400).send({
      error: "Falha no cadastro",
      decription: JSON.stringify(err, null, 2)
    });
  }
});

router.post("/cadastro", async (req, res) => {
  try {
    const secret = uuidv4();
    const hash = crypto
      .createHmac("sha256", secret)
      .digest("hex")
      .slice(0, 20);
    var data_cad = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    var params = {
      TableName: table,
      Item: {
        hashcod: hash,
        nome: req.body.nome,
        sinopse: req.body.sinopse,
        data_estreia: req.body.data_estreia,
        classi_indicativa: req.body.classi_indicativa,
        data_cad: data_cad
      }
    };

    dynamodb.put(params, function(err, data) {
      if (err) {
        return res.status(400).send({
          error: "Falha no cadastro",
          decription: JSON.stringify(err.message, null, 2)
        });
      } else {
        return res.send(params.Item);
      }
    });
  } catch (err) {
    return res.status(400).send({
      error: "Falha no cadastro",
      decription: JSON.stringify(err, null, 2)
    });
  }
});

router.put("/:filme_hashcod", async (req, res) => {
  console.log("entrei");
  try {
    var filme_hashcod = req.param("filme_hashcod");

    var params = {
      TableName: table,
      Key: {
        hashcod: filme_hashcod
      },
      UpdateExpression:
        "set nome = :nome, sinopse = :sinopse, data_estreia = :data_estreia, classi_indicativa = :classi_indicativa",
      ExpressionAttributeValues: {
        ":nome": req.body.nome,
        ":sinopse": req.body.sinopse,
        ":data_estreia": req.body.data_estreia,
        ":classi_indicativa": req.body.classi_indicativa
      },
      ReturnValues: "UPDATED_NEW"
    };

    dynamodb.update(params, function(err, data) {
      if (err) {
        return res.status(400).send({
          error: "Falha ao editar filme",
          decription: JSON.stringify(err.message, null, 2)
        });
      } else {
        return res.send(data.Attributes);
      }
    });
  } catch (err) {
    return res.status(400).send({
      error: "Falha ao editar filme",
      decription: JSON.stringify(err, null, 2)
    });
  }
});

router.get("/:filme_hashcod", async (req, res) => {
  try {
    var filme_hashcod = req.param("filme_hashcod");

    var params = {
      TableName: table,
      Key: {
        hashcod: filme_hashcod
      }
    };

    dynamodb.get(params, function(err, data) {
      if (err) {
        return res.status(400).send({
          error: "Falha buscar filme",
          decription: JSON.stringify(err.message, null, 2)
        });
      } else {
        return res.send(data.Item);
      }
    });
  } catch (err) {
    return res.status(400).send({
      error: "Falha ao buscar filme",
      decription: JSON.stringify(err, null, 2)
    });
  }
});

router.delete("/:filme_hashcod", async (req, res) => {
  try {
    var filme_hashcod = req.param("filme_hashcod");

    var params = {
      TableName: table,
      Key: {
        hashcod: filme_hashcod
      }
    };

    dynamodb.delete(params, function(err, data) {
      if (err) {
        return res.status(400).send({
          error: "Falha ao deletar filme",
          decription: JSON.stringify(err.message, null, 2)
        });
      } else {
        return res.send(data);
      }
    });
  } catch (err) {
    return res.status(400).send({
      error: "Falha ao deletar filme",
      decription: JSON.stringify(err, null, 2)
    });
  }
});

module.exports = app => app.use("/filmes", router);
