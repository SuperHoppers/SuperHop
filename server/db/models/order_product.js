const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./product');

//through table for many-many association
const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  lineTotal: {
    type: Sequelize.INTEGER,
    // defaultValue: 0,
    // type: Sequelize.VIRTUAL,
    // get() {
    //   const productId = this.getDataValue('productId')
    //   // const price =
    //   return this.getDataValue('quantity') *
    // }
  },
  hooks: {
    beforeCreate: () => {
      const product = Product.findByPk(this.productId);
      const price = product.findPrice();
      this.lineTotal = this.quantity * price;
    },
    beforeUpdate: () => {
      const product = Product.findByPk(this.productId);
      const price = product.findPrice();
      this.lineTotal += this.quantity * price;
    },
  },
});

Order_Product.prototype.findItemsInOrder = function (orderId) {
  return this.findAll({
    where: {
      orderId: orderId,
    },
  });
};

module.exports = Order_Product;
