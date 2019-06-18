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
    tel: Sequelize.INTEGER,
    sexe: Sequelize.STRING,
    dateEntree: Sequelize.DATEONLY,
    dateSortie: Sequelize.DATEONLY,
    remplace: Sequelize.BOOLEAN,
    // remplacePar: {
    //     type: Sequelize.INTEGER,
    //     foreignKey: true,
    //     // references: {
    //     //     model: "Member",
    //     //     key: "id"
    //     // }
    // },
    aRemplace: Sequelize.INTEGER
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

Member.hasOne(Member, {
    as : "Remplaceur",
    foreignKey: "remplacePar"
});

module.exports = Member;