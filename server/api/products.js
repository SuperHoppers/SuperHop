const router = require('express').Router();
const {
  models: { Product, Order },
} = require('../db');
const { requireToken} = require('./gatekeepingMiddleware');
module.exports = router;


router.get('/', async (req, res, next) => {
  try {
    console.log(req.headers, ">>>>req.headers")
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




// /products/create
router.post('/', requireToken, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    console.log('error creating new products', error);
    next(error);
  }
});

// /products/:productId
router.put('/:productId', requireToken, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(req.params.productId);
    res.json(await updatedProduct.update(req.body));
  } catch (error) {
    next(error);
  }
});

// /products/:productId
router.delete('/:productId', requireToken, async (req, res, next) => {
  try {
    const removedProduct = await Product.findByPk(req.params.productId);
    await removedProduct.destroy();
    res.json(removedProduct);
  } catch (error) {
    next(error);
  }
});
