//this is the access point for all things database related!

const db = require('./db');

const Order = require('./models/Order');
const User = require('./models/user');

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product);
Product.belongsToMany(Order);

module.exports = {
  db,
  models: {
    User,
    Order,
  },
};
