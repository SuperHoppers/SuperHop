/* global describe beforeEach it */

const { expect } = require('chai');
const {
  models: { Order },
} = require('../index');
const db = require('../db');
const seed = require('../../../script/seed');

describe('Order model', () => {
  let orders;
  beforeEach(async () => {
      orders = (await seed())[0];
  });

  it('has a`totalCost` and `status`', async () => {
    const order = await Order.create({
      totalCost: 24.57,
      status: 'open',
    });
    expect(order.totalCost).to.equal(24.57);
    expect(order.status).to.equal('open');
  });

  it('has default value for totalCost and status', async () => {
    const order = await Order.create({});
    expect(order.totalCost).to.equal(0.0);
    expect(order.status).to.equal('open');
  });
}); // end describe('Order model')
