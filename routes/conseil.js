const router= require('express').Router();
const conseilController= require('../Controller/conseil');

router.get('/conseilList', conseilController.getConseilList);
router.get('/addConseil', conseilController.getAddConseil);
router.post('/addConseil', conseilController.postAddConseil);
router.post('/deleteConseil', conseilController.postDeleteCons);
router.get('/conseil/:idConseil', conseilController.getConseilDetail);

module.exports= router;