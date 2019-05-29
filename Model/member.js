const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Conseil = require('./conseil');

const Member = sequelize.define('member', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    adresse: Sequelize.STRING,
    tel: Sequelize.DOUBLE,
    sexe: Sequelize.STRING,
    dateEntree: Sequelize.DATEONLY,
    dateSortie: Sequelize.DATEONLY
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