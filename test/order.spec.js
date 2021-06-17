/* global describe beforeEach it */

const { expect } = require('chai');
const {
  models: { Order },
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

  // describe('Instance methods on Order model', function () {
  //   it('returns the order history for a user', function () {
  //     const ordernot = Order.create({
  //       status: 'closed',
  //       userId: 1,
  //     });
  //     const orderit = Order.create({
  //       status: 'closed',
  //       userId: 2,
  //     });
  //     const orderly = Order.create({
  //       status: 'closed',
  //       userId: 2,
  //     });

  //     expect(orderly.orderHistory(2)).to.equal(1);
  //   });
  // });
}); // end describe('Order model')
