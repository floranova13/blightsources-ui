const express = require('express');
// import the aws sdk to use the DynamoDB
// libraries in the app
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
// transforms every input request body
// into json objects for reading
app.use(bodyParser.json());

AWS.config.update({ region: 'us-east-1' });

// create a new DynamoDB client
// which provides connectivity b/w the app
// and the db instance
const client = new AWS.DynamoDB.DocumentClient();
const tableName = 'blightbane';
// port on which the server listens
const port = 4000;
// Input object with Table specified
// Since we're using scan() method, no query
// is required for us
const params = {
  TableName: tableName,
};

app.get('/rows/all', (req, res) => {
  // client.scan() returns all the documents
  // in the table. you can also use client.query()
  // in case of adding a condition for selection
  client.scan(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var items = [];

      // the rows are present in the Items property
      // of the data object returned in the callback
      // extract the Name property from the rows and
      // push them into a new array
      for (let i in data.Items) items.push(data.Items[i]['Name']);

      // send the obtained rows onto the response
      res.contentType = 'application/json';
      res.send(items);
    }
  });
});

app.post('/rows/add', (req, res) => {
  const body = req.body;
  const params = {
    TableName: tableName,
    Item: {
      // creates a new uuid
      'Id': uuidv4(),
      // name property passed from body
      'Name': body['name'],
    },
  };
  client.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add item.');
      console.error('Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
