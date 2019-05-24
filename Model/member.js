const Sequelize= require('sequelize');
const sequelize= require('../util/database');
const Commission= require('./commission');

const Member= sequelize.define('member', {
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    adresse: Sequelize.STRING,
    tel: Sequelize.INTEGER,
    sexe: Sequelize.STRING,
},{
    timestamps: false
});

// Setting up relations between modals
Member.belongsTo(Commission, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Commission.hasMany(Member, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});


module.exports= Member;