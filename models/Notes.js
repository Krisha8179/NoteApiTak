const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Note = sequelize.define('note' , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
});

module.exports = Note;