var express = require('express');
 var router = express.Router();
 var Category=require('../models/category_model');

router.get('/:id?',function(req,res,next){

if(req.params.id)
{
    Category.getCategoryById(req.params.id,function(err,rows){

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
Category.getAllCategory(function(err,rows){

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

Category.addCategory(req.body,function(err,count){

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

        Category.deleteCategory(req.params.id,function(err,count){

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
 
Category.updateCategory(req.params.id,req.body,function(err,rows){
 
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
 
    Category.deleteAll(req.body,function(err,count){
    
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