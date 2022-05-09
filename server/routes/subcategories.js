const express = require('express');
const router = express.Router();
const { client } = require('../db');

router.get('/', async (req, res) => {
  const params = {
    TableName: 'blightbane',
    ExpressionAttributeNames: { '#g': 'group' },
    ExpressionAttributeValues: {
      ':subcategories': 'subcategories',
    },
    KeyConditionExpression: '#g = :subcategories',
  };

  client.query(params, (err, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      const items = [];
      for (let i in data.Items) items.push(data.Items[i]);
      res.contentType = 'application/json';
      res.send(items);
    }
  });
});

router.get('/:name', async (req, res) => {
  const { name: queryName } = req.params;
  const params = {
    TableName: 'blightbane',
    ExpressionAttributeNames: { '#g': 'group', '#n': 'name' },
    ExpressionAttributeValues: {
      ':subcategories': 'subcategories',
      ':queryName': queryName,
    },
    KeyConditionExpression: `#g = :subcategories AND #n = :queryName`,
  };

  client.query(params, (err, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      const items = [];
      for (let i in data.Items) items.push(data.Items[i]);
      if (items.length === 0) {
        res.status(204).send(`No subcategory of name "${queryName}" found.`);
      }
      res.contentType = 'application/json';
      res.send(items[0]);
    }
  });
});

// router.post('/', async (req, res) => {
//   const { name, description } = req.body;
//   const params = {
//     Item: { /* required */
//       '<AttributeName>': { /* AttributeValue */
//         B: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//         BOOL: true || false,
//         BS: [
//           Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//           /* more items */
//         ],
//         L: [
//           /* recursive AttributeValue */,
//           /* more items */
//         ],
//         M: {
//           '<AttributeName>': /* recursive AttributeValue */,
//           /* '<AttributeName>': ... */
//         },
//         N: 'STRING_VALUE',
//         NS: [
//           'STRING_VALUE',
//           /* more items */
//         ],
//         NULL: true || false,
//         S: 'STRING_VALUE',
//         SS: [
//           'STRING_VALUE',
//           /* more items */
//         ]
//       },
//       /* '<AttributeName>': ... */
//     },
//     TableName: 'STRING_VALUE', /* required */
//     ConditionExpression: 'STRING_VALUE',
//     ConditionalOperator: AND | OR,
//     Expected: {
//       '<AttributeName>': {
//         AttributeValueList: [
//           { /* AttributeValue */
//             B: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//             BOOL: true || false,
//             BS: [
//               Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//               /* more items */
//             ],
//             L: [
//               /* recursive AttributeValue */,
//               /* more items */
//             ],
//             M: {
//               '<AttributeName>': /* recursive AttributeValue */,
//               /* '<AttributeName>': ... */
//             },
//             N: 'STRING_VALUE',
//             NS: [
//               'STRING_VALUE',
//               /* more items */
//             ],
//             NULL: true || false,
//             S: 'STRING_VALUE',
//             SS: [
//               'STRING_VALUE',
//               /* more items */
//             ]
//           },
//           /* more items */
//         ],
//         ComparisonOperator: EQ | NE | IN | LE | LT | GE | GT | BETWEEN | NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH,
//         Exists: true || false,
//         Value: { /* AttributeValue */
//           B: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//           BOOL: true || false,
//           BS: [
//             Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//             /* more items */
//           ],
//           L: [
//             /* recursive AttributeValue */,
//             /* more items */
//           ],
//           M: {
//             '<AttributeName>': /* recursive AttributeValue */,
//             /* '<AttributeName>': ... */
//           },
//           N: 'STRING_VALUE',
//           NS: [
//             'STRING_VALUE',
//             /* more items */
//           ],
//           NULL: true || false,
//           S: 'STRING_VALUE',
//           SS: [
//             'STRING_VALUE',
//             /* more items */
//           ]
//         }
//       },
//       /* '<AttributeName>': ... */
//     },
//     ExpressionAttributeNames: {
//       '<ExpressionAttributeNameVariable>': 'STRING_VALUE',
//       /* '<ExpressionAttributeNameVariable>': ... */
//     },
//     ExpressionAttributeValues: {
//       '<ExpressionAttributeValueVariable>': { /* AttributeValue */
//         B: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//         BOOL: true || false,
//         BS: [
//           Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//           /* more items */
//         ],
//         L: [
//           /* recursive AttributeValue */,
//           /* more items */
//         ],
//         M: {
//           '<AttributeName>': /* recursive AttributeValue */,
//           /* '<AttributeName>': ... */
//         },
//         N: 'STRING_VALUE',
//         NS: [
//           'STRING_VALUE',
//           /* more items */
//         ],
//         NULL: true || false,
//         S: 'STRING_VALUE',
//         SS: [
//           'STRING_VALUE',
//           /* more items */
//         ]
//       },
//       /* '<ExpressionAttributeValueVariable>': ... */
//     },
//     ReturnConsumedCapacity: INDEXES | TOTAL | NONE,
//     ReturnItemCollectionMetrics: SIZE | NONE,
//     ReturnValues: NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW
//   };
//   dynamodb.putItem(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });
// })

module.exports = router;
