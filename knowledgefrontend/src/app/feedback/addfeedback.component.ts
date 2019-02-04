import { Component, OnInit } from '@angular/core';
import { FeedbackModel } from '../shared/feedback-model';
import { FeedbackdataService } from '../shared/feedbackdata.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.css']
})
export class AddfeedbackComponent implements OnInit {

private f_cat:string;
private fk_email_id:string;
private f_desc:string;
private f_date:string;
private pk_f_id:number;
private _subscription:Subscription

  public feed:FeedbackModel[]=[];

  constructor(public _feed_data:FeedbackdataService,public _router:Router,public _acroute:ActivatedRoute) { }
 
  ngOnInit() {

this._subscription=this._acroute.params.subscribe(

      (params:any)=>{

       this.pk_f_id =params["pk_f_id"];
      }
    );

    this._feed_data.getAllFeedback().subscribe(
      (data:FeedbackModel[])=>{
        this.feed=data;
      }
    );
    if(this.pk_f_id!=0)
    {
      this._feed_data.getFeedbackById(this.pk_f_id).subscribe(

        (data:FeedbackModel[])=>{
          
          this.f_cat=data[0].f_cat,
          this.fk_email_id=data[0].fk_email_id,
          this.f_desc=data[0].f_desc,
          this.f_date=data[0].f_date,
          this.pk_f_id=data[0].pk_f_id;
        }
      );
    }


  }

 addFeedback()
  {
    if(this.pk_f_id==0)
    {

    

    this._feed_data.addFeedback(new FeedbackModel(this.f_cat,this.fk_email_id,this.f_desc,this.f_date,this.pk_f_id))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allFeedback']);
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
    this._feed_data.updateFeedback(new FeedbackModel(this.f_cat,this.fk_email_id,this.f_desc,this.f_date,this.pk_f_id))
    .subscribe(
      (data:any)=>{

         console.log(data); 
         this._router.navigate(['/allFeedback']); 
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
