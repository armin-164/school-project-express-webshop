var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017')
.then(client => {
    console.log('Connection to database is succesful');

    const db = client.db('armin-sadr');
    app.locals.db = db;
})

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/categories', categoriesRouter);

module.exports = app;
