const router = require('express').Router();
const {
  models: { Product, Order },
} = require('../db');
const { requireToken, isAdminMiddleware } = require('./gatekeepingMiddleware');
module.exports = router;

// // isAdmin middleware
// const isAdminMiddleware = (req, res, next) => {
//   // if the current user doesn't have an account/not logged in
//   // or if the current user is logged in but is not admin
//   // they cannot add/edit/delete products
//   if (!req.authorization || !req.authorization.isAdmin) {
//     const err = new Error(`You aren't authorized to do that`);
//     err.status = 401;
//     next(err);
//   } else {
//     next();
//   }
// };

router.get('/', async (req, res, next) => {
  try {
    console.log('REQ.headers>>>', req.headers);
    const products = await Product.findAll({
      attributes: [
        'id',
        'price',
        'name',
        'inventory',
        'description',
        'imageURL',
        'type',
      ],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      attributes: [
        'id',
        'price',
        'name',
        'inventory',
        'description',
        'imageURL',
        'type',
      ],
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//
// router.get("/products", isAdminMiddleware, async (req, res, next) => {
//     try {
//       const products = await Product.findAll({
//         attributes: [
//           "id",
//           "price",
//           "name",
//           "inventory",
//           "description",
//           "imageURL",
//           "type",
//         ],
//       });
//       res.json(products);
//     } catch (error) {
//       console.log("error getting product list", error);
//       next(error);
//     }
//   });

// /products/create
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    console.log('error creating new products', error);
    next(error);
  }
});

// /products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(req.params.productId);
    res.json(await updatedProduct.update(req.body));
  } catch (error) {
    next(error);
  }
});

// /products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    const removedProduct = await Product.findByPk(req.params.productId);
    await removedProduct.destroy();
    res.json(removedProduct);
  } catch (error) {
    next(error);
  }
});
