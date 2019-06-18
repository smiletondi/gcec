var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const SequelizeSTORE = require('connect-session-sequelize')(session.Store);


const sequelize = require('./util/database');

var indexRouter = require('./routes/index');
const conseilRouter = require('./routes/conseil');
const commRouter = require('./routes/commission');
const memberRouter = require('./routes/member');

// Models
// const Admin = require('./Model/admin');
// const Commission = require('./Model/commission');
// const Conseil = require('./Model/conseil');
// const CommissionMembers = require('./Model/commissionMembers')
// const Member = require('./Model/member');

var app = express();
const sessionStore = new SequelizeSTORE({
  db: sequelize
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(session({
  secret: 'keyboard cat',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

// Passing  auth to all views
app.use((req, res, next) => {
  res.locals.auth = req.session.isLoggedIn;
  res.locals.pPUrl = req.get('Referer');
  next();
});


app.use('/', indexRouter, conseilRouter, commRouter, memberRouter);
// app.use('/', indexRouter);
// app.use('/', memberRouter);
// app.use('/', conseilRouter);
// app.use('/', commRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.auth= req.session.isLoggedIn;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

module.exports = app;