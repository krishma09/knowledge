import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../shared/user-model';
import { UserdataService } from '../shared/userdata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

delarr:UserModel[]=[];  
allUser:UserModel[]=[];

  constructor(public _user_data:UserdataService,public _router:Router) { }

  ngOnInit() {

 this._user_data.getAllUsertbl().subscribe(

      (data:UserModel[])=>{
        this.allUser=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    ); 

  }


 deleteUsertbl(item:UserModel){

  this._user_data.deleteUsertbl(item.pk_email_id).subscribe(
   (data:any)=>{
      this.allUser.splice(this.allUser.indexOf(item),1);
      alert('udi gayu');
    },function(error){
        alert('vaat lagshe');
      },function(){
        console.log('badhu patyu');
      }
  );
}


addUsertbl(item:UserModel){

        this._router.navigate(['/addUser','0']);
}

 updateUsertbl(item:UserModel)
  {
      this._router.navigate(['/addUser',item.pk_email_id]);
  }


i:number=0;
    checkChange(item:UserModel)
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
      this._user_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.allUser.find(x=>x==this.delarr[this.i]))
                {
                   this.allUser.splice(this.allUser.indexOf(this.delarr[this.i]),1);
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
