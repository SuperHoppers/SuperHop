'use strict';

const {
  db,
  models: { User, Order, Order_Product },
} = require('../server/db');
  models: { User, Product },
} = require('../server/db');

const users = [
  {
    username: 'cody',
    password: '123',
    email: 'cody@gmail.com',
    address: '123 St',
    phoneNumber: '123456',
    isAdmin: false,
  },
  {
    username: 'murphy',
    password: '123',
    email: 'murphy@gmail.com',
    address: '123 St',
    phoneNumber: '123456',
    isAdmin: false,
  },
  {
    username: 'ian',
    password: '123',
    email: 'ian@gmail.com',
    address: '123 St',
    phoneNumber: '123456',
    isAdmin: false,
  },
  {
    username: 'bobo',
    password: '123',
    email: 'bobo@gmail.com',
    address: '123 St',
    phoneNumber: '123456',
    isAdmin: false,
  },
  {
    username: 'noah',
    password: '123',
    email: 'noah@gmail.com',
    address: '123 St',
    phoneNumber: '123456',
    isAdmin: false,
  },
  {
    username: 'ava',
    password: '12345',
    email: 'ava@gmail.com',
    address: '1234 St',
    phoneNumber: '1234567',
    isAdmin: true,
  },
  {
    username: 'amy',
    password: '12345',
    email: 'amy@gmail.com',
    address: '1234 St',
    phoneNumber: '1234567',
    isAdmin: true,
  },
];

const products = [
  {
    name: 'Invisibility',
    price: 10000,
    inventory: 250,
    description:
      'With this power you can make yourslef completely transparent so that nothing with eyes can detect you.',
    imageURL:
      'http://sciencenewsjournal.com/wp-content/uploads/2016/09/invisibility-990x515.jpg',
  },
  {
    name: 'Flight',
    price: 15000,
    inventory: 400,
    description:
      'Take to the skies with this power! This will give you the ability to levitate and soar through the sky!',
    imageURL:
      'https://i.pinimg.com/originals/8d/b9/70/8db97052d469811449a6f5dab240e28d.gif',
  },
  {
    name: 'Superhuman Speed',
    price: 50000,
    inventory: 100,
    description: 'Travel anywhere, anytime you want, with no delay!',
    imageURL:
      'https://static.wikia.nocookie.net/powerlisting/images/3/34/Quicksilver_and_The_Flash.jpg/revision/latest/scale-to-width-down/1000?cb=20210216111242',
  },
  {
    name: 'Mind Reading',
    price: 30000,
    inventory: 200,
    description:
      'Wonder what the people around you are thinking? Wonder no more!',
    imageURL:
      'https://static.wikia.nocookie.net/powerlisting/images/2/20/Suus_mind_read.jpg/revision/latest/scale-to-width-down/1000?cb=20151107083013',
  },
  {
    name: 'Mind Control/Hypnosis',
    price: 1000000,
    inventory: 50,
    description:
      "Gain the ability to interface with machines, send messages, and even exercise control one's own biological functions!",
    imageURL:
      'https://static.wikia.nocookie.net/powerlisting/images/c/c0/Heroes_mind_control.gif/revision/latest/scale-to-width-down/245?cb=20140220155818',
  },
  {
    name: 'Night Vision',
    price: 25000,
    inventory: 500,
    description: 'Get the ability to see in low-light conditions.',
    imageURL: '',
  },
  {
    name: 'Fire Bending',
    price: 50000,
    inventory: 150,
    description:
      'Have infinite and all abilities and powers based on fire. At the pinnacle, users are all-powerful and omnipotent over and in fire',
    imageURL:
      'https://static.wikia.nocookie.net/powerlisting/images/d/d8/Roku.gif/revision/latest/scale-to-width-down/552?cb=20180707031529',
  },
  {
    name: 'Water Bending',
    price: 50000,
    inventory: 150,
    description:
      'Gain hte ability to manipulate water in every form possible, the basic three being liquid, solid and gas, as well as transform it from one phase to another.',
    imageURL:
      'https://static.wikia.nocookie.net/powerlisting/images/8/80/Korra_water.gif/revision/latest/scale-to-width-down/500?cb=20171128055528',
  },
  {
    name: 'Earth Bending',
    price: 50000,
    inventory: 150,
    description:
      'The User can create, shape and manipulate the energies of the Earth, including geothermal energy and geomagnetism, as a force to crush objects',
    imageURL:
      'https://static.wikia.nocookie.net/powerlisting/images/0/00/Avatar_Kyoshi_Earthbending.gif/revision/latest/scale-to-width-down/640?cb=20200224050526',
  },
  {
    name: 'Air Bending',
    price: 50000,
    inventory: 0,
    description:
      'The user can create, shape and manipulate the energies of the air, emitting the air energy as a force to project energy bolts, force-fields, weaponry and/or manipulate aspects of air, such as gases, wind, etc.',
    imageURL:
      'https://static.wikia.nocookie.net/powerlisting/images/1/11/Wendy_sky_dragon.gif/revision/latest/scale-to-width-down/400?cb=20180607094356',
  },
];


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  // Creating Orders
  const orders = await Promise.all([
    Order.create({
      status: 'closed',
      userId: 1,
      Order_ProductId: [],
    }),
    Order.create({
      status: 'open',
      userId: 2,
      Order_ProductId: [],
    }),
  ]);


// Creating Users
const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log('db synced!');
    // seed users database
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    // seed products database
    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );
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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
