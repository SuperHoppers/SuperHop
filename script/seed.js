"use strict";

const {
    db,
    models: { User }
} = require("../server/db");

const products = [
  {
    name: 'Invisibility',
    price: 10000,
    inventory: 250,
    description: 'With this power you can make yourslef completely transparent so that nothing with eyes can detect you.',
    imageURL: 'http://sciencenewsjournal.com/wp-content/uploads/2016/09/invisibility-990x515.jpg'
  },
  {
    name: 'Flight',
    price: 15000,
    inventory: 400,
    description: 'Take to the skies with this power! This will give you the ability to levitate and soar through the sky!',
    imageURL: '',
  },
  {
    name: 'Mind Reading',
    price: 0,
    inventory: 0,
    description: '',
    imageURL: '',
  }
]

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    // Creating Users
    const users = await Promise.all([
        // 1
        User.create({
            username: "cody",
            password: "123",
            email: "cody@gmail.com",
            address: "123 St",
            phoneNumber: "123456",
            isAdmin: false
        }),
        // 2
        User.create({
            username: "murphy",
            password: "123",
            email: "murphy@gmail.com",
            address: "123 St",
            phoneNumber: "123456",
            isAdmin: false
        }),
        // 3
        User.create({
            username: "ian",
            password: "123",
            email: "ian@gmail.com",
            address: "123 St",
            phoneNumber: "123456",
            isAdmin: false
        }),
        // 4
        User.create({
            username: "bobo",
            password: "123",
            email: "bobo@gmail.com",
            address: "123 St",
            phoneNumber: "123456",
            isAdmin: false
        }),
        // 5
        User.create({
            username: "noah",
            password: "123",
            email: "noah@gmail.com",
            address: "123 St",
            phoneNumber: "123456",
            isAdmin: false
        }),
        // 6
        User.create({
            username: "ava",
            password: "12345",
            email: "ava@gmail.com",
            address: "1234 St",
            phoneNumber: "1234567",
            isAdmin: true
        }),
        // 7
        User.create({
            username: "amy",
            password: "12345",
            email: "amy@gmail.com",
            address: "1234 St",
            phoneNumber: "1234567",
            isAdmin: true
        })
    ]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    return {
        users: {
            cody: users[0],
            murphy: users[1],
            ian: users[2],
            bobo: users[3],
            noah: users[4],
            ava: users[5],
            amy: users[6]
        }
    };
}

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
