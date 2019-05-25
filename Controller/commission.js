const Commission = require('../Model/commission');
const Conseil = require('../Model/conseil');
const Member = require('../Model/member');
const { validationResult }= require('express-validator/check')

module.exports.getAddComm = (req, res, next) => {
    res.render('./commission/addComm', {
        title: 'Ajout commission',
        errors: []
    });
};
module.exports.postAddComm = (req, res, next) => {
    const nom = req.body.nom;
    const errors= validationResult(req);

    if( !errors.isEmpty()){
        return res.render('./commission/addComm', {
            title: 'Ajout commission',
            errors: errors.array()
        });
    }

    Commission.create({
        nom: nom
    }).then(a => {
        console.log('commission created');
        res.redirect('/commissionList');
    }).catch(err => console.log(err));
};


module.exports.getCommList = async (req, res, next) => {
    const conseils = await Conseil.findAll();
    const conseilId = req.query.conseil;
    if (conseilId) {
        return Commission.findAll({
            where: { conseilId: conseilId }
        }).then(comms => {
            res.render('./commission/commList', {
                title: 'Liste des commissions',
                tabComm: comms,
                tabCons: conseils,
                c: conseilId
            });
        }).catch(err => console.error(err));
    }
    Commission.findAll().then(comms => {
        res.render('./commission/commList', {
            title: 'Liste des commissions',
            tabComm: comms,
            tabCons: conseils,
            c: conseilId
        });
    }).catch(err => console.error(err));

};


module.exports.postDelComm = (req, res, next) => {
    const id = req.body.idComm;

    Commission.destroy(
        { where: { id: id } }
    ).then(a => {
        console.log('Commission deleted');
        res.redirect('/commissionList');
    })
};

module.exports.getCommDetail = (req, res, next) => {
    const id = req.params.id
    Commission.findOne(
        { where: { id: id }, include: [Member] }
    ).then(comm => {
        res.render('./commission/commDetail', {
            title: 'Details de ' + comm.nom,
            comm: comm,
            members: comm.members
        });
    }).catch(err => console.error(err));

};