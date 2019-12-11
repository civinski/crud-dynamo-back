const AWS = require("aws-sdk");
const config = require("../config/index");

console.log(config.aws_accessKeyId);
console.log(config.aws_secretAccessKey);

//configurando sdk aws, keys criadas no painel
AWS.config.update({
  region: "us-east-2",
  accessKeyId: config.aws_accessKeyId,
  secretAccessKey: config.aws_secretAccessKey
});

//criando conexao
const dynamoConnection = new AWS.DynamoDB.DocumentClient();

//exportando o objeto
module.exports = dynamoConnection;
