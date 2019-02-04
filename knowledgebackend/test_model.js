var db=require('../dbconnection'); //reference of dbconnection.js
 
var Test={
 
getAllTest:function(callback){
 
return db.query("Select * from test_tbl",callback);
 
},
addTest:function(Test,callback){

return db.query("insert into test_tbl(t_que,t_option1,t_option2,t_option3,t_option4,t_answer,fk_cat_id) values(?,?,?,?,?,?,?)",[Test.t_que,Test.t_option1,Test.t_option2,Test.t_option3,Test.t_option4,Test.t_answer,Test.fk_cat_id],callback);
},
deleteTest:function(id,callback){

    return db.query("delete from test_tbl where pk_t_id=?",[id],callback);

},
updateTest:function(id,Test,callback){
  return db.query("update test_tbl set t_que=?,t_option1=?,t_option2=?,t_option3=?,t_option4=?,t_answer=?,fk_cat_id=? where pk_t_id=?",[Test.t_que,Test.t_option1,Test.t_option2,Test.t_option3,Test.t_option4,Test.t_answer,Test.fk_cat_id,id],callback);
 },

 getTestjoin:function(callback)
 {
     return db.query("select t.*,c.* from test_tbl as t,category_tbl as c where t.fk_cat_id=c.pk_cat_id ",callback);
 },

 getTestById:function(id,callback)
 {
     return db.query("Select * from test_tbl where pk_t_id=?",[id],callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_t_id;
    }
    return db.query("delete from test_tbl where pk_t_id in (?)",[delarr],callback);
 }

 
 
 
};
 module.exports=Test;