var db=require('../dbconnection'); //reference of dbconnection.js
 
var Comment={
 
getAllComment:function(callback){
 
return db.query("Select * from comment_tbl",callback);
 
},
addComment:function(Comment,callback){

    var d = new Date();   
    var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();

return db.query("insert into comment_tbl(fk_d_id,fk_email_id,comment,date) values(?,?,?,?)",[Comment.fk_d_id,Comment.fk_email_id,Comment.comment,x],callback)
},
deleteComment:function(id,callback){

    return db.query("delete from comment_tbl where pk_c_id=?",[id]),callback;

},
updateComment:function(id,Comment,callback){
var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();
    
  return db.query("update comment_tbl set fk_d_id=?,fk_email_id=?,comment=?,date=? where pk_c_id=?",[Comment.fk_d_id,Comment.fk_email_id,Comment.comment,x,id],callback);
 },

 getCommentUserjoin:function(callback)
 {
     return db.query("select c.*,u.* from comment_tbl as c,user_tbl as u where c.fk_email_id=u.pk_email_id ",callback);
 },

 getCommentById:function(id,callback)
 {
     return db.query("Select * from comment_tbl where pk_c_id=?",[id],callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_c_id;
    }
    return db.query("delete from comment_tbl where pk_c_id in (?)",[delarr],callback);
 },

 getCommentByDisId:function(id,callback){

    return db.query("select c.*,u.* from comment_tbl as c,user_tbl as u where fk_d_id=? and c.fk_email_id=u.pk_email_id",[id],callback);
}


 
 
};
 module.exports=Comment;