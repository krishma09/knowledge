var express = require('express');
 var router = express.Router();
 var Test_details=require('../models/test_details_model');

router.get('/:id?',function(req,res,next){

if(req.params.id){
 
Test_details.getTest_details_joinById(req.params.id,function(err,rows){
 
if(err)
  {
  res.json(err);
  }
  else{
  res.json(rows);
  }
  });
 } 
 else{
 
Test_details.getTest_details_join(function(err,rows){
 
if(err)
  {
  res.json(err);
  }
  else
  {
  res.json(rows);
  }
 
 });
 }
 });


 module.exports=router;