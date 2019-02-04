import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { UserModel } from '../shared/user-model';
import { UserdataService } from '../shared/userdata.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

public user:UserModel[]=[];
private _subscription:Subscription;
private u_name:string;
private pk_email_id:string;
private u_pwd:string;
private u_gender:string;
private u_city:string;
private u_pic:string;
private u_type:string;


 title = 'app works!';
  path='';
   public file_srcs: string[] = [];
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];

  constructor(public _user_data:UserdataService,public _router:Router,public _acroute:ActivatedRoute,private changeDetectorRef: ChangeDetectorRef) { }


fileChange(input){
  this.readFiles(input.files);
}
readFile(file, reader, callback){
  reader.onload = () => {
    callback(reader.result);
    this.u_pic=reader.result;
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

       this.pk_email_id =params["pk_email_id"];
      }
    );

     this._user_data.getAllUsertbl().subscribe(
      (data:UserModel[])=>{
        this.user=data;
      }
    );
    if(this.pk_email_id!='0')
    {
      this._user_data.getUserById(this.pk_email_id).subscribe(

        (data:UserModel[])=>{
          
          this.u_name=data[0].u_name,
          this.pk_email_id=data[0].pk_email_id,
          this.u_pwd=data[0].u_pwd,
          this.u_gender=data[0].u_gender,
          this.u_city=data[0].u_city,
          this.u_pic=data[0].u_pic,
          this.u_type=data[0].u_type;
        }
      );
    }



  }


   addUsertbl()
  {
   

    

    this._user_data.addUsertbl(new UserModel(this.u_name,this.pk_email_id,this.u_pwd,this.u_gender,this.u_city,this.u_pic,"user"))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allUser']);
    },
    function(error){},
    function(){
     
      alert('added');
      }
    );
  
  

  }


}
