const Sequelize= require('sequelize');
const sequelize= require('../util/database');

const Conseil= sequelize.define('conseil',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    debutPeriode: Sequelize.DATEONLY,
    finPeriode: Sequelize.DATEONLY,
    nom: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    timestamps: false
});


module.exports= Conseil;