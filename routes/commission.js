const router= require('express').Router();
const commController = require('../Controller/commission');
const isAuth= require('../util/isAuth');

router.get('/addCommission', commController.getAddComm);
router.post('/addCommission', commController.postAddComm);

router.get('/commissionList', commController.getCommList);

router.get('/commission/:id', commController.getCommDetail);

router.post('/deleteComm', commController.postDelComm)

module.exports= router;