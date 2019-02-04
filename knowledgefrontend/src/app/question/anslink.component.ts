import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { QuestionModel } from '../shared/question-model';
import { QuestiondataService } from '../shared/questiondata.service';
import { QuestionModel1 } from '../shared/question-model1';
import { AnswerModel } from '../shared/answer-model';
import { AnswerdataService } from '../shared/answerdata.service';
import { AnswerUserModel } from '../shared/answer-user-model';
 
@Component({
  selector: 'app-anslink',
  templateUrl: './anslink.component.html',
  styleUrls: ['./anslink.component.css']
})
export class AnslinkComponent implements OnInit {

allansbyid:AnswerUserModel[]=[];
private _subscription:Subscription;

public pk_q_id:number;
//fk_cat_id:number;
q_title:string;
q_desc:string;
q_date:string;
fk_email_id:string;
u_name:string;
u_pic:string;
q_img:string;


fk_q_id:number;
ans_desc:string;
ans_date:string;
ans_ex:string;
ans_img:string;

pk_ans_id:number;
flag:number;

title = 'app works!';
  path='';
   public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];

  constructor(public _que_data:QuestiondataService,public _ans_data:AnswerdataService,public _router:Router,public _acroute:ActivatedRoute,private changeDetectorRef: ChangeDetectorRef) { }


fileChange(input){
  this.readFiles(input.files);
}
readFile(file, reader, callback){
  reader.onload = () => {
    callback(reader.result);
    this.ans_img=reader.result;
    console.log(reader.result);
  }

  reader.readAsDataURL(file);
}
readFiles(files, index=0){
  // Create the file reader
  let reader = new FileReader();
  
  // If there is a file
  if(index in files){
    // Start reading this file
    this.readFile(files[index], reader, (result) =>{
      // Create an img element and add the image file data to it
      var img = document.createElement("img");
      img.src = result;
  
      // Send this img to the resize function (and wait for callback)
      this.resize(img, 250, 250, (resized_jpeg, before, after)=>{
        // For debugging (size in bytes before and after)
        this.debug_size_before.push(before);
        this.debug_size_after.push(after);
  
        // Add the resized jpeg img source to a list for preview
        // This is also the file you want to upload. (either as a
        // base64 string or img.src = resized_jpeg if you prefer a file). 
        this.file_srcs.push(resized_jpeg);
  
        // Read the next file;
        this.readFiles(files, index+1);
      });
    });
  }else{
    // When all files are done This forces a change detection
    this.changeDetectorRef.detectChanges();
  }
}
resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
  // This will wait until the img is loaded before calling this function
  return img.onload = () => {

    // Get the images current width and height
    var width = img.width;
    var height = img.height;

    // Set the WxH to fit the Max values (but maintain proportions)
    if (width > height) {
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
        }
    }

    // create a canvas object
    var canvas = document.createElement("canvas");

    // Set the canvas to the new calculated dimensions
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");  

    ctx.drawImage(img, 0, 0,  width, height); 

    // Get this encoded as a jpeg
    // IMPORTANT: 'jpeg' NOT 'jpg'
    var dataUrl = canvas.toDataURL('image/jpeg');

    // callback with the results
    callback(dataUrl, img.src.length, dataUrl.length);
  };
}




  ngOnInit() {

    this._subscription=this._acroute.params.subscribe(

      (params:any)=>{

       this.pk_q_id =params["pk_q_id"];
       this.fk_q_id=params["pk_q_id"];
        console.log(this.pk_q_id);
      }
    );

    this._que_data.getQuestionjoinById(this.pk_q_id).subscribe(

        (data:QuestionModel1[])=>{
          
            
         //   this.fk_cat_id=data[0].fk_cat_id,
            this.q_title=data[0].q_title,
            this.q_desc=data[0].q_desc,
            this.q_date=data[0].q_date,
            this.q_img=data[0].q_img,
            
            this.u_name=data[0].u_name,
            this.u_pic=data[0].u_pic;
          console.log(this.fk_email_id);
        }
      );


    /*this._ansdata.getAnswerByQueId(this.faq_id).subscribe(

        (data:AnswerjoinModel[])=>{
         this.allansbyid=data;
          console.log(this.faq_id);
        }
      );*/

      this._ans_data.getAnswertByQueId(this.pk_q_id).subscribe(

      (data:AnswerUserModel[])=>{
        this.allansbyid=data;
        console.log(data);
      },
      function(error){
        alert(error);
      },
      function(){
        console.log('cmnt aai gai');
      }
      
    );


  }



     addAnswer()
  {
    
    this._ans_data.addAnswer(new AnswerModel(this.pk_ans_id,this.ans_desc,this.fk_email_id,this.fk_q_id,this.ans_date,this.ans_ex,0,this.ans_img))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allQuestion']);
    },
    function(error){},
    function(){
     
      alert('added');
      }
    );
  }

     deleteAnswer(item:AnswerUserModel){

  this._ans_data.deleteAnswer(item.pk_ans_id).subscribe(
   (data:any)=>{
      this.allansbyid.splice(this.allansbyid.indexOf(item),1);
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

}
