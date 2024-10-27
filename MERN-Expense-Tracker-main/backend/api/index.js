//pradhumnasedunet
//fYI7cWe2eaE2ETHH

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('../Routes/AuthRouter');
const ProductRouter = require('../Routes/ProductRouter');
const ExpenseRouter = require('../Routes/ExpenseRouter');
const ensureAuthenticated = require('../Middlewares/Auth');
const serverless = require('serverless-http');

require('dotenv').config();
require('../Models/db');

const app = express();

app.get('/', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors({
    origin: ["https://bugdet-bee-frontend.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter);

module.exports = app; // Export the app for serverless
module.exports.handler = serverless(app); // Export the serverless function
