const Member = require('../Model/member');


module.exports.getAddMember = (req, res, next) => {
    const commId = req.query.commission;
    const conseilId = req.query.conseil;

    if (commId) {
        res.render('./member/addMember.ejs', {
            title: 'Ajouter un membre',
            id: commId,
            type: 'commission'
        });
    } else if (conseilId) {
        res.render('./member/addMember.ejs', {
            title: 'Ajouter un membre',
            id: conseilId,
            type: 'conseil'
        });
    }
}
module.exports.postAddMember = (req, res, next) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const adresse = req.body.adresse;
    const tel = req.body.tel;
    const sexe = req.body.sexe;
    const id = req.body.id;
    const type = req.body.type;

    if (type == 'conseil') {
        Member.create({
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            tel: tel,
            sexe: sexe,
            conseilId: id
        }).then(a => {
            console.log('Conseil Member created');
            res.redirect('/conseil/' + id);
        }).catch(err => console.error(err));
    } else if (type == 'commission') {
        Member.create({
            nom: nom,
            prenom: prenom,
            adresse: adresse,
            tel: tel,
            sexe: sexe,
            commissionId: id
        }).then(a => {
            console.log('Commission Member created');
            res.redirect('/commission/' + id);
        }).catch(err => console.error(err));
    }



}

module.exports.postdeleteMember = (req, res, next) => {
    const id = req.body.memberId;
    // let member;
    const previousUrl= req.header('Referer');   // You can also use req.get('Referer);
    console.log('the previous url was '+previousUrl);

    Member.destroy({
        where: { id: id }
    }).then(rez => {
        console.log('Member deleted');
        res.redirect(previousUrl);
    }).catch(err => console.error(err));
}