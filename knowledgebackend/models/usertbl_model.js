var db=require('../dbconnection'); //reference of dbconnection.js
var fs = require('fs');
 
var Usertbl={
 
getAllUsertbl:function(callback){
 
return db.query("Select * from user_tbl",callback);
 
},
addUsertbl:function(Usertbl,callback){

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
    var pos=Usertbl.u_pic.indexOf(",");
     var base64d=Usertbl.u_pic.substring(pos+1);
  // console.log(base64d);
    var path="./public/images/users/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    var path1="/images/users/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    fs.writeFile(path,base64d,'base64',function(err){
        if(err) {
        return console.log(err);
        }
        console.log("The file was saved!");
    });


return db.query("insert into user_tbl(u_name,pk_email_id,u_pwd,u_gender,u_city,u_pic,u_type) values(?,?,?,?,?,?,?)",[Usertbl.u_name,Usertbl.pk_email_id,Usertbl.u_pwd,Usertbl.u_gender,Usertbl.u_city,path1,Usertbl.u_type],callback);
},
deleteUsertbl:function(id,callback){

    return db.query("delete from user_tbl where pk_email_id=?",[id],callback);

},
updateUsertbl:function(id,Usertbl,callback){
  return db.query("update user_tbl set u_name=?,u_pwd=?,u_gender=?,u_city=?,u_pic=?,u_type=? where pk_email_id=?",[Usertbl.u_name,Usertbl.u_pwd,Usertbl.u_gender,Usertbl.u_city,Usertbl.u_pic,Usertbl.u_type,id],callback);
 },

 getUserById:function(id,callback)
 {
     return db.query("Select * from user_tbl where pk_email_id=?",[id],callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_email_id;
    }
    return db.query("delete from user_tbl where pk_email_id in (?)",[delarr],callback);
 }

 
 
};
 module.exports=Usertbl;