const Sequleize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type:Sequleize.INTEGER,
        autoIncreament: true,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = Cart;