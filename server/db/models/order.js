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

// instance methods

// find order history
Order.prototype.orderHistory = function (userId) {
  return this.findAll({
    where: {
      userId: userId,
      status: 'closed',
    },
  });
};

// find current open order
Order.prototype.currentOrder = function (userId) {
  return this.findAll({
    where: {
      userId: userId,
      status: 'open',
    },
  });
};

module.exports = Order;
