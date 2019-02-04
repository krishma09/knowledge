import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../shared/category-model';
import { CategorydataService } from '../shared/categorydata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

delarr:CategoryModel[]=[];  
allCategory:CategoryModel[]=[];
  constructor(public _cat_data:CategorydataService,public _router:Router) { }

  ngOnInit() {

     this._cat_data.getAllCategory().subscribe(

      (data:CategoryModel[])=>{
        this.allCategory=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    ); 
  }

  deleteCategory(item:CategoryModel){

  this._cat_data.deleteCategory(item.pk_cat_id).subscribe(
   (data:any)=>{
      this.allCategory.splice(this.allCategory.indexOf(item),1);
      alert('udi gayu');
    },function(error){
        alert('vaat lagshe');
      },function(){
        console.log('badhu patyu');
      }
  );
}


addCategory(item:CategoryModel){

        this._router.navigate(['/addCategory',0]);
}

 updateCategory(item:CategoryModel)
  {
      this._router.navigate(['/addCategory',item.pk_cat_id]);
  }


i:number=0;
    checkChange(item:CategoryModel)
    {
      
        if(this.delarr.find(x=>x==item))
        {
          this.delarr.splice(this.delarr.indexOf(item),1);
        }
        else
        {
          this.delarr.push(item);
        }
        console.log(this.delarr);
      
    }
    deleteAll()
    {
      /*if(confirm("Are You Sure want to delete?"))
      {
        for(this.i=0;this.i<=this.delarr.length;this.i++)
        {
          this.deleteUser1(this.delarr[this.i]);
        }
      }*/
      this._cat_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.allCategory.find(x=>x==this.delarr[this.i]))
                {
                   this.allCategory.splice(this.allCategory.indexOf(this.delarr[this.i]),1);
                 }
            }
            this.delarr=[];
            
          },
          function(err){console.log(err);},
          function(){

            console.log("Complete");
          }
        
      );
    }



}
