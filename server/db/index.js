//this is the access point for all things database related!
//if doesn't work, look into requiring './database'

const db = require('./db');
const Sequelize = require('sequelize');
const Order = require('./models/Order');
const User = require('./models/user');
const Product = require('./models/product');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

//through table for many-many association
const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

//many-many association
Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    Order_Product,
  },
};
