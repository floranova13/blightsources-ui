const express = require('express');
const bodyParser = require('body-parser');
const subcategoriesRouter = require('./routes/subcategories');
const categoriesRouter = require('./routes/categories');
const blightsourcesRouter = require('./routes/blightsources');

const port = 4000;
const app = express();
// transforms every input request body
// into json objects for reading
app.use(bodyParser.json());

app.use('/api/subcategories', subcategoriesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/blightsources', blightsourcesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// app.get('/rows/all', (req, res) => {
//   // client.scan() returns all the documents
//   // in the table. you can also use client.query()
//   // in case of adding a condition for selection
//   client.scan(params, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const items = [];

//       // the rows are present in the Items property
//       // of the data object returned in the callback
//       // extract the Name property from the rows and
//       // push them into a new array
//       for (let i in data.Items) items.push(data.Items[i]);

//       // send the obtained rows onto the response

//     }
//   });
// });

// app.post('/rows/add', (req, res) => {
//   const body = req.body;
//   const params = {
//     TableName: tableName,
//     Item: {
//       'pk': body['pk'],
//       'sk': body['sk'],
//     },
//   };
//   client.put(params, (err, data) => {
//     if (err) {
//       console.error('Unable to add item.');
//       console.error('Error JSON:', JSON.stringify(err, null, 2));
//     } else {
//       console.log('Added item:', JSON.stringify(data, null, 2));
//     }
//   });
// });

