/* global describe beforeEach it */

const { expect } = require("chai");
const {
    db,
    models: { User }
} = require("../server/db/index");
const jwt = require("jsonwebtoken");
const seed = require("../script/seed");

describe("User model", () => {
    let users;
    beforeEach(async () => {
        users = (await seed())[2];
    });

    describe("instanceMethods", () => {
        describe("generateToken", () => {
            it("returns a token with the id of the user", async () => {
                const token = await users[6].generateToken();
                const { id } = await jwt.verify(token, process.env.JWT);
                expect(id).to.equal(users[6].id);
            });
        }); // end describe('correctPassword')
        describe("authenticate", () => {
            let user;
            beforeEach(
                async () =>
                    (user = await User.create({
                        username: "sarah",
                        password: "123",
                        email: "sarah@gmail.com",
                        address: "123 St",
                        phoneNumber: "12345"
                    }))
            );
            describe("with correct credentials", () => {
                it("returns a token", async () => {
                    const token = await User.authenticate({
                        username: "amy",
                        password: "12345",
                        email: "amy@gmail.com",
                        address: "1234 St",
                        phoneNumber: "1234567"
                    });
                    expect(token).to.be.ok;
                });
            });
            describe("with incorrect credentials", () => {
                it("throws a 401", async () => {
                    try {
                        await User.authenticate({
                            username: "amy@gmail.com",
                            password: "12345"
                        });
                        throw "nooo";
                    } catch (ex) {
                        expect(ex.status).to.equal(401);
                    }
                });
            });
        }); // end describe('authenticate')
    }); // end describe('instanceMethods')
}); // end describe('User model')
