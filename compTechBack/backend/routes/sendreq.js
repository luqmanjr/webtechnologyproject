
const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication'); // Token auth middleware
 require('dotenv').config()
const jwt = require('jsonwebtoken');

router.post('/sendRequest', auth.authenticateToken, (req, res) => {
    const {problem_id, problem_description, computer_model,problem_date,status} = req.body;
    
    const userId = req.user.id;  // Get user ID from the token
  
    console.log('User ID:', userId);
    console.log('Problem Id:', problem_id);
    console.log('Problem Description:', problem_description);
    console.log('Computer Model:', computer_model);
    console.log('Date:', problem_date);
    console.log('Status:', status);

    

    // Make sure the correct fields are included in the query
    const query = `
      INSERT INTO customer_problem (userId,problem_id, problem_description, computer_model, problem_date, status) 
      VALUES (?, ?, ?, ?, NOW(), 'Requested')
    `;

    
    connection.query(query, [userId,problem_id, problem_description, computer_model,problem_date,status], (error, results) => {
      if (error) {
        console.error('Error inserting request:', error);  
        return res.status(500).send('Database error');
      }
    
      res.status(200).json({ message: 'Request submitted successfully' });

    });
});

module.exports = router;
