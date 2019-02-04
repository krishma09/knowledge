var db=require('../dbconnection'); //reference of dbconnection.js
 
var Que_view={
 
getAllQue_view:function(callback){
 
return db.query("Select * from que_view_tbl",callback);
 
},
addQue_view:function(Que_view,callback){

return db.query("insert into que_view_tbl(fk_que_id,view) values(?,?)",[Que_view.fk_que_id,Que_view.view],callback)
},
deleteQue_view:function(id,callback){

    return db.query("delete from que_view_tbl where fk_que_id=?",[id]),callback;

},
updateQue_view:function(id,Que_view,callback){
  return db.query("update que_view_tbl set view=? where fk_que_id=?",[Que_view.view,id],callback);
},
/*
 getQue_view_join:function(callback)
 {
     return db.query("select q.*,qu.* from que_view_tbl as q,que_tbl as qu where q.fk_que_id=qu.pk_q_id ",callback);
 },



 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].email_id;
    }
    return db.query("delete from que_view_tbl where fk_que_id in (?)",[delarr],callback);
 }

 */
  getQue_view_ById:function(id,callback)
 {
     return db.query("Select * from que_view_tbl where fk_que_id=?",[id],callback);
 }
 
};
 module.exports=Que_view;