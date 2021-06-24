const router = require('express').Router();
const {
  models: { Product, Order, Order_Product, User },
} = require('../db');
const { requireToken } = require('./gatekeepingMiddleware');
module.exports = router;

// /api/orders/users/:userId
router.get('/users/:userId', async (req, res, next) => {
  try {
    const order = await Order.currentOrder(req.params.userId);
    res.json(order);
  } catch (error) {
    console.log('errors in order get route /', error);
    next(error);
  }
});

router.get('/users/:userId/openCart', async (req, res, next) => {
  try {
    const cart = await Order.currentOrder(req.params.userId);
    let orderId;
    if (!cart.length) {
      const newCart = await Order.create({ userId: req.params.userId });
      res.status(201).json(newCart);
      orderId = newCart.orderId;
    } else if (cart.length) {
      orderId = cart[0].dataValues.id;
    }
    const products = await Order_Product.findAll({
      where: {
        orderId: orderId,
      },
      attributes: ['quantity', 'orderId', 'productId'],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
  // try {
  //   const order = await Order.currentOrder(req.params.userId);
  //   // console.log('ORDER>>>>>>', order);
  //   if (order.length > 0) {
  //     const cartItems = await Order_Product.findAll({
  //       where: {
  //         orderId: order[0].dataValues.id,
  //       },
  //       include: [{ model: Product }],
  //     });
  //     console.log('CARTITEMS>>>>', cartItems);
  //     res.json(cartItems);
  //   } else {
  //     res.send('no-order');
  //   }
  // } catch (error) {
  //   console.log('errors in order get route /', error);
  //   next(error);
  // }
});

router.put('/addToCart', async (req, res, next) => {
  // cartTotal
  try {
    const cart = await Order.findByPk(req.body.orderId);
    const orderProduct = await Product.findByPk(req.body.productId);
    if (await cart.hasProduct(orderProduct)) {
      let currentItem = await Order_Product.findOne({
        where: {
          orderId: cart.id,
          productId: req.body.productId,
        },
      });
      const newQuantity = currentItem.quantity + 1;
      await currentItem.update(
        { quantity: newQuantity },
        { individualHooks: true }
      );
    } else {
      await cart.addProduct(orderProduct, { individualHooks: true });
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
        productId: req.body.productId,
      },
    });
    if (!currentItem) {
      console.log("You don't have any of these in your cart");
      res.send("You don't have any of these in your cart");
    } else {
      if (currentItem.quantity > 1) {
        const newQuantity = currentItem.quantity - 1;
        await currentItem.update({ quantity: newQuantity });
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

router.put('/:orderId/checkout', async (req, res, next) => {
  // clearOrder
  try {
    // console.log('REQPARAMS>>>>', req.params);
    // const cart = await Order.currentOrder(req.params.userId);
    // const cart = await Order.findByPk(req.body.orderId);
    const cart = await Order.findByPk(req.params.orderId);
    const order = await Order_Product.findAll({
      where: {
        orderId: cart,
      },
      attributes: ['lineTotal'],
    });
    let totalCost = order.reduce((accum, item) => {
      return accum + item.lineTotal;
    }, 0);
    // console.log('TOTALCOST>>>>>', totalCost);
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
    await newOrder.addProduct(orderProduct, { individualHooks: true });
    await newOrder.setUser(req.body.userId);
    res.json(newOrder);
  } catch (error) {
    console.log('errors in order put route /checkout', error);
    next(error);
  }
});

router.post('/guestCheckout', async (req, res, next) => {
  try {
    const cart = req.body;
    const newOrder = await Order.create({ status: 'closed' });
    for (let product in cart) {
      const line = await Order_Product.create({
        orderId: newOrder.id,
        productId: product,
        quantity: cart[product],
      });
    }
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});
