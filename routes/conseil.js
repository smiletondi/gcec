const router = require('express').Router();
const conseilController = require('../Controller/conseil');
const isAuth = require('../util/isAuth');
const { body } = require('express-validator/check');

router.get('/conseilList', conseilController.getConseilList);
router.get('/addConseil', isAuth, conseilController.getAddConseil);
const checkAddConseil = [
    body('nom', 'Entrer un nom correcte')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('debut', 'Entrer un debut de periode valide (4 characteres)')
        .isNumeric()
        .isLength({ min: 4, max: 4 })
        .trim(),
    body('fin', 'Entrer une fin de periode valide (4 characteres)')
        .isNumeric()
        .isLength({ min: 4, max: 4 })
        .trim()

];
router.post('/addConseil', isAuth, checkAddConseil, conseilController.postAddConseil);
router.post('/deleteConseil', isAuth, conseilController.postDeleteCons);
router.get('/conseil/:idConseil', conseilController.getConseilDetail);

module.exports = router;