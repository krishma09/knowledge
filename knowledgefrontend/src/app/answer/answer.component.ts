import { Component, OnInit } from '@angular/core';
import { AnswerModel } from '../shared/answer-model';
import { AnswerdataService } from '../shared/answerdata.service';
import { Router } from '@angular/router';
import { AnswerUserModel } from '../shared/answer-user-model';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  delarr:AnswerUserModel[]=[];
allAnswer:AnswerUserModel[]=[];

 

  constructor(public _ans_data:AnswerdataService,public _router:Router) { }

  ngOnInit() {

    this._ans_data.getAnswerjoin().subscribe(

      (data:AnswerUserModel[])=>{
        this.allAnswer=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    );
  }


   deleteAnswer(item:AnswerUserModel){

  this._ans_data.deleteAnswer(item.pk_ans_id).subscribe(
   (data:any)=>{
      this.allAnswer.splice(this.allAnswer.indexOf(item),1);
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

addAnswer(item:AnswerUserModel){

        this._router.navigate(['/addAnswer',0]);
}

 updateAnswer(item:AnswerUserModel)
  {
      this._router.navigate(['/addAnswer',item.pk_ans_id]);
  }


i:number=0;
    checkChange(item:AnswerUserModel)
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
      this._ans_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.allAnswer.find(x=>x==this.delarr[this.i]))
                {
                   this.allAnswer.splice(this.allAnswer.indexOf(this.delarr[this.i]),1);
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
