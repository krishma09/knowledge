var express = require('express');
 var router = express.Router();
 var Que_view=require('../models/que_view_model');

router.get('/:id?',function(req,res,next){

if(req.params.id)
{
    Que_view.getQue_view_ById(req.params.id,function(err,rows){

    if (err)
    {
        res.json(err);
    }
    else
    {
        res.json(rows);
    }
});

}
else{
Que_view.getAllQue_view(function(err,rows){

    if (err)
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



router.post('/',function(req,res,next){

Que_view.addQue_view(req.body,function(err,count){

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

        Que_view.deleteQue_view(req.params.id,function(err,count){

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
 
Que_view.updateQue_view(req.params.id,req.body,function(err,rows){
 
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
 
    Que_view.deleteAll(req.body,function(err,count){
    
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