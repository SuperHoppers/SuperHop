const router = require('express').Router();
const {
  models: { Product, Order, Order_Product, User },
} = require('../db');
module.exports = router;

// /api/orders/users/:userId
router.get('/users/:userId', async (req, res, next) => {
  try {
    const order = await Order.currentOrder(req.params.userId)
    res.json(order);
  } catch (error) {
    console.log('errors in order get route /', error);
    next(error);
  }
})
router.get('/users/:userId/openCart', async (req, res, next) => {
  try {
    const order = await Order.currentOrder(req.params.userId)
    if(order.length > 0){
      const cartItems = await Order_Product.findAll({
        where: {
          orderId: order[0].id
        }
      })
      res.json(cartItems);
    } else {
      res.send('no-order')
    }
  } catch (error) {
    console.log('errors in order get route /', error);
    next(error);
  }
})


router.put('/addToCart', async (req, res, next) => {
  // cartTotal
  try {

     const cart = await Order.findByPk(req.body.orderId);
      const orderProduct = await Product.findByPk(req.body.productId);
      if(await cart.hasProduct(orderProduct)){
        let currentItem = await Order_Product.findOne({
          where: {
            orderId: cart.id,
            productId: req.body.productId
          },
        });
        const newQuantity = currentItem.quantity +1;
        await currentItem.update({quantity: newQuantity}, {individualHooks: true})
      } else {
        await cart.addProduct(orderProduct, {individualHooks: true});
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

router.post('/newOrder', async (req, res, next) => {
  try {
    const newOrder = await Order.create({});
    const orderProduct = await Product.findByPk(req.body.productId);
    await newOrder.addProduct(orderProduct, {individualHooks: true});
    await newOrder.setUser(req.body.userId)
    res.json(newOrder);
  } catch (error) {
    console.log('errors in order put route /checkout', error);
    next(error)
  }
})

router.post('/guestCheckout', async (req, res, next) => {
  try {
    const cart = req.body;
    const newOrder = await Order.create({status: 'closed'})
    for(let product in cart){
      const line = await Order_Product.create({orderId: newOrder.id, productId: product, quantity: cart[product]})
    }
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})
