require('dotenv').config()
const { response } = require('express');
const jwt = require('jsonwebtoken');


function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token,process.env.ACCESS_TOKEN,(err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        console.log('Authenticated user:', user); // This will help in debugging
        req.user = user;
        res.locals=response;

        next();
    });

}
module.exports = { authenticateToken:authenticateToken}
