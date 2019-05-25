const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Admin= sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    pass: Sequelize.STRING
});

Admin.findOrCreate({ where: {
    username: 'admin',
    pass: 'admin'
}}).then(a=> console.log("admin cree"))
.catch(err=>console.log(err));
module.exports = Admin;