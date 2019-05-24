const Member= require('../Model/member');


module.exports.getAddMember= (req,res,next)=>{
    res.render('./member/addMember.ejs', {
        title: 'Ajouter un membre'
    }).catch(err=> console.error(err));
}
module.exports.postAddMember= (req,res,next) => {
    const nom= req.body.nom;
    const prenom= req.body.prenom;
    const adresse= req.body.adresse;
    const tel= req.body.tel;
    const sexe= req.body.sexe;

    Member.create({
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        tel: tel,
        sexe: sexe
    }).then(a=>{
        console.log('Member created');
        res.redirect('/commissionList');
    }).catch(err=> console.error(err));


}