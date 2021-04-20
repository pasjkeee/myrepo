const Sequelize = require('sequelize');
const DB_NAME = 'diplom';
const USER_NAME = 'root';
const PASS = 'root';
const sequelize = new Sequelize(DB_NAME, USER_NAME, PASS, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize;