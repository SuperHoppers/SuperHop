const Sequelize = require('sequelize');
const db = require('../db');
//const axios = require('axios');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  //change to false allowNull for later tiers
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.TEXT,
  },
  //Replace ENUM types with types Dani chooses
  type: {
    type: Sequelize.ENUM,
    allowNull: true,
    values: ['Strength', 'Mind'],
  },
});

//instance method
// // find product's price
// Product.prototype.findPrice = function () {
//   console.log(this.price);
//   return this.price;
// };

module.exports = Product;
