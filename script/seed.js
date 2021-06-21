"use strict";

const {
  db,
  models: { User, Order, Order_Product, Product },
} = require("../server/db");

const users = [
  {
    username: "cody",
    password: "123",
    email: "cody@gmail.com",
    address: "123 St",
    phoneNumber: "123456",
    isAdmin: false,
  },
  {
    username: "murphy",
    password: "123",
    email: "murphy@gmail.com",
    address: "123 St",
    phoneNumber: "123456",
    isAdmin: false,
  },
  {
    username: "ian",
    password: "123",
    email: "ian@gmail.com",
    address: "123 St",
    phoneNumber: "123456",
    isAdmin: false,
  },
  {
    username: "bobo",
    password: "123",
    email: "bobo@gmail.com",
    address: "123 St",
    phoneNumber: "123456",
    isAdmin: false,
  },
  {
    username: "noah",
    password: "123",
    email: "noah@gmail.com",
    address: "123 St",
    phoneNumber: "123456",
    isAdmin: false,
  },
  {
    username: "ava",
    password: "12345",
    email: "ava@gmail.com",
    address: "1234 St",
    phoneNumber: "1234567",
    isAdmin: true,
  },
  {
    username: "amy",
    password: "12345",
    email: "amy@gmail.com",
    address: "1234 St",
    phoneNumber: "1234567",
    isAdmin: true,
  },
];

const products = [
  {
    name: "Invisibility",
    price: 10000,
    inventory: 250,
    description:
      "With this power you can make yourslef completely transparent so that nothing with eyes can detect you.",
    imageURL:
      "http://sciencenewsjournal.com/wp-content/uploads/2016/09/invisibility-990x515.jpg",
  },
  {
    name: "Flight",
    price: 15000,
    inventory: 400,
    description:
      "Take to the skies with this power! This will give you the ability to levitate and soar through the sky!",
    imageURL:
      "http://vertassets.blob.core.windows.net/image/af7569bd/af7569bd-720d-4ea6-b65c-f8bc480ce34d/superhero_hovering_sky_thinkstockphotos_482621066_450x300.png",
  },
  {
    name: "Superhuman Speed",
    price: 50000,
    inventory: 100,
    description: "Travel anywhere, anytime you want, with no delay!",
    imageURL:
      "https://i.pinimg.com/originals/8c/14/37/8c1437a5771aec274e0596617f8fe124.jpg",
  },
  {
    name: "Mind Reading",
    price: 30000,
    inventory: 200,
    description:
      "Wonder what the people around you are thinking? Wonder no more!",
    imageURL:
      "http://bsmedia.business-standard.com/_media/bs/img/article/2017-11/15/full/1510685489-392.jpg",
  },
  {
    name: "Mind Control/Hypnosis",
    price: 1000000,
    inventory: 50,
    description:
      "Gain the ability to interface with machines, send messages, and even exercise control one's own biological functions!",
    imageURL:
      "https://www.superherodb.com/pictures2/portraits/10/050/113.jpg?v=1596390891",
  },
  {
    name: "Night Vision",
    price: 25000,
    inventory: 500,
    description: "Get the ability to see in low-light conditions.",
    imageURL:
      "https://agamikalarab.files.wordpress.com/2019/09/img-20190916-wa0084-e1568707985214.jpg",
  },
  {
    name: "Fire Bending",
    price: 50000,
    inventory: 150,
    description:
      "Have infinite and all abilities and powers based on fire. At the pinnacle, users are all-powerful and omnipotent over and in fire",
    imageURL: "https://miro.medium.com/max/300/0*UNRo5pPjP6uMFFsv.",
  },
  {
    name: "Water Bending",
    price: 50000,
    inventory: 150,
    description:
      "Gain hte ability to manipulate water in every form possible, the basic three being liquid, solid and gas, as well as transform it from one phase to another.",
    imageURL:
      "https://i.pinimg.com/originals/b8/ce/1d/b8ce1d32cba3bd3251be9bbb3745362e.jpg",
  },
  {
    name: "Earth Bending",
    price: 50000,
    inventory: 150,
    description:
      "The User can create, shape and manipulate the energies of the Earth, including geothermal energy and geomagnetism, as a force to crush objects",
    imageURL:
      "https://i.pinimg.com/originals/13/f5/d2/13f5d2e549aaa606349fb31a443ec591.jpg",
  },
  {
    name: "Air Bending",
    price: 50000,
    inventory: 0,
    description:
      "The user can create, shape and manipulate the energies of the air, emitting the air energy as a force to project energy bolts, force-fields, weaponry and/or manipulate aspects of air, such as gases, wind, etc.",
    imageURL:
      "https://i.pinimg.com/originals/f5/dc/c9/f5dcc93349357dcc22ddf784ee23781d.png",
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

// async function seed() {
//   await db.sync({ force: true }); // clears db and matches models to tables
//   console.log('db synced!');
// }
// Creating Users
// const users = await Promise.all([
//   User.create({ username: 'cody', password: '123' }),
//   User.create({ username: 'murphy', password: '123' }),
// ]);

// Creating Orders
const orders = [
  {
    userId: "1",
    status: "open",
  },
  {
    userId: "1",
    status: "closed",
  },
];

// Creating Users
const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log("db synced!");
    // seed users database
    const seedUsers = await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    // seed products database
    const seedProducts = await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );
    const seedOrders = await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      })
    );
    console.log("successfully seeded!");
    return [seedOrders, seedProducts, seedUsers];
  } catch (err) {
    console.log(err);
  }
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
