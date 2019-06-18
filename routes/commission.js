const router= require('express').Router();
const commController = require('../Controller/commission');
const isAuth= require('../util/isAuth');
const { body } =require('express-validator/check');

router.get('/addCommission',isAuth, commController.getAddComm);
router.post('/addCommission',isAuth, commController.postAddComm);

router.get('/commissionList', commController.getCommList);

router.get('/commission/:id', commController.getCommDetail);

router.post('/deleteComm',isAuth, commController.postDelComm)

module.exports= router;