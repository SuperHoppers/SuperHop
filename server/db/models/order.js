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

// class methods

// find order history
Order.orderHistory = function (userId) {
  return this.findAll({
    where: {
      userId: userId,
      status: 'closed',
    },
  });
};

// find current open order
Order.currentOrder = function (userId) {
  return this.findAll({
    where: {
      userId: userId,
      status: 'open',
    },
  });
};

//clear current order
Order.clearOrder = function (userId) {
  const openOrder = this.currentOrder(userId);
  const cartItems = openOrder.findItemsInOrder(openOrder.id);
  return cartItems.destroy();
};

module.exports = Order;
