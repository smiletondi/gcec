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
const checkAddConseil = [
    body('nom', 'Entrer un nom correcte')
    .isString()
    .isLength({
        min: 3
    })
    .trim(),
    // body('debut', 'Entrer un debut de periode valide (4 characteres)')
    //     .custom(isValideDate)
    //     .isLength({ min: 4, max: 4 })
    //     .trim(),
    // body('fin', 'Entrer une fin de periode valide (4 characteres)')
    //     .isNumeric()
    //     .isLength({ min: 4, max: 4 })
    //     .trim()

];
router.post('/addConseil', isAuth, checkAddConseil, conseilController.postAddConseil);
router.post('/deleteConseil', isAuth, conseilController.postDeleteCons);
router.get('/conseil/:idConseil', conseilController.getConseilDetail);
// router.get('/download', async (req, res, next) => {
//     const conseilId = req.query.conseil;
//     const commissionId = req.query.commission;
//     moment.locale('fr');
//     let theDate= moment().format('LLLL');
//     theDate=theDate.split(" ").splice(0,4).join(" ");
//     console.log(theDate);
//     res.render('./conseil/rapport',{
//         title:'Rapport',
//         date: theDate
//     });
//     // // Variables
//     // const rapportName = 'Rapport ' + theDate.getDay() + '-' + theDate.getMonth() + '-' + theDate.getFullYear() + '.pdf';
//     // const rapportPath = path.join('rapports', rapportName);
//     // const rapport = new PDFDocument();

//     // //  To correct the .png filetype error   
//     // let buffer = fs.readFileSync('logo.png');
//     // const {
//     //     mime
//     // } = imageType(buffer);
//     // switch (mime) {
//     //     case 'image/png':
//     //         const png = PNG.sync.read(buffer);
//     //         if (png.interlace) {
//     //             buffer = PNG.sync.write(png, {
//     //                 interlace: false
//     //             });
//     //         }
//     //         break;
//     // }

//     // //  Piping the document to the image folder and to the response    
//     // rapport.pipe(fs.createWriteStream(rapportPath));
//     // res.set({
//     //     'Content-type': 'application/pdf',
//     //     // 'Content-Disposition': 'inline; filename=blbla.pdf'
//     //     'Content-Disposition': 'inline; filename="' + rapportPath + '"'
//     // });
//     // rapport.pipe(res);

//     // if (conseilId) {
//     //     const conseil = await Conseil.findOne({
//     //         where: {
//     //             id: conseilId
//     //         }
//     //     });
//     //     const conseilMembers = await Member.findAll({
//     //         where: {
//     //             conseilId: conseilId
//     //         },
//     //         attributes: ['nom', 'prenom']
//     //     });
//     //     rapport.image(buffer, 250, 15, {
//     //             fit: [100, 100],
//     //             align: 'center',
//     //             valign: 'center'
//     //         }).moveDown().fontSize(30)
//     //         .text(conseil.nom, 50, 120).moveDown().fontSize(10)
//     //         // .text(`Periode: ${conseil.debutPeriode} - ${conseil.finPeriode}`, 50)
//     //         .text(`Date: ${theDate.getDay() +'-'+ theDate.getMonth()+'-'+ theDate.getFullYear()}`, 50).font('Times-Bold')
//     //         .text('Nom & Prenom', 100, 300, {
//     //             underline: true
//     //         })
//     //         .text("Signature", 400, 300, {
//     //             underline: true
//     //         }).moveDown().font('Times-Roman');
//     //     conseilMembers.forEach(member => {
//     //         rapport.text(member.nom + ' ' + member.prenom, 100).moveDown();
//     //     });
//     // } else if (commissionId) {
//     //     const commission = await Commission.findOne({
//     //         where: {
//     //             id: commissionId
//     //         }
//     //     });
//     //     const commissionMembers = await commission.getMembers({
//     //         attributes: ['nom', 'prenom']
//     //     });
//     //     // console.log(commissionMembers);
//     //     rapport.image(buffer, 250, 15, {
//     //             fit: [100, 100],
//     //             align: 'center',
//     //             valign: 'center'
//     //         }).moveDown().fontSize(30)
//     //         .text(commission.nom, 50, 120).moveDown().fontSize(10)
//     //         .text(`Date: ${theDate.getDay() +'-'+ theDate.getMonth()+'-'+ theDate.getFullYear()}`, 50).font('Times-Bold')
//     //         .text('Nom & Prenom', 100, 300,{underline:true})
//     //         .text("Signature", 400, 300,{underline:true}).moveDown().font('Times-Roman');
//     //         commissionMembers.forEach(member=>{
//     //             rapport.text(member.nom+' '+member.prenom, 100).moveDown();
//     //         });

//     // }
//     // rapport.end();
// });

module.exports = router;