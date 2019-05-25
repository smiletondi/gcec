const Conseil = require('../Model/conseil');
const Commision= require("../Model/commission");
const Member= require("../Model/member");

module.exports.getConseilList = (req, res, next) => {
    Conseil.findAll().then(conseils => {
        // console.log(conseils);
        res.render('./conseil/conseilList', {
            title: 'Liste des conseils',
            tabCons: conseils
        });
    })

}
module.exports.getAddConseil = (req, res, next) => {
    res.render('./conseil/addConseil', {
        title: 'Ajout de conseil'
    });
};
module.exports.postAddConseil =  (req, res, next) => {
    const nom = req.body.nom;
    const debut = req.body.debut;
    const fin = req.body.fin;

    Conseil.create({
        debutPeriode: debut,
        finPeriode: fin,
        nom: nom
    }).then(async cons => {
        const c1= await Commision.create({nom: 'Commission de budget',conseilId: cons.id});
        const c2= await Commision.create({nom: 'Commission des affaires pedagogique',conseilId: cons.id});
        const c3= await Commision.create({nom: 'Commission de la recherche',conseilId: cons.id});
        const c4= await Commision.create({nom: 'Commission scientifique',conseilId: cons.id});
        const c5= await Commision.create({nom: 'Commission des affaires culturelles sociales et sportives',conseilId: cons.id});
        console.log('conseil Created');
        res.redirect('/conseilList');
    }).catch(err => console.error(err));

};

module.exports.postDeleteCons = (req, res, next) => {
    const idConseil = req.body.idConseil;

    Conseil.destroy(
        { where: { id: idConseil } }
    ).then(co=>{
        console.log('Conseil deleted');
        res.redirect('/conseilList');
    })

};

module.exports.getConseilDetail = (req, res, next) => {
    const id = req.params.idConseil
    Conseil.findOne(
        { where: { id: id }, include: [Member] }
    ).then(cons => {
        res.render('./conseil/conseilDetail', {
            title: 'Details de ' + cons.nom,
            conseil: cons,
            members: cons.members
        });
    }).catch(err => console.error(err));

};