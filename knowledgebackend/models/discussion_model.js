var db=require('../dbconnection'); //reference of dbconnection.js
 
var Discussion={
 
getAllDiscussion:function(callback){
 
return db.query("Select * from discussion_tbl",callback);
 
},
addDiscussion:function(Discussion,callback){

var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();

return db.query("insert into discussion_tbl(fk_cat_id,d_title,d_desc,d_date,fk_email_id) values(?,?,?,?,?)",[Discussion.fk_cat_id,Discussion.d_title,Discussion.d_desc,x,Discussion.fk_email_id],callback)
},
deleteDiscussion:function(id,callback){

    return db.query("delete from discussion_tbl where pk_d_id=?",[id]),callback;

},
updateDiscussion:function(id,Discussion,callback){
var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();

  return db.query("update discussion_tbl set fk_cat_id=?,d_title=?,d_desc=?,d_date=?,fk_email_id=? where pk_d_id=?",[Discussion.fk_cat_id,Discussion.d_title,Discussion.d_desc,x,Discussion.fk_email_id,id],callback);
 },
 
 getDiscussionjoin:function(callback)
 {
     return db.query("select d.*,c.*,u.* from discussion_tbl as d,category_tbl as c,user_tbl as u where d.fk_cat_id=c.pk_cat_id and d.fk_email_id=u.pk_email_id",callback);
 },

 getDiscussionById:function(id,callback)
 {
     return db.query("Select * from discussion_tbl where pk_d_id=?",[id],callback);
 },
deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_d_id;
    }
    return db.query("delete from discussion_tbl where pk_d_id in (?)",[delarr],callback);
 },
 getDiscussionjoinById:function(id,callback){
 
return db.query("Select d.*,u.*,c.* from discussion_tbl as d,user_tbl as u,category_tbl as c where d.fk_email_id=u.pk_email_id and pk_d_id=? and d.fk_cat_id=c.pk_cat_id",[id],callback);
 
}

};
 module.exports=Discussion;