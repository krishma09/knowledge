var express = require('express');
 var router = express.Router();
 var ansbyqueid=require('../models/answer_model');


router.get('/:id',function(req,res,next){

ansbyqueid.getAnswertByQueId(req.params.id,function(err,rows){
 
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