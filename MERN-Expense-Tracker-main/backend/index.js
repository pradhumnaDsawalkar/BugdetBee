//pradhumnasedunet
//fYI7cWe2eaE2ETHH

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors(
    {
    origin: ["https://bugdet-bee-fro.vercel.app/login"],  // Allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    credentials: true // Allow cookies to be sent with requests
}
));

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
