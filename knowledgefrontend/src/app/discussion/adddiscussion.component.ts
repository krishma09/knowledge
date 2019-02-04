import { Component, OnInit } from '@angular/core';
import { DiscussionModel } from '../shared/discussion-model';
import { DiscussiondataService } from '../shared/discussiondata.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../shared/category-model';
import { CategorydataService } from '../shared/categorydata.service';
import { Subscription } from 'rxjs/Rx';
import { DiscussionModel1 } from '../shared/discussion-model1';

@Component({
  selector: 'app-adddiscussion',
  templateUrl: './adddiscussion.component.html',
  styleUrls: ['./adddiscussion.component.css']
})
export class AdddiscussionComponent implements OnInit {
private pk_d_id:number;
private fk_cat_id:number;
private d_title:string;
private d_desc:string;
private d_date:string;
private fk_email_id:string;
private cat_name:string;
private pk_cat_id:string;
private _subscription:Subscription;


public allcat:CategoryModel[]=[];  
  public dis:DiscussionModel[]=[];

  constructor(public _dis_data:DiscussiondataService,public _router:Router,public _acroute:ActivatedRoute,public _cat_data:CategorydataService) { }
 
  ngOnInit() {

this._subscription=this._acroute.params.subscribe(

      (params:any)=>{

       this.pk_d_id =params["pk_d_id"];
      }
    );

    this._cat_data.getAllCategory().subscribe(
      (data:CategoryModel[])=>{
        this.allcat=data;
      }
    );
    if(this.pk_d_id!=0)
    {
      this._dis_data.getDiscussionById(this.pk_d_id).subscribe(

        (data:DiscussionModel[])=>{
          
          this.pk_d_id=data[0].pk_d_id,
          this.fk_cat_id=data[0].fk_cat_id,
          this.d_title=data[0].d_title,
          this.d_desc=data[0].d_desc,
          this.d_date=data[0].d_date,
          this.fk_email_id=data[0].fk_email_id;
        }
      );
    }

  }

   addDiscussion()
  {
    if(this.pk_d_id==0)
    {






    this._dis_data.addDiscussion(new DiscussionModel(this.pk_d_id,this.fk_cat_id,this.d_title,this.d_desc,this.d_date,this.fk_email_id))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allDiscussion']);
    },
    function(error){},
    function(){
     
      alert('added');
      }
    );
  }
  
  else
  {
    //edit
    this._dis_data.updateDiscussion(new DiscussionModel(this.pk_d_id,this.fk_cat_id,this.d_title,this.d_desc,this.d_date,this.fk_email_id))
    .subscribe(
      (data:any)=>{

         console.log(data); 
         this._router.navigate(['/allDiscussion']); 
    },
    function(error){

      alert(error);
    },
    function(){
      alert('Updated');
      }
    );

  }
  }


}
