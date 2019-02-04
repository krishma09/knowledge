var express = require('express');
 var router = express.Router();
 var Test=require('../models/test_model');

router.get('/:id?',function(req,res,next){

Test.getTestjoin(function(err,rows){

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


 module.exports=router;