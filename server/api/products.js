const router = require("express").Router();
const {
    models: { Product, Order }
} = require("../db");
module.exports = router;

// isAdmin middleware

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
