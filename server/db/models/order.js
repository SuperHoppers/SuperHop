const Sequelize = require('sequelize');
const db = require('./database');

const Order = db.define('order', {
  totalCost: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaulValue: 'open',
  },
});

module.exports = Order;
