const AWS = require("aws-sdk");
const config = require("../config/index");

console.log(config.aws_accessKeyId);
console.log(config.aws_secretAccessKey);

AWS.config.update({
  region: "us-east-2",
  accessKeyId: config.aws_accessKeyId,
  secretAccessKey: config.aws_secretAccessKey
});

const dynamoConnection = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoConnection;
