var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
  res.render('business_cl/business_cl', { title: 'Business Contact List' });
});

//******************************************** */
//const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

//const app = express();
const port = 4000;

// Database connection URL
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'bcontatcs';

// Connect to the MongoDB server
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB server');
}).catch((error) => {
  console.log('Error connecting to MongoDB server', error);
});

// Start the server
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});


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


