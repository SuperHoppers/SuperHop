const Sequelize = require('sequelize');
const db = require('../db');

//through table for many-many association
const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  lineTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});
module.exports = Order_Product;
