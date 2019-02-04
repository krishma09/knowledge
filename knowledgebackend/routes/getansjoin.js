var express = require('express');
 var router = express.Router();
 var Answer=require('../models/answer_model');

router.get('/:id?',function(req,res,next){

Answer.getAnswerjoin(function(err,rows){

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