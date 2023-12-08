const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
require('./app_api/models/locations');
require('./app_api/models/db');

const index = require('./app_api/routes/index');
const apiRoutes = require('./app_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// There is a problem with this code automatically authenticating and sending the user to /gamepage
// Successful login sends you to gamepage.
/*app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

authUser = (user, password, done) => {
  let authenticated_user = { id: 123, name: "Kyle"}
  return done (null, authenticated_user )
}

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy (authUser));

app.post ("/login", passport.authenticate('local', {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
}))

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/gamepage")
}
app.get("/login", checkAuthenticated, (req, res) => {
  res.render("gamepage", {
    name: req.user.name
  })
})*/

app.use('/', index);
app.use('/api', apiRoutes);
// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;