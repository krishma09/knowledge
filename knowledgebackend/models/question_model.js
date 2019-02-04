var db=require('../dbconnection'); //reference of dbconnection.js
var fs = require('fs');
 
var Question={
 
getAllQuestion:function(callback){

return db.query("Select * from que_tbl",callback);
 
},
addQuestion:function(Question,callback){

    var dt = new Date();   
var x = dt.getDate()+"-";
    x+=(dt.getMonth()+1)+"-";
    x+=dt.getFullYear();
    x+=" ";
    x+=dt.getHours()+":";
    x+=dt.getMinutes();


    var text = "";//random text
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
   // var base64d=Answer.ans_img.replace(/^data:image\/png;base64,/, "");
    var pos=Question.q_img.indexOf(",");
     var base64d=Question.q_img.substring(pos+1);
  // console.log(base64d);
    var path="./public/images/question/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    var path1="/images/question/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    fs.writeFile(path,base64d,'base64',function(err){
        if(err) {
        return console.log(err);
        }
        console.log("The file was saved!");
    });



return db.query("insert into que_tbl(q_title,q_desc,q_img,q_date,fk_email_id,fk_cat_id,flag) values(?,?,?,?,?,?,?)",[Question.q_title,Question.q_desc,path1,x,Question.fk_email_id,Question.fk_cat_id,Question.flag],callback);
},
deleteQuestion:function(id,callback){

    return db.query("delete from que_tbl where pk_q_id=?",[id],callback);

},
updateQuestion:function(id,Question,callback){

    var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();
  return db.query("update que_tbl set q_title=?,q_desc=?,q_img=?,q_date=?,fk_email_id=?,fk_cat_id=?,flag=? where pk_q_id=?",[Question.q_title,Question.q_desc,Question.q_img,x,Question.fk_email_id,Question.fk_cat_id,Question.flag,id],callback);
 },

 getQuestionjoin:function(callback)
 {
     return db.query("select q.*,c.*,u.* from que_tbl as q,category_tbl as c,user_tbl as u where q.fk_cat_id=c.pk_cat_id and q.fk_email_id=u.pk_email_id",callback);
 },

 getQuestionById:function(id,callback)
 {
     return db.query("Select * from que_tbl where pk_q_id=?",[id],callback);
 },

 getQuestionjoinById:function(id,callback){
 
return db.query("Select q.*,u.*,c.* from que_tbl as q,user_tbl as u,category_tbl as c where q.fk_email_id=u.pk_email_id and pk_q_id=? and q.fk_cat_id=c.pk_cat_id",[id],callback);
 
},

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_q_id;
    }
    return db.query("delete from que_tbl where pk_q_id in (?)",[delarr],callback);
 }

 
  
};
 module.exports=Question;