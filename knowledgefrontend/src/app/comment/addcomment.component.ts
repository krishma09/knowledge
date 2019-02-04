import { Component, OnInit } from '@angular/core';
import { CommentModel } from '../shared/comment-model';
import { CommentdataService } from '../shared/commentdata.service';
import { Router,ActivatedRoute } from '@angular/router';
import { UserModel } from '../shared/user-model';
import { UserdataService } from '../shared/userdata.service';
import { CommentUserModel } from '../shared/comment-user-model';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.css']
})
export class AddcommentComponent implements OnInit {
private pk_c_id:number;
private fk_d_id:number;
private fk_email_id:string;
private comment:string;
private date:string;
private u_name:string;
private pk_email_id:string;


private _subscription:Subscription;

  public cmnt:CommentModel[]=[];
  public user:UserModel[]=[];

  constructor(public _cmnt_data:CommentdataService,public _router:Router,public _acroute:ActivatedRoute,public _user_data:UserdataService) { }

  ngOnInit() {

this._subscription=this._acroute.params.subscribe(

      (params:any)=>{

       this.pk_c_id =params["pk_c_id"];
      }
    );

    this._user_data.getAllUsertbl().subscribe(
      (data:UserModel[])=>{
        this.user=data;
      }
    );
    if(this.pk_c_id!=0)
    {
      this._cmnt_data.getCommentById(this.pk_c_id).subscribe(

        (data:CommentModel[])=>{
          
          this.fk_d_id=data[0].fk_d_id,
          this.fk_email_id=data[0].fk_email_id,
          this.comment=data[0].comment,
          this.date=data[0].date,
          this.pk_c_id=data[0].pk_c_id;
        }
      );
    }

  }

     addComment()
  {
    if(this.pk_c_id==0)
    {

    

    this._cmnt_data.addComment(new CommentModel(this.fk_d_id,this.fk_email_id,this.comment,this.date,this.pk_c_id))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allComment']);
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
    this._cmnt_data.updateComment(new CommentModel(this.fk_d_id,this.fk_email_id,this.comment,this.date,this.pk_c_id))
    .subscribe(
      (data:any)=>{

         console.log(data); 
         this._router.navigate(['/allComment']); 
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
