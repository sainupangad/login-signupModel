var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var MongoStore = require('connect-mongo')
const db = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(session(
  {
    secret: 'mysupersecret',
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/shopping', touchAfter: 24 * 3600
    }),
    cookie: { maxAge: 180 * 60 * 1000 },
    saveUninitialized: true,
    resave: true,
  }));
db.connect((err) => {
  if (err) {
    console.log('Unable to connect Database');
    process.exit(1)
  } else {
    console.log('Database Started Successfully....');
  }
});

module.exports = app;
