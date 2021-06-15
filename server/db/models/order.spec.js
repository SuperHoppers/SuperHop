/* global describe beforeEach it */

const { expect } = require('chai');
const {
  models: { Order },
} = require('../index');

describe('Order model', () => {
  it('has fields orderId, customerId, totalCost, status, itemsInOrder', async () => {
    const order = await Order.create({
      id: '1298fdska',
      customerId: '21312jehk',
      totalCost: 24.57,
      status: 'open',
      itemsInOrder: ['invisibility', 'teleporation', 'telekinesis'],
    });
    expect(order.id).to.equal('1298fdska');
    expect(order.customerId).to.equal('21312jehk');
    expect(order.totalCost).to.equal(24.57);
    expect(order.status).to.equal('open');
    expect(order.itemsInOrder).to.equal([
      'invisibility',
      'teleporation',
      'telekinesis',
    ]);
  });

  it('id and customerId cannot be empty', async () => {
    const order = Order.build({ id: '', customerId: '' });
    try {
      await order.validate();
      throw Error('validation should have failed with empty id and customerId');
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on id');
      expect(err.message).to.contain('Validation notEmpty on customerId');
    }
  });

  it('default totalCost and status', async () => {
    const order = Order.build({
      id: '1298fdska',
      customerId: '21312jehk',
    });
    await order.validate();
    expect(order.totalCost).to.equal(0.0);
    expect(order.status).to.equal('open');
  });
}); // end describe('Order model')
