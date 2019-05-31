const Member = require('../Model/member');
const Commission = require('../Model/commission');
const CommissionMembers = require('../Model/commissionMembers');
const ChangedMember = require('../Model/changedMember');
const Conseil = require('../Model/conseil');
const {
    validationResult
} = require('express-validator/check')


module.exports.getAddMember = async (req, res, next) => {
    const commId = req.query.commission;
    const conseilId = req.query.conseil;
    const msg = req.query.msg;


    if (commId) {
        const comm = await Commission.findOne({
            where: {
                id: commId
            }
        });
        const conseil = await Conseil.findOne({
            where: {
                id: comm.conseilId
            },
            include: Member
        });

        // console.log(conseil.members);
        return res.render('./member/addMemberComm.ejs', {
            title: 'Ajouter un membre',
            commId: commId,
            members: conseil.members
        });
    } else if (conseilId) {
        return res.render('./member/addMemberCons.ejs', {
            title: 'Ajouter un membre',
            id: conseilId,
            type: commId ? 'commission' : 'conseil',
            error: msg
        });
    }
    throw new Error('Error when adding a member');
}
module.exports.postAddMemberCons = async (req, res, next) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const adresse = req.body.adresse;
    const tel = req.body.tel;
    const sexe = req.body.sexe;
    const id = req.body.id;
    const type = req.body.type;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.redirect('/addMember?conseil=' + id + '&msg=' + errors.array()[0].msg);
    }

    const conseil = await Conseil.findOne({
        where: {
            id: id
        }
    });

    Member.create({
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        tel: tel,
        sexe: sexe,
        conseilId: conseil.id,
        dateEntree: conseil.debutPeriode,
        dateSortie: conseil.finPeriode
    }).then(a => {
        console.log('Conseil Member created');
        res.redirect('/conseil/' + id);
    }).catch(err => console.error(err));

}
module.exports.postAddMemberComm = async (req, res, next) => {
    const sM = req.body.membre;
    const selectedMembers = Array.isArray(sM) ? sM : [sM];
    const commId = req.body.commId;

    const comm = await Commission.findOne({
        where: {
            id: commId
        }
    });
    await Promise.all(selectedMembers.map(async memberId => {
        await Member.findOne({
            where: {
                id: memberId
            }
        }).then(async member => {
            await comm.addMember(member);
            console.log('Member added to commission');
        }).catch(err => next(err));
    }));

    return res.redirect('/commission/' + commId);
}

module.exports.postdeleteMember = (req, res, next) => {
    const id = req.body.memberId;
    const previousUrl = req.header('Referer'); // You can also use req.get('Referer);

    Member.destroy({
        where: {
            id: id
        }
    }).then(rez => {
        console.log('Member deleted');
        res.redirect(previousUrl);
    }).catch(err => console.error(err));
}
module.exports.postdeleteMemberComm = (req, res, next) => {
    const memberId = req.body.memberId;
    const commId = req.body.commId;

    const previousUrl = req.header('Referer'); // You can also use req.get('Referer);

    CommissionMembers.destroy({
        where: {
            memberId: memberId,
            commissionId: commId
        }
    }).then(rez => {
        console.log('Member deleted from commission');
        res.redirect(previousUrl);
    }).catch(err => console.error(err));
}
module.exports.getAddEceptionnalMember = async (req, res, next) => {
    const conseilId = req.query.conseil;
    const conseil = await Conseil.findOne({
        where: {
            id: conseilId
        }
    });
    const conseilMembers = await conseil.getMembers();
    console.log(conseilMembers);
    return res.render('./member/addChangedMember.ejs', {
        title: 'Ajouter un membre',
        conseilId: conseilId,
        members: conseilMembers
    });
}
module.exports.postAddEceptionnalMember = async (req, res, next) => {
    const memberId = req.body.membre;
    const dateEntree = req.body.dateEntree;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const adresse = req.body.adresse;
    const tel = req.body.tel;
    const sexe = req.body.sexe;
    const conseilId = req.body.id;
    const conseil = await Conseil.findOne({
        where: {
            id: conseilId
        }
    });
    const oldMember =await  Member.findOne({
        where: {
            id: memberId
        }
    });
    let newMember;
    Member.create({
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        tel: tel,
        sexe: sexe,
        dateEntree: dateEntree,
        dateSortie: conseil.finPeriode,
        conseilId: conseilId
    }).then(rez => {
        newMember = rez;
        console.log('New member created');
        return ChangedMember.create({
            nom: oldMember.nom,
            prenom: oldMember.prenom,
            adresse: oldMember.adresse,
            tel: oldMember.tel,
            sexe: oldMember.sexe,
            dateEntree: oldMember.dateEntree,
            dateSortie: dateEntree,
            conseilId: conseilId
        });
    }).then(rez=>{
        console.log('Changed member created');
        return Member.destroy({where: { id: memberId}});
    }).then(()=>{
        console.log('Old member deleted from Member');
        res.redirect('/conseil/'+conseilId);
    }).catch(err => next(err));
}