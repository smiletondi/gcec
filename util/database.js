const Sequelize= require('sequelize')

const sequelize= new Sequelize('gcec','root','root',{
    dialect: 'mysql',
    host:'localhost'
});

sequelize.sync(
    // { force: true}  
);

module.exports= sequelize;