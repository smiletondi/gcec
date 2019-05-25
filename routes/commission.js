const router= require('express').Router();
const commController = require('../Controller/commission');
const isAuth= require('../util/isAuth');
const { body } =require('express-validator/check');

router.get('/addCommission',isAuth, commController.getAddComm);
const checkAddComm=[
    body('nom','Entrer un nom correcte')
        .isString()
        .isLength({min: 3})
        .trim()
]
router.post('/addCommission',isAuth,checkAddComm, commController.postAddComm);

router.get('/commissionList', commController.getCommList);

router.get('/commission/:id', commController.getCommDetail);

router.post('/deleteComm',isAuth, commController.postDelComm)

module.exports= router;