const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");

const { isAdminMiddleware } = require("./gatekeepingMiddleware");
module.exports = router;

// const isAdminMiddleware = (req, res, next) => {
//   if (!req.authorization || !req.authorization.isAdmin) {
//     const err = new Error(`You aren't authorized to do that`);
//     err.status = 401;
//     next(err);
//   } else {
//     next();
//   }
// };

const isUserMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    const err = new Error();
    // `You aren't authorized to do that as a guest, or to someone else\'s information. Please log in. Or, if this is not you, stop trying to find someone else\'s address. We do not give away secret lair information here.`
    err.status = 401;
    next(err);
  } else {
    next();
  }
};

router.get("/", isAdminMiddleware, async (req, res, next) => {
  // list of all user ids and usernames
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    if (!users) {
      res.status(404).send("No users found");
    } else {
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
});

//ADMIN ROUTES
//admin find all users
router.get("/", isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "address",
        "phone number",
        "imageURL",
        "isAdmin",
      ],
    });
    if (!users) {
      res.status(404).send("No users found");
    } else {
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
});

//admin find one user by userid
router.get("/:userId", isAdminMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [
        "id",
        "username",
        "email",
        "address",
        "phone number",
        "imageURL",
        "isAdmin",
      ],
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

//admin find one user by username
router.get("/:username", isAdminMiddleware, async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        username: req.params.username,
      },
      attributes: [
        "id",
        "username",
        "email",
        "address",
        "phone number",
        "imageURL",
        "isAdmin",
      ],
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

// admin/products
router.get("/products", isAdminMiddleware, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "price",
        "name",
        "inventory",
        "description",
        "imageURL",
        "type",
      ],
    });
    res.json(products);
  } catch (error) {
    console.log("error getting product list", error);
    next(error);
  }
});

// /admin/products/create
router.post("/create", isAdminMiddleware, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    console.log("error creating new products", error);
    next(error);
  }
});

//admin update user info
router.put("/:userId", isAdminMiddleware, async (req, res, next) => {
  try {
    const [updatedRowCount, updatedUserInfo] = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
    });
    res.json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

//admin delete user
router.delete("/userId", isAdminMiddleware, async (req, res, next) => {
  try {
    let destroyedUser = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    if (!destroyedUser) {
      res
        .status(404)
        .send(
          "Nothing to destroy. Either this user did not exist, or someone else beat you to it."
        );
    } else {
      res.status(200).redirect("/");
    }
  } catch (error) {
    next(error);
  }
});

//USER SELF-EDIT ROUTES
//user get info by id
router.get("/:userId", isUserMiddleware, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [
        "id",
        "username",
        "email",
        "address",
        "phone number",
        "imageURL",
        "isAdmin",
      ],
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

//user find one user by username
router.get("/:username", isUserMiddleware, async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        username: req.params.username,
      },
      attributes: [
        "id",
        "username",
        "email",
        "address",
        "phone number",
        "imageURL",
        "isAdmin",
      ],
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

//user update user info
router.put("/:userId", isUserMiddleware, async (req, res, next) => {
  try {
    const [updatedRowCount, updatedUserInfo] = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
    });
    res.json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

//user delete self
router.delete("/userId", isUserMiddleware, async (req, res, next) => {
  try {
    let destroyedUser = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    if (!destroyedUser) {
      res
        .status(404)
        .send(
          "Nothing to destroy. Either this user did not exist, or someone else beat you to it."
        );
    } else {
      res.status(200).redirect("/");
    }
  } catch (error) {
    next(error);
  }
});

//User GET CART with eager loading
router.get("/:id/cart", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id, {
      attributes: ["id", "username"],
      include: [
        {
          model: Order,
          where: { status: "open" },
          attributes: ["id"],
        },
      ],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
