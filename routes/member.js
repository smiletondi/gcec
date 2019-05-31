const router = require('express').Router();
const memberController = require('../Controller/member');
const isAuth = require('../util/isAuth');
const { body }= require('express-validator/check');

router.get('/addMember', isAuth, memberController.getAddMember);
const checkAddMember= [
    body('nom', 'Entrez un nom correcte')
        .isString()
        .isLength({min: 3})
        .trim(),
    body('prenom', 'Entrez un prenom correcte')
        .isString()
        .isLength({min: 3})
        .trim(),
    body('adresse', 'Entrez une adresse correcte')
        .isString()
        .isLength({min: 5})
        .trim(),
    body('tel', 'Entrez un numero de telephone')
        .isAlphanumeric()
        .isLength({min: 6})
        .trim(),
    body('sexe', 'selectionner votre sexe')
        .isIn(['Masculin','Feminin'])
        .trim()
];
router.post('/addMemberCons', isAuth, checkAddMember, memberController.postAddMemberCons);
router.post('/addMemberComm', isAuth, memberController.postAddMemberComm);

router.get('/ajoutExeptionnel', isAuth, memberController.getAddEceptionnalMember);
router.post('/ajoutExeptionnel', isAuth, memberController.postAddEceptionnalMember);

router.post('/deleteMember', isAuth, memberController.postdeleteMember)
router.post('/deleteMemberComm', isAuth, memberController.postdeleteMemberComm)

module.exports = router;