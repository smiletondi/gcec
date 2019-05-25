var express = require('express');
var router = express.Router();
const Admin = require('../Model/admin');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: "Page d'acccueil" });
});

// Login page
router.get('/login', function (req, res, next) {
  res.render('login', { title: "Page de connexion" });
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
