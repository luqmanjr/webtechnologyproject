const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();
const auth = require('../services/authentication'); // Token auth middleware


router.get('/viewproblems',(req, res) => {
    const query="select * from problem";
    connection.query(query,(err,results)=>{
      if(!err){
        return (res.status(200).json(results));
        
      }else{
        return res.status(500).json(err);
      }
    })
});

router.get('/viewrequest',auth.authenticateToken,(req, res) => {
  const userId=req.user.id;
  const query="select customer_problem.userId,problem.problem_name,customer_problem.problem_description,customer_problem.computer_model,customer_problem.problem_date,customer_problem.status,customer_problem.tech_comment from problem,customer_problem,userinfo where problem.problem_id=customer_problem.problem_id and userinfo.userId=customer_problem.userId and userinfo.userId=?";
  connection.query(query,[userId],(err,results)=>{
    if(!err){
      return (res.status(200).json(results));
      
    }else{
      return res.status(500).json(err);
    }
  })
});


module.exports = router;
