
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user');
const sendReqRoute = require('./routes/sendreq');

const problemRoute = require('./routes/problem');
const app = express();



app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());
app.use('/user', userRoute);
app.use('/problem', problemRoute);
app.use('/user', sendReqRoute);

module.exports = app;



