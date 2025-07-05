
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../connection');
const auth = require('../services/authentication'); // Token auth middleware


// registration api
router.post('/register', (req, res) => {
  let user = req.body;
  const querySelect = "SELECT * FROM userinfo WHERE username=?";
  connection.query(querySelect, [user.username], (err, results) => {
    if (err) {
      console.error("Error querying user data:", err);
      return res.status(500).json({ error: "Error querying user data", details: err });
    }

    if (results.length === 0) {
      const queryInsert = `INSERT INTO userinfo
                           (firstName, lastName, address, pnum, email, username, password, role_id)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(queryInsert, [
        user.firstName, user.lastName, user.address, user.pnum,
        user.email, user.username, user.password, 2 // Default role_id to 2
      ], (err, results) => {
        if (err) {
          console.error("Error inserting user data:", err);
          return res.status(500).json({ error: "Error inserting user data", details: err });
        }
        return res.status(200).json({ message: "Successfully registered" });
      });
    } else {
      return res.status(400).json({ message: "Username already exists" });
    }
  });
});


//login;

router.post('/login', (req, res) => {
  const {id, username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const query = `
    SELECT userId,username, password, role_id
    FROM userinfo
    WHERE username = ? AND password = ?
  `;

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const user = results[0];
    const payload = { username: user.username, role: user.role_id,id:user.userId};
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '8h' });

    res.status(200).json({ token: accessToken, role: user.role_id,username:user.username,id:user.userId });
  });
});


//home api
router.get('/home',auth.authenticateToken,(req,res)=>{
 
  const userId = req.user.id;
  var query="select userId,firstName,lastName,address,pnum,email,username from userinfo where userId=?";
  connection.query(query,[userId],(err,results)=>{
    if(!err){
      return (res.status(200).json(results[0]));
      
    }else{
      return res.status(500).json(err);
    }
  })
});

//Edit profile API
router.post('/editprof',auth.authenticateToken,(req,res)=>{
 
  const userId = req.user.id;
  const { firstName, lastName, address, pnum, email, username } = req.body;

  var query="update userinfo SET firstName=?,lastName=?,address=?,pnum=?,email=?,username=? where userId=?";
  connection.query(query,[firstName, lastName, address, pnum, email, username, userId],(err,results)=>{
    if(!err){
      return res.status(200).json({ message: 'Profile updated successfully', updatedFields: { firstName, lastName, address, pnum, email, username } });
      
    }else{
      return res.status(500).json(err);
    }
  })
});



module.exports = router;

