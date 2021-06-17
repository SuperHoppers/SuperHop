/* global describe beforeEach it */

const { expect } = require('chai');
const {
  models: { Order, User, Product },
} = require('../server/db/index');
const db = require('../server/db/db');
const seed = require('../script/seed');

describe('Order model', () => {
  let orders;
  beforeEach(async () => {
    orders = (await seed())[0];
  });

  it('has a`totalCost` and `status`', async () => {
    const order = await Order.create({
      totalCost: 25,
      status: 'open',
    });
    expect(order.totalCost).to.equal(25);
    expect(order.status).to.equal('open');
  });

  it('has default value for totalCost and status', async () => {
    const order = await Order.create({});
    expect(order.totalCost).to.equal(0);
    expect(order.status).to.equal('open');
  });

  describe('Instance methods on Order model', function () {
    it('returns the order history for a user', async function () {
      const orderData = [
        {
          status: 'closed',
          userId: 1,
        },
        {
          status: 'closed',
          userId: 2,
        },
        {
          status: 'closed',
          userId: 2,
        },
      ];
      const userData = [
        {
          username: 'Luke',
          password: 'Iamyourfather',
          email: 'luke@skywalker.com',
          phoneNumber: '3333333',
          address: 'Tatooine',
        },
        {
          username: 'Anakin',
          password: 'Iamyourson',
          email: 'anakin@skywalker.com',
          phoneNumber: '00000099',
          address: 'Death Star',
        },
      ];

      const orders = await Order.bulkCreate(orderData, { returning: true });

      const users = await User.bulkCreate(userData, { returning: true });

      const order_History = await Order.orderHistory(2);

      expect(order_History).to.have.length(2);
    });
  });
}); // end describe('Order model')
