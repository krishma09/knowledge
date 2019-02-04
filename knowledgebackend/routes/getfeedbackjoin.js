var express = require('express');
 var router = express.Router();
 var Feedback=require('../models/feedback_model');

router.get('/:id?',function(req,res,next){

Feedback.getFeedbackjoin(function(err,rows){

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