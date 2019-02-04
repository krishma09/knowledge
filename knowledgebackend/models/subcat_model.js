var db=require('../dbconnection'); //reference of dbconnection.js
 
var Subcat={
 
getAllSubcat:function(callback){
 
return db.query("Select * from subcat_tbl",callback);
 
},
addSubcat:function(Subcat,callback){

return db.query("insert into subcat_tbl(s_name,fk_cat_id,s_desc1,s_desc2,s_desc3,s_img1,s_img2,s_img3,s_file1,s_file2,s_file3) values(?,?,?,?,?,?,?,?,?,?,?)",[Subcat.s_name,Subcat.fk_cat_id,Subcat.s_desc1,Subcat.s_desc2,Subcat.s_desc3,Subcat.s_img1,Subcat.s_img2,Subcat.s_img3,Subcat.s_file1,Subcat.s_file2,Subcat.s_file3],callback);
},
deleteSubcat:function(id,callback){

    return db.query("delete from subcat_tbl where pk_s_id=?",[id],callback);

},
updateSubcat:function(id,Subcat,callback){
  return db.query("update subcat_tbl set s_name=?,fk_cat_id=?,s_desc1=?,s_desc2=?,s_desc3=?,s_img1=?,s_img2=?,s_img3=?,s_file1=?,s_file2=?,s_file3=? where pk_s_id=?",[Subcat.s_name,Subcat.fk_cat_id,Subcat.s_desc1,Subcat.s_desc2,Subcat.s_desc3,Subcat.s_img1,Subcat.s_img2,Subcat.s_img3,Subcat.s_file1,Subcat.s_file2,Subcat.s_file3,id],callback);
 },

 getSubcatjoin:function(callback)
 {
     return db.query("select s.*,c.* from subcat_tbl as s,category_tbl as c where s.fk_cat_id=c.pk_cat_id",callback);
 },

 getSubcatById:function(id,callback)
 {
     return db.query("Select * from subcat_tbl where pk_s_id=?",[id],callback);
 },

 deleteAll:function(item,callback){

var delarr=[];
    for(i=0;i<item.length;i++){

        delarr[i]=item[i].pk_s_id;
    }
    return db.query("delete from subcat_tbl where pk_s_id in (?)",[delarr],callback);
 },

 getSubcatjoinById:function(id,callback)
 {
     return db.query("select s.*,c.* from subcat_tbl as s,category_tbl as c where s.fk_cat_id=c.pk_cat_id and pk_s_id=?",[id],callback);
 },

 
getSubcatByCatId(id,callback)
{
    return db.query("select s.* from subcat_tbl as s where fk_cat_id=?",[id],callback)
}



 
};
 module.exports=Subcat;