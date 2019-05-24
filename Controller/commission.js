const Commission = require('../Model/commission');

module.exports.getAddComm = (req, res, next) => {
    res.render('./commission/addComm', {
        title: 'Ajout commission'
    });
};
module.exports.postAddComm = (req, res, next) => {
    const nom = req.body.nom;;

    Commission.create({
        nom: nom
    }).then(a => {
        console.log('commission created');
        res.redirect('/commissionList');
    }).catch(err => console.log(err));
};


module.exports.getCommList = (req, res, next) => {
    Commission.findAll().then(comms => {
        res.render('./commission/commList', {
            title: 'Liste des commissions',
            tabComm: comms
        });
    }).catch(err => console.error(err));

};


module.exports.postDelComm = (req, res, next) => {
    const id = req.body.idComm;

    Commission.destroy(
        { where: { id: id } }
    ).then(a=>{
        console.log('Commission deleted');
        res.redirect('/commissionList');
    })
};

module.exports.getCommDetail = (req, res, next) => {
    const id= req.params.id
    Commission.findOne(
        {where: {id: id}}
    ).then(comm => {
        res.render('./commission/commDetail', {
            title: 'Details de '+comm.nom,
            comm: comm,
            members: []
        });
    }).catch(err => console.error(err));

};