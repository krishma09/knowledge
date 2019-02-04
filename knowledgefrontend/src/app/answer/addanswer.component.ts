import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnswerModel } from '../shared/answer-model';
import { AnswerdataService } from '../shared/answerdata.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UserModel } from '../shared/user-model';
import { UserdataService } from '../shared/userdata.service';
import { Subscription } from 'rxjs/Rx';
import { AnswerUserModel } from '../shared/answer-user-model';


@Component({
  selector: 'app-addanswer',
  templateUrl: './addanswer.component.html',
  styleUrls: ['./addanswer.component.css']
})
export class AddanswerComponent implements OnInit {
private pk_ans_id:number;
private ans_desc:string;
private fk_email_id:string;
private fk_q_id:number;
private ans_date:string;
private ans_ex:string;
private flag:number;
private ans_img:string;


private pk_email_id:string
private _subscription:Subscription;


  public ans:AnswerModel[]=[];
  public user:UserModel[]=[];

  title = 'app works!';
  path='';
   public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];

  constructor(public _ans_data:AnswerdataService,public _router:Router,public _acroute:ActivatedRoute,public _user_data:UserdataService,private changeDetectorRef: ChangeDetectorRef) { }

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

       this.pk_ans_id =params["pk_ans_id"];
      }
    );

    this._user_data.getAllUsertbl().subscribe(
      (data:UserModel[])=>{
        this.user=data;
      }
    );
    if(this.pk_ans_id!=0)
    {
      this._ans_data.getAnswerById(this.pk_ans_id).subscribe(

        (data:AnswerModel[])=>{
          
          this.pk_ans_id=data[0].pk_ans_id,
          this.ans_desc=data[0].ans_desc,
          this.fk_email_id=data[0].fk_email_id,
          this.fk_q_id=data[0].fk_q_id,
          this.ans_date=data[0].ans_date,
          this.ans_ex=data[0].ans_ex,
          this.flag=data[0].flag,
          this.ans_img=data[0].ans_img;
        }
      );
    }

  }





   addAnswer()
  {
    if(this.pk_ans_id==0)
    {
    this._ans_data.addAnswer(new AnswerModel(this.pk_ans_id,this.ans_desc,this.fk_email_id,this.fk_q_id,this.ans_date,this.ans_ex,0,this.ans_img))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allAnswer']);
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
    this._ans_data.updateAnswer(new AnswerModel(this.pk_ans_id,this.ans_desc,this.fk_email_id,this.fk_q_id,this.ans_date,this.ans_ex,this.flag,this.ans_img))
    .subscribe(
      (data:any)=>{

         console.log(data); 
         this._router.navigate(['/allAnswer']); 
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
