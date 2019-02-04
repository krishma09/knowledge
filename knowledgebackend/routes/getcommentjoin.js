var express = require('express');
 var router = express.Router();
 var Comment=require('../models/comment_model');

router.get('/:id?',function(req,res,next){

Comment.getCommentUserjoin(function(err,rows){

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