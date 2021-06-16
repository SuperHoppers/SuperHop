const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  totalCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open',
  },
});

module.exports = Order;
