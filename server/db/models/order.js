const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  totalCost: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open',
  },
});

module.exports = Order;
