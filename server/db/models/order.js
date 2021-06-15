const Sequelize = require('sequelize');
const db = require('./database');

const Order = db.define('order', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  customerId: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  totalCost: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaulValue: 'open',
  },
  itemsInOrder: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    // type: Sequelize.INTEGER
  },
});

module.exports = Order;
