var express = require('express');
 var router = express.Router();
 var Ans_like=require('../models/ans_like_model');

router.get('/',function(req,res,next){

Ans_like.getAllAns_like(function(err,rows){

    if (err)
    {
        res.json(err);
    }
    else
    {
        res.json(rows);
    }
});

}); 



router.post('/',function(req,res,next){

Ans_like.addAns_like(req.body,function(err,count){

if(err){

    res.json(err);
}
else
{
    res.json(req.body);
}

});

});

router.delete('/:id',function(req,res,next){

        Ans_like.deleteAns_like(req.params.id,function(err,count){

                if(err){
                    res.json(err);
                }
                else
                {
                    res.json(count);
                }
        });
});

router.put('/:id',function(req,res,next){
 
Ans_like.updateAns_like(req.params.id,req.body,function(err,rows){
 
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


 router.post('/:id',function(req,res,next){
 
    Ans_like.deleteAll(req.body,function(err,count){
    
    if(err)
      {
      res.json(err);
      }
      else
      {
      res.json(count);
      }
    
    });
 
});
 module.exports=router;