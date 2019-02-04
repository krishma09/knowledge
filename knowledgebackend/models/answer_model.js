var db=require('../dbconnection'); //reference of dbconnection.js
var fs = require('fs');
var Answer={
 
getAllAnswer:function(callback){
 
return db.query("Select * from ans_tbl",callback);
 
},

deleteAnswer:function(id,callback){

  
    return db.query("delete from ans_tbl where pk_ans_id=?",[id],callback);

},
updateAnswer:function(id,Answer,callback){

var d = new Date();   
var x = d.getDate()+"-";
    x+=(d.getMonth()+1)+"-";
    x+=d.getFullYear();
    x+=" ";
    x+=d.getHours()+":";
    x+=d.getMinutes();

  return db.query("update ans_tbl set ans_desc=?,fk_email_id=?,fk_q_id=?,ans_date=?,ans_ex=?,flag=?,ans_img=? where pk_ans_id=?",[Answer.ans_desc,Answer.fk_email_id,Answer.fk_q_id,x,Answer.ans_ex,Answer.flag,Answer.ans_img,id],callback);
 },
 
 getAnswerjoin:function(callback)
 {
     return db.query("select a.*,u.* from ans_tbl as a,user_tbl as u where a.fk_email_id=u.pk_email_id ",callback);
 },

 getAnswerById:function(id,callback)
 {
     return db.query("Select * from ans_tbl where pk_ans_id=?",[id],callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_ans_id;
         if(item[i].ans_img!='')
        {
        var path='./public'+item[i].ans_img;
        fs.unlink(path,function(err){
            if(err){
            console.log(err);
            }
            console.log('Deleted successfuly')});
        
    }
    }
    return db.query("delete from ans_tbl where pk_ans_id in (?)",[delarr],callback);
 },

     deleteAnswerimg:function(Answer,callback){
        if(Answer.ans_img!='')
        {
        var path='./public/images/answer'+Answer.ans_img;
        fs.unlink(path,function(err){
            if(err){
            console.log(err);
            }
            console.log('Deleted successfuly')});
        }
return db.query("delete from ans_tbl where pk_ans_id=?",[Answer.pk_ans_id],callback);        
    },

addAnswer:function(Answer,callback){

    var dt=new Date();//current date and time of server
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
    var pos=Answer.ans_img.indexOf(",");
     var base64d=Answer.ans_img.substring(pos+1);
  // console.log(base64d);
    var path="./public/images/answer/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    var path1="/images/answer/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    fs.writeFile(path,base64d,'base64',function(err){
        if(err) {
        return console.log(err);
        }
        console.log("The file was saved!");
    });
return db.query("insert into ans_tbl(ans_desc,fk_email_id,fk_q_id,ans_date,ans_ex,flag,ans_img) values(?,?,?,?,?,?,?)",[Answer.ans_desc,Answer.fk_email_id,Answer.fk_q_id,x,Answer.ans_ex,Answer.flag,path1],callback);

},

 getAnswertByQueId:function(id,callback){

    return db.query("select a.*,u.* from ans_tbl as a,user_tbl as u where fk_q_id=? and a.fk_email_id=u.pk_email_id",[id],callback);
}




 
 
};
 module.exports=Answer;



 //  ALTER TABLE  `ans_tbl` CHANGE  `ans_date`  `ans_date` DATETIME DEFAULTNOW( )