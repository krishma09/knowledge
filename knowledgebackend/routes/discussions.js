var express = require('express');
 var router = express.Router();
 var Discussion=require('../models/discussion_model');

router.get('/:id?',function(req,res,next){

if(req.params.id)
{
    Discussion.getDiscussionById(req.params.id,function(err,rows){

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
Discussion.getAllDiscussion(function(err,rows){

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

Discussion.addDiscussion(req.body,function(err,count){

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

        Discussion.deleteDiscussion(req.params.id,function(err,count){

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
 
Discussion.updateDiscussion(req.params.id,req.body,function(err,rows){
 
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
 
    Discussion.deleteAll(req.body,function(err,count){
    
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