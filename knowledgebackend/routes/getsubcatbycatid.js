var express = require('express');
 var router = express.Router();
 var subcatbycatid=require('../models/subcat_model');


router.get('/:id',function(req,res,next){

subcatbycatid.getSubcatByCatId(req.params.id,function(err,rows){
 
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