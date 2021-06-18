//this is the access point for all things database related!
//if doesn't work, look into requiring './database'

const db = require('./db');
const Sequelize = require('sequelize');
const Order = require('./models/order');
const User = require('./models/user');
const Product = require('./models/product');
const Order_Product = require('./models/order_product');
//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

//many-many association
// foreign key -> orderId
Order.belongsToMany(Product, { through: Order_Product });
// foreign key -> productId
Product.belongsToMany(Order, { through: Order_Product });
// orderProducts belongs to Product?

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    Order_Product,
  },
};
