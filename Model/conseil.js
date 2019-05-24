const Sequelize= require('sequelize');
const sequelize= require('../util/database');

const Conseil= sequelize.define('conseil',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    debutPeriode: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    finPeriode: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    timestamps: false
});


module.exports= Conseil;