const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Commission = require('./commission');
const Member = require('./member');

const CommissionMembers = sequelize.define('commissionMembers', {

}, {
    timestamps: false
});

Member.belongsToMany(Commission, {
    through: CommissionMembers
});
Commission.belongsToMany(Member, {
    through: CommissionMembers
});

module.exports = CommissionMembers;