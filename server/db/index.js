// import the aws sdk to use the DynamoDB
// libraries in the app
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

// create a new DynamoDB client
// which provides connectivity b/w the app
// and the db instance
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'blightbane';
// port on which the server listens

// Input object with Table specified
// Since we're using scan() method, no query
// is required for us
const params = {
  TableName: tableName,
};

module.exports = {
  client,
  params,
};
