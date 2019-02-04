var express = require('express');
 var router = express.Router();
 var Discussion=require('../models/discussion_model');

router.get('/:id?',function(req,res,next){
 
if(req.params.id){
 
Discussion.getDiscussionjoinById(req.params.id,function(err,rows){
 
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
 
Discussion.getDiscussionjoin(function(err,rows){
 
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