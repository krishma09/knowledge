var express = require('express');
 var router = express.Router();
 var Subcat=require('../models/subcat_model');

router.get('/:id?',function(req,res,next){

if(req.params.id){
 
Subcat.getSubcatjoinById(req.params.id,function(err,rows){
 
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
 
Subcat.getSubcatjoin(function(err,rows){
 
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