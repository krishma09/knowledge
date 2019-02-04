import { Component, OnInit } from '@angular/core';
import { QuestionModel } from '../shared/question-model';
import { QuestiondataService } from '../shared/questiondata.service';
import { QuestionModel1 } from '../shared/question-model1';
import { Router } from '@angular/router';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

delarr:QuestionModel1[]=[];
allQuestion1:QuestionModel1[]=[];

  constructor(public _que_data:QuestiondataService,public _router:Router) { }

ans(item:QuestionModel1){
    this._router.navigate(['/anslink',item.pk_q_id]);
  }

  ngOnInit() {

this._que_data.getQuestionjoin().subscribe(

      (data:QuestionModel1[])=>{
        this.allQuestion1=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    ); 

  }

   deleteQuestion(item:QuestionModel1){

  this._que_data.deleteQuestion(item.pk_q_id).subscribe(
   (data:any)=>{
      this.allQuestion1.splice(this.allQuestion1.indexOf(item),1);
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

 addQuestion(item:QuestionModel1){

        this._router.navigate(['/addQuestion',0]);
}

 updateQuestion(item:QuestionModel1)
  {
      this._router.navigate(['/addQuestion',item.pk_q_id]);
  }

 
i:number=0;
    checkChange(item:QuestionModel1)
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
      this._que_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.allQuestion1.find(x=>x==this.delarr[this.i]))
                {
                   this.allQuestion1.splice(this.allQuestion1.indexOf(this.delarr[this.i]),1);
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
