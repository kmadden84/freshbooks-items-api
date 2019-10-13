'use strict';

const express = require('express');
const { sequelize, models } = require('../models');
const Sequelize = require('sequelize');
const Items = require('../models').Items;
const router = express.Router();

router.get('/', (req, res) => {
  Items.findAll({
    order: [["id", "ASC"]]
  }).then(function (items) {
    return res.json(items)
  }).catch(function (err) {
    res.json(err).send(500);
  });
});


router.post('/', (req, res) => {
  Items.bulkCreate(req.body,
    {
      fields:["id","item_name", "item_desc", "item_quantity"],
      updateOnDuplicate:["item_name", "item_desc", "item_quantity"],
    }, /* where criteria */
  ).then(function (item) {
    return res.json(item).end()
  }).catch(function (err) {
    res.send(500);
  });
});



// router.put('/', (req, res) => {
//   Items.bulkCreate(req.body,
//       {
//         fields:["id","item_name", "item_desc", "item_quantity"],
//         updateOnDuplicate:["item_name", "item_desc", "item_quantity"],
//       }, /* where criteria */
//   ).then(function(item) {
//     console.log(item)
//     return res.json(affectedRows, affectedCount).end()
//   }).catch(function (err) {
//     return res.json(err);
//   });
// });


module.exports = router;
