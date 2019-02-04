import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QuestionModel } from '../shared/question-model';
import { QuestiondataService } from '../shared/questiondata.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../shared/category-model';
import { CategorydataService } from '../shared/categorydata.service';
import { Subscription } from 'rxjs/Rx';
import { QuestionModel1 } from '../shared/question-model1';


@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {

private pk_q_id:number;
private fk_cat_id:number;
private q_title:string;
private q_desc:string;
private q_date:string;
private fk_email_id:string;
private cat_name:string;
private pk_cat_id:string;
private flag:number;
private q_img:string;

private _subscription:Subscription;

public allcat:CategoryModel[]=[];  
  public que:QuestionModel[]=[];

  title = 'app works!';
  path='';
   public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];

  constructor(public _que_data:QuestiondataService,public _router:Router,public _acroute:ActivatedRoute,public _cat_data:CategorydataService,private changeDetectorRef: ChangeDetectorRef) { }

fileChange(input){
  this.readFiles(input.files);
}
readFile(file, reader, callback){
  reader.onload = () => {
    callback(reader.result);
    this.q_img=reader.result;
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
      }
    );

    this._cat_data.getAllCategory().subscribe(
      (data:CategoryModel[])=>{
        this.allcat=data;
      }
    );
    if(this.pk_q_id!=0)
    {
      this._que_data.getQuestionById(this.pk_q_id).subscribe(

        (data:QuestionModel[])=>{
          
          this.pk_q_id=data[0].pk_q_id,
          this.fk_cat_id=data[0].fk_cat_id,
          this.q_title=data[0].q_title,
          this.q_desc=data[0].q_desc,
          this.q_date=data[0].q_date,
          this.q_img=data[0].q_img,
          
          this.flag=data[0].flag,
          this.fk_email_id=data[0].fk_email_id;
        }
      );
    }

  }


 addQuestion()
  {
    if(this.pk_q_id==0)
    {

    this._que_data.addQuestion(new QuestionModel(this.pk_q_id,this.q_title,this.q_desc,this.q_img,this.q_date,this.fk_email_id,this.fk_cat_id,0))
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
  
  else
  {
    //edit
    this._que_data.updateQuestion(new QuestionModel(this.pk_q_id,this.q_title,this.q_desc,this.q_img,this.q_date,this.fk_email_id,this.fk_cat_id,this.flag))
    .subscribe(
      (data:any)=>{

         console.log(data); 
         this._router.navigate(['/allQuestion']); 
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
