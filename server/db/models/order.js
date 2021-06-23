const Sequelize = require('sequelize');
const db = require('../db');
const Order_Product = require('./order_product');

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

// calculate cart total
Order.prototype.cartTotal = function () {
  const items = Order_Product.findAll({where: {order}});
  const orderTotal = items.reduce((accum, item) => {
    return accum + item.price;
  }, 0);
  this.totalCost = orderTotal;
  return this.totalCost;
};
Order.beforeUpdate(async (order) => {
  const items = await Order_Product.findAll({where: {orderId: order.id}});
  console.log('this is in the order model update hook',items);
  const orderTotal = items.reduce((accum, item) => {
    return accum + item.price;
  }, 0);
  order.totalCost = 50
})
Order.beforeCreate(async (order) => {
  const items = await Order_Product.findAll({where: {orderId: order.id}});
  console.log('this is in the order model crate hook',items);
  const orderTotal = items.reduce((accum, item) => {
    return accum + item.price;
  }, 0);
  order.totalCost = 10
})

module.exports = Order;
