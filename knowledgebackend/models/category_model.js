var db=require('../dbconnection'); //reference of dbconnection.js
var fs = require('fs');
 
var Category={
 
getAllCategory:function(callback){
 
return db.query("Select * from category_tbl",callback);
 
},
addCategory:function(Category,callback){

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
    var pos=Category.cat_img.indexOf(",");
     var base64d=Category.cat_img.substring(pos+1);
  // console.log(base64d);
    var path="./public/images/category/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    var path1="/images/category/"+text+dt.getDate()+dt.getMonth()+dt.getMilliseconds()+".png";
    fs.writeFile(path,base64d,'base64',function(err){
        if(err) {
        return console.log(err);
        }
        console.log("The file was saved!");
    });

return db.query("insert into category_tbl(cat_name,cat_img) values(?,?)",[Category.cat_name,path1],callback)
},
deleteCategory:function(id,callback){

    return db.query("delete from category_tbl where pk_cat_id=?",[id]),callback;

},
updateCategory:function(id,Category,callback){
  return db.query("update category_tbl set cat_name=?,cat_img=? where pk_cat_id=?",[Category.cat_name,Category.cat_img,id],callback);
 },

 getCategoryById:function(id,callback)
 {
     return db.query("Select * from category_tbl where pk_cat_id=?",[id],callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_cat_id;
    }
    return db.query("delete from category_tbl where pk_cat_id in (?)",[delarr],callback);
 }

 
 
};
 module.exports=Category;