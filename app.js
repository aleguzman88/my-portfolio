const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const businessRouter = require('./routes/business');
const loginRouter = require('./routes/login');

const app = express();

// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set up express-session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Set up connect-flash middleware
app.use(flash());

// Middleware to check if the user is authenticated
app.use(['/business'], function(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    req.flash('error', 'You need to be logged in to access this page.');
    res.redirect('/login');
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Adding the Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about/about', { title: 'About' });
});

app.get('/projects', (req, res) => {
  res.render('projects/projects', { title: 'Projects' });
});

app.get('/services', (req, res) => {
  res.render('services/services', { title: 'Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact/contact', { title: 'Contact' });
});

app.get('/login', (req, res) => {
  res.render('login/login', { title: 'Login' });
});

app.get('/business_cl', (req, res) => {
  res.render('business_cl/business_cl', { title: 'Business Contacts List' });
});

app.get('/update', (req, res) => {
  res.render('update/update', { title: 'update' });
});


//******************************************** */

// Database connection URL
const url = 'mongodb://127.0.0.1:27017/bcontacts';

// Connect to the MongoDB server
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB server');
}).catch((error) => {
  console.log('Error connecting to MongoDB server', error);
});

// Use the business router for the /business route
app.use('/business', businessRouter);

// Use the login router for the /login route
app.use('/login', loginRouter);
//******************************************** */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


