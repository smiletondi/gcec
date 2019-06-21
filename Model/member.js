const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Conseil = require('./conseil');

var Member = sequelize.define('member', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    adresse: Sequelize.STRING,
    email: Sequelize.STRING,
    tel: Sequelize.DOUBLE,
    sexe: Sequelize.STRING,
    dateEntree: Sequelize.DATEONLY,
    dateSortie: Sequelize.DATEONLY,
    remplace: Sequelize.BOOLEAN,
    statut: Sequelize.STRING
}, {
        timestamps: false
    });


// Setting up relations between modals (Member and Commission)
Member.belongsTo(Conseil, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});
Conseil.hasMany(Member, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

module.exports = Member;