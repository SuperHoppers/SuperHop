const { expect } = require('chai');
const {
  models: { Product },
} = require('../index');

describe('Order model', () => {
  it('has fields productName, inventory, price, description, imageUrl, type', async () => {
    const order = await Product.create({
      productName: 'blooper',
      inventory: 4000,
      price: 700,
      description: 'bloop bloop',
      imageUrl: 'blue.jpg',
    });
    expect(order.productName).to.equal('blooper');
    expect(order.inventory).to.equal(4000);
    expect(order.price).to.equal(700);
    expect(order.description).to.equal('bloop bloop');
    expect(order.imageUrl).to.equal('blue.jpg');
  });
});
