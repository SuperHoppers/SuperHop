const router = require("express").Router();
const {
    models: { Product, Order }
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
    try {
        const OrderProduct = await Order.create({ 'status': "open" });
        res.json(OrderProduct);
    } catch (error) {
        console.log("error posting order", error);
        next(error);
    }
});



// router.put('/', async (req, res, next)=> {
//   try {
//     const addProduct = await Product.
//   } catch (error) {
    
//   }
// })