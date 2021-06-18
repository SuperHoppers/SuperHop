const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    imageURL: {
        type: Sequelize.TEXT,
        defaultValue:
            "https://lh3.googleusercontent.com/proxy/ZPHeJRh5yDBt7aH3EmrHxihA85agsOr_vslPOWuEEuku4tqJZ8SrDcbKYe5iqMuGgJL2JvGQbObmGCU7h5gagKJhhalsqDEdDfCbKSyT1L6V8K3Dc0ofhMGFMm3VjDpODpZbQwFvh0I"
    },
    address: {
        type: Sequelize.TEXT,
        // allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        validate: {
            notEmpty: true
            //   len: [10,12]
        }
    }
    // do we need payment?
    // payment: {
    //     type: Sequelize.INTEGER,
    //     validate: {
    //         isNumeric: true,
    //         isCreditCard: true
    //     }
    // }
});

module.exports = User;

// User hasMany Oders
// Oders BelongsTo User.

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
    //we need to compare the plain version to an encrypted version of the password
    return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
    const user = await this.findOne({ where: { username } });
    if (!user || !(await user.correctPassword(password))) {
        const error = Error("Incorrect username/password");
        error.status = 401;
        throw error;
    }
    return user.generateToken();
};

User.findByToken = async function (token) {
    try {
        const { id } = await jwt.verify(token, process.env.JWT);
        const user = User.findByPk(id);
        if (!user) {
            throw "nooo";
        }
        return user;
    } catch (ex) {
        const error = Error("bad token");
        error.status = 401;
        throw error;
    }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
    //in case the password has been changed, we want to encrypt it with bcrypt
    if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
