const router = require('express').Router();
const {
  models: { Product, Order, Order_Product },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.currentOrder(req.body.userId)
    const cartItems = await Order_Product.findAll({
      where: {
        orderId: order[0].id
      }
    })
    res.json(cartItems);
  } catch (error) {
    console.log('errors in order get route /', error);
    next(error);
  }
})


router.put('/addToCart', async (req, res, next) => {
  // cartTotal
  try {
    let cart;
    if(!req.body.orderId){
      cart = await Order.create({})
    } else{
      cart = await Order.findByPk(req.body.orderId);
    }
      const orderProduct = await Product.findByPk(req.body.productId);
      if(await cart.hasProduct(orderProduct)){
        let currentItem = await Order_Product.findOne({
          where: {
            orderId: cart.id,
            productId: req.body.productId
          },
        });
        const newQuantity = currentItem.quantity +1;
        await currentItem.update({quantity: newQuantity})
      } else {
        await cart.addProduct(orderProduct);
      }
      if(req.body.userId){
        console.log('does this run');
        cart.setUser(req.body.userId);
      }
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
    let currentItem = await Order_Product.findOne({
      where: {
        orderId: req.body.orderId,
        productId: req.body.productId
      },
    });
    if(!currentItem){
      console.log('You don\'t have any of these in your cart')
      res.send('You don\'t have any of these in your cart')
    } else {
      if(currentItem.quantity > 1){
        const newQuantity = currentItem.quantity -1;
        await currentItem.update({quantity: newQuantity})
      } else {
        cart.removeProduct(orderProduct);
      }
      // cart = await cart.update({totalCost: cart.cartTotal()})
      res.json(cart);
    }
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
    res.json(cart);
  } catch (error) {
    console.log('errors in order put route /checkout', error);
    next(error);
  }
});

