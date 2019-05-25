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
        .isNumeric()
        .isLength({min: 8})
        .trim(),
    body('sexe', 'selectionner votre sexe')
        .matches('Masculin','Feminin')
        .trim()
];
router.post('/addMember', isAuth, checkAddMember, memberController.postAddMember);

router.post('/deleteMember', isAuth, memberController.postdeleteMember)

module.exports = router;