const { expect } = require('chai');
const {
  models: { Product },
} = require('../server/db/index');

describe('Order model', () => {
  it('has fields productName, inventory, price, description, imageUrl, type', async () => {
    const order = await Product.create({
      name: 'blooper',
      inventory: 4000,
      price: 700,
      description: 'bloop bloop',
      imageURL: 'blue.jpg',
    });
    console.log('PRODUCT CONSOLE LOG', typeof order.inventory);
    expect(order.name).to.equal('blooper');
    expect(order.inventory).to.equal(4000);
    expect(order.price).to.equal(700);
    expect(order.description).to.equal('bloop bloop');
    expect(order.imageURL).to.equal('blue.jpg');
  });

  describe('Instance methods on Product model', function () {
    it('returns the price of the product', function () {
      const prod = Product.create({
        name: 'supernose',
        price: 1,
        inventory: 30000000,
        description:
          "No one wants to smell their neighbor's dirty socks. Or who is microwaving fish in the neighborhood.",
        imageURL:
          'http://sciencenewsjournal.com/wp-content/uploads/2016/09/invisibility-990x515.jpg',
      });

      expect(prod.findPrice()).to.equal(1);
    });
  });
});
