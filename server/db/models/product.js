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
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  //Replace ENUM types with types Dani chooses
  type: {
    type: Sequelize.ENUM,
    allowNull: true,
    values: ['Strength', 'Mind'],
  },
});

module.exports = Product;

/**
 * instanceMethods
 */

// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, process.env.JWT);
// };

/**
 * classMethods
 */

// User.findByToken = async function (token) {
//   try {
//     const { id } = await jwt.verify(token, process.env.JWT);
//     const user = User.findByPk(id);
//     if (!user) {
//       throw 'nooo';
//     }
//     return user;
//   } catch (ex) {
//     const error = Error('bad token');
//     error.status = 401;
//     throw error;
//   }
// };

/**
 * hooks
 */
// const hashPassword = async (user) => {
//   //in case the password has been changed, we want to encrypt it with bcrypt
//   if (user.changed('password')) {
//     user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
//   }
// };

// User.beforeCreate(hashPassword);
// User.beforeUpdate(hashPassword);
// User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
