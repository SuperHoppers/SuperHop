const router = require('express').Router();
const {
  models: { Product, Order },
} = require('../db');
module.exports = router;

router.put('/addToCart', async (req, res, next) => {
  // cartTotal
  try {
    const cart = await Order.findByPk(req.body.orderId);
    const orderProduct = await Product.findByPk(req.body.productId);
    cart.addProduct(orderProduct);
    res.json(cart);
  } catch (error) {
    console.log('errors in order put route /addToCart', error);
    next(error);
  }
});

router.put('/removeFromCart', async (req, res, next) => {
  // cartTotal
  try {
    const cart = await Order.findByPk(req.body.orderId);
    const orderProduct = await Product.findByPk(req.body.productId);
    cart.removeProduct(orderProduct);
    // cart = await cart.update({totalCost: cart.cartTotal()})
    res.json(cart);
  } catch (error) {
    console.log('errors in order put route /removeFromCart', error);
    next(error);
  }
});

router.put('/checkout', async (req, res, next) => {
  // clearOrder
  try {
    const cart = await Order.findByPk(req.body.orderId);
    cart.update({ status: 'closed' });
    const newCart = await Order.create({ status: 'open' });
    res.json(newCart);
  } catch (error) {
    console.log('errors in order put route /checkout', error);
    next(error);
  }
});

// post after checkout only
router.post('/', async (req, res, next) => {
  try {
    const OrderProduct = await Order.create({ status: 'open' });
    res.json(OrderProduct);
  } catch (error) {
    console.log('error posting order', error);
    next(error);
  }
});
