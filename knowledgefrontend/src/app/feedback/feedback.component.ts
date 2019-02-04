import { Component, OnInit } from '@angular/core';
import { FeedbackUserModel } from '../shared/feedback-user-model';
import { FeedbackdataService } from '../shared/feedbackdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

delarr:FeedbackUserModel[]=[];
  
allFeedback:FeedbackUserModel[]=[];
  constructor(public _feed_data:FeedbackdataService,public _router:Router) { }

  ngOnInit() {

 this._feed_data.getFeedbackjoin().subscribe(

      (data:FeedbackUserModel[])=>{
        this.allFeedback=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    ); 

  }

   deleteFeedback(item:FeedbackUserModel){

  this._feed_data.deleteFeedback(item.pk_f_id).subscribe(
   (data:any)=>{
      this.allFeedback.splice(this.allFeedback.indexOf(item),1);
      alert('udi gayu');
    },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
  );

}

addFeedback(item:FeedbackUserModel){

        this._router.navigate(['/addFeedback',0]);
}

 updateFeedback(item:FeedbackUserModel)
  {
      this._router.navigate(['/addFeedback',item.pk_f_id]);
  }


i:number=0;
    checkChange(item:FeedbackUserModel)
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
      this._feed_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.allFeedback.find(x=>x==this.delarr[this.i]))
                {
                   this.allFeedback.splice(this.allFeedback.indexOf(this.delarr[this.i]),1);
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
