const fs = require('fs');
const path = require('path');
var express = require('express');
const puppeteer = require('puppeteer');
const moment = require('moment');
var router = express.Router();
const Admin = require('../Model/admin');

const Commission = require('../Model/commission');
const Conseil = require('../Model/conseil');
const Member = require('../Model/member');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: "Page d'acccueil"
  });
});

router.get('/download', async (req, res, next) => {
  const conseilId = req.query.conseil;
  const commissionId = req.query.commission;
  moment.locale('fr');
  let url, instanceName;
  let theDate = moment().format('LL');
  if (conseilId) {
    const conseil = await Conseil.findOne({
      raw: true,
      where: {
        id: conseilId
      }
    });
    instanceName = conseil.nom;
    url = 'http://localhost:3000/rapport?conseil=' + conseilId;
  } else if (commissionId) {
    const commission = await Commission.findOne({
      raw: true,
      where: {
        id: commissionId
      }
    });
    instanceName = commission.nom;
    url = 'http://localhost:3000/rapport?commission=' + commissionId;
  } else {
    throw new Error(' Unexpected Error in generating pdf file');
  }

  try {
  const rapportName = 'Rapport ' + instanceName + ' ' + theDate + '.pdf';
  const rapportPath = path.join(__dirname, '../', 'rapports', rapportName);
  // console.log(rapportPath);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });
  await page.pdf({
    path: rapportPath,
    format: 'A4'
  });

  await browser.close();

  res.set({
    'Content-type': 'application/pdf',
    'Content-Disposition': 'inline; filename="' + rapportName + '"'
  });
  const finalRapport = fs.createReadStream(rapportPath);
    finalRapport.pipe(res);
  } catch {
    throw new Error('Error when delivering the file to res');
  }

});
// Report Page
router.get('/rapport', async (req, res, next) => {

  const conseilId = req.query.conseil;
  const commissionId = req.query.commission;
  moment.locale('fr');
  let theDate = moment().format('LLLL');
  theDate = theDate.split(" ").splice(0, 4).join(" ");
  theDate = theDate.charAt(0).toUpperCase() + theDate.slice(1);


  if (conseilId) {
    const conseil = await Conseil.findOne({
      raw: true,
      where: {
        id: conseilId
      }
    });
    const conseilMembers = await Member.findAll({
      raw: true,
      where: {
        conseilId: conseilId,
        remplace: null
      },
      attributes: ['nom', 'prenom']
    });

    try {
      res.render('./conseil/rapport', {
        title: 'Rapport',
        instance: conseil,
        date: theDate,
        members: conseilMembers || []
      });
    } catch {
      next(err);
    }
  } else if (commissionId) {
    const commission = await Commission.findOne({
      // raw: true,
      where: {
        id: commissionId
      },
      include: [{
        model: Conseil,
        attributes: ['nom']
      }]
    });
    const commissionMembers = await commission.getMembers({
      attributes: ['nom', 'prenom'],
      where: {
        remplace: null
      }
    });
    // console.log(commissionMembers);

    try {
      res.render('./conseil/rapport', {
        title: 'Rapport',
        instance: commission,
        date: theDate,
        members: commissionMembers || []
      });
    } catch {
      next(err);
    }

  }
});

// Login page
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: "Page de connexion"
  });
});
router.post('/login', function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const ref = req.body.pPUrl;

  Admin.findOne({
    where: {
      username: username,
      pass: password
    }
  }).then(a => {
    if (a) {
      req.session.isLoggedIn = true;
      return req.session.save(err => {
        if (err) {
          console.log('login failed');
        }
        console.log('Admin has connected');
        return res.redirect(ref);
      });
    }
    return res.redirect('/login');
  }).catch(err => console.error(err));
});


router.post('/logout', (req, res, next) => {
  const previousUrl = req.get('Referrer');
  req.session.destroy(err => {
    if (err) {
      console.error('Logout Error');
      res.redirect(previousUrl);
    }
    console.log('Admin has disconnected');
    res.redirect(previousUrl);
  });
});



module.exports = router;