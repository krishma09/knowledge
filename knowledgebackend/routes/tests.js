var express = require('express');
 var router = express.Router();
 var Test=require('../models/test_model');

router.get('/:id?',function(req,res,next){

if(req.params.id)
{
    Test.getTestById(req.params.id,function(err,rows){

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
Test.getAllTest(function(err,rows){

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

Test.addTest(req.body,function(err,count){

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

        Test.deleteTest(req.params.id,function(err,count){

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
 
Test.updateTest(req.params.id,req.body,function(err,rows){
 
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
 
    Test.deleteAll(req.body,function(err,count){
    
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