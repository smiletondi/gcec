const router = require('express').Router();
const conseilController = require('../Controller/conseil');
const Conseil = require('../Model/conseil');
const Commission = require('../Model/commission');
const CommissionMembers = require('../Model/commissionMembers');
const Member = require('../Model/member');
const isAuth = require('../util/isAuth');
const {
    body
} = require('express-validator/check');
const {
    PNG
} = require('pngjs');
const imageType = require('image-type');
const PDFDocument = require('pdfkit');
var path = require('path');
const fs = require('fs');





router.get('/conseilList', conseilController.getConseilList);
router.get('/addConseil', isAuth, conseilController.getAddConseil);
router.post('/addConseil', isAuth, conseilController.postAddConseil);
router.post('/deleteConseil', isAuth, conseilController.postDeleteCons);
router.get('/conseil/:idConseil', conseilController.getConseilDetail);

module.exports = router;