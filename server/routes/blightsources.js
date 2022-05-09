const express = require('express');
const router = express.Router();
const { client } = require('../db');

router.get('/', async (req, res) => {
  const params = {
    TableName: 'blightbane',
    ExpressionAttributeNames: { '#g': 'group' },
    ExpressionAttributeValues: {
      ':blightsources': 'blightsources',
    },
    KeyConditionExpression: '#g = :blightsources',
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
      ':blightsources': 'blightsources',
      ':queryName': queryName,
    },
    KeyConditionExpression: `#g = :blightsources AND #n = :queryName`,
  };

  client.query(params, (err, data) => {
    if (err) {
      console.log('Error:', err);
    } else {
      const items = [];
      for (let i in data.Items) items.push(data.Items[i]);
      if (items.length === 0) {
        res.status(204).send(`No blightsource of name "${queryName}" found.`);
      }
      res.contentType = 'application/json';
      res.send(items[0]);
    }
  });
});

module.exports = router;
