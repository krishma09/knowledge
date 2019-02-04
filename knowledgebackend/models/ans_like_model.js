var db=require('../dbconnection'); //reference of dbconnection.js
 
var Ans_like={
 
getAllAns_like:function(callback){
 
return db.query("Select * from ans_like_tbl",callback);
 
},
addAns_like:function(Ans_like,callback){

return db.query("insert into ans_like_tbl(fk_ans_id,ans_like,fk_email_id) values(?,?,?)",[Ans_like.fk_ans_id,Ans_like.ans_like,Ans_like.fk_email_id],callback)
},
deleteAns_like:function(id,callback){

    return db.query("delete from ans_like_tbl where pk_ans_like=?",[id]),callback;

}/*
updateAns_like:function(id,Ans_like,callback){
  return db.query("update ans_like_tbl set ans_like=? where pk_ans_like=?",[Ans_like.ans_like,id],callback);
 },

 getAns_like_join:function(callback)
 {
     return db.query("select a.*,an.* from ans_like_tbl as a,ans_tbl as an where a.fk_ans_id=an.pk_ans_id ",callback);
 },

 getAns_like_ById:function(id,callback)
 {
     return db.query("Select * from ans_like_tbl where fk_ans_id=?",[id],callback);
 }

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].email_id;
    }
    return db.query("delete from ans_like_tbl where fk_ans_id in (?)",[delarr],callback);
 }*/

 
 
};
 module.exports=Ans_like;