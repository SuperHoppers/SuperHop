/* global describe beforeEach it */

const { expect } = require('chai');
const {
  models: { Order },
} = require('../index');

describe('Order model', () => {
  it('has fields totalCost, status', async () => {
    const order = await Order.create({
      totalCost: 24.57,
      status: 'open',
    });
    expect(order.totalCost).to.equal(24.57);
    expect(order.status).to.equal('open');
  });

  it('default totalCost and status', async () => {
    const order = Order.build({});
    await order.validate();
    expect(order.totalCost).to.equal(0.0);
    expect(order.status).to.equal('open');
  });
}); // end describe('Order model')
