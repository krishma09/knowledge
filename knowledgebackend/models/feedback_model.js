var db=require('../dbconnection'); //reference of dbconnection.js
 
var Feedback={
 
getAllFeedack:function(callback){
 
return db.query("Select * from feedback_tbl",callback);
 
},
addFeedback:function(Feedback,callback){

var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();

return db.query("insert into feedback_tbl(f_cat,fk_email_id,f_desc,f_date) values(?,?,?,?)",[Feedback.f_cat,Feedback.fk_email_id,Feedback.f_desc,x],callback)
},
deleteFeedback:function(id,callback){

    return db.query("delete from feedback_tbl where pk_f_id=?",[id]),callback;

},
updateFeedback:function(id,Feedback,callback){

    var d = new Date();   
    var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();
  return db.query("update feedback_tbl set f_cat=?,fk_email_id=?,f_desc=?,f_date=? where pk_f_id=?",[Feedback.f_cat,Feedback.fk_email_id,Feedback.f_desc,x,id],callback);
 },

 getFeedbackById:function(id,callback)
 {
     return db.query("Select * from feedback_tbl where pk_f_id=?",[id],callback);
 },

  getFeedbackjoin:function(callback)
 {
     return db.query("select f.*,u.* from feedback_tbl as f,user_tbl as u where f.fk_email_id=u.pk_email_id ",callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_f_id;
    }
    return db.query("delete from feedback_tbl where pk_f_id in (?)",[delarr],callback);
 }

 
 
};
 module.exports=Feedback;