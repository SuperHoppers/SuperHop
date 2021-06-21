const router = require("express").Router();
const {
    models: { Product, Order }
} = require("../db");
const { isAdminMiddleware } = require("./gatekeepingMiddleware");
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

router.get("/", async (req, res, next) => {
    try {
        const products = await Product.findAll({
            attributes: [
                "id",
                "price",
                "name",
                "inventory",
                "description",
                "imageURL",
                "type"
            ]
        });
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.get("/:productId", async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.productId, {
            attributes: [
                "id",
                "price",
                "name",
                "inventory",
                "description",
                "imageURL",
                "type"
            ]
        });
        res.json(product);
    } catch (error) {
        next(error);
    }
});
