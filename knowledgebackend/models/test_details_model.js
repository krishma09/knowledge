var db=require('../dbconnection'); //reference of dbconnection.js
 
var Test_details={
 
getAllTest_details:function(callback){
 
return db.query("Select * from test_details_tbl",callback);
 
},
addTest_details:function(Test_details,callback){

    var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();

return db.query("insert into test_details_tbl(fk_email_id,fk_cat_id,t_marks,t_date) values(?,?,?,?)",[Test_details.fk_email_id,Test_details.fk_cat_id,Test_details.t_marks,x],callback)
},
deleteTest_details:function(id,callback){

    return db.query("delete from test_details_tbl where pk_test_details_id=?",[id]),callback;

},
updateTest_details:function(id,Test_details,callback){

    var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();
  return db.query("update test_details_tbl set fk_cat_id=?,t_marks=?,t_date=?,fk_email_id=? where pk_test_details_id=?",[Test_details.fk_cat_id,Test_details.t_marks,x,Test_details.fk_email_id,id],callback);
 },

 getTest_details_join:function(callback)
 {
     return db.query("select t.*,c.*,u.* from test_details_tbl as t,category_tbl as c,user_tbl as u where t.fk_cat_id=c.pk_cat_id and u.pk_email_id=t.fk_email_id",callback);
 },

 getTest_details_ById:function(id,callback)
 {
     return db.query("Select * from test_details_tbl where pk_test_details_id=?",[id],callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_test_details_id;
    }
    return db.query("delete from test_details_tbl where pk_test_details_id in (?)",[delarr],callback);
 },
 getTest_details_joinById:function(id,callback)
 {
    return db.query("select t.*,c.*,u.* from test_details_tbl as t,category_tbl as c,user_tbl as u where t.fk_cat_id=c.pk_cat_id and u.pk_email_id=t.fk_email_id and t.pk_test_details_id=?",[id],callback);
 }

 
 
};
 module.exports=Test_details;