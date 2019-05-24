const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Conseil = require('./conseil');


const Commission = sequelize.define('commission', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    timestamps: false
});

// Setting up relations between modals
Commission.belongsTo(Conseil, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Conseil.hasMany(Commission, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});



module.exports = Commission;