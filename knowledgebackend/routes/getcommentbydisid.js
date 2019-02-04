var express = require('express');
 var router = express.Router();
 var combydisid=require('../models/comment_model');


router.get('/:id',function(req,res,next){

combydisid.getCommentByDisId(req.params.id,function(err,rows){
 
if(err)
  {
  res.json(err);
  }
  else
  {
  res.json(rows);
  }
 
 });
});

module.exports=router;