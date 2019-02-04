import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { DiscussionModel } from '../shared/discussion-model';
import { DiscussiondataService } from '../shared/discussiondata.service';
import { DiscussionModel1 } from '../shared/discussion-model1';
import { CommentModel } from '../shared/comment-model';
import { CommentdataService } from '../shared/commentdata.service';
import { CommentUserModel } from '../shared/comment-user-model';

@Component({
  selector: 'app-cmntlink',
  templateUrl: './cmntlink.component.html',
  styleUrls: ['./cmntlink.component.css']
})
export class CmntlinkComponent implements OnInit {

allcmntbyid:CommentUserModel[]=[];
private _subscription:Subscription;

public pk_d_id:number;
//fk_cat_id:number;
d_title:string;
d_desc:string;
d_date:string;
fk_email_id:string;
u_name:string;
u_pic:string;

fk_d_id:number;
comment:string;
date:string;
pk_c_id:number;

  constructor(public _dis_data:DiscussiondataService,public _cmnt_data:CommentdataService,public _router:Router,public _acroute:ActivatedRoute) { }

  ngOnInit() {

    this._subscription=this._acroute.params.subscribe(

      (params:any)=>{

       this.pk_d_id =params["pk_d_id"];
       this.fk_d_id=params["pk_d_id"];
        console.log(this.pk_d_id);
      }
    );

    this._dis_data.getDiscussionjoinById(this.pk_d_id).subscribe(

        (data:DiscussionModel1[])=>{
          
            
         //   this.fk_cat_id=data[0].fk_cat_id,
            this.d_title=data[0].d_title,
            this.d_desc=data[0].d_desc,
            this.d_date=data[0].d_date,
            this.u_name=data[0].u_name;
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

      this._cmnt_data.getCommentByDisId(this.pk_d_id).subscribe(

      (data:CommentUserModel[])=>{
        this.allcmntbyid=data;
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


     addComment()
  {
    

    

    this._cmnt_data.addComment(new CommentModel(this.fk_d_id,this.fk_email_id,this.comment,this.date,this.pk_c_id))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allDiscussion']);
    },
    function(error){},
    function(){
     
      alert('added');
      }
    );
  


}

 deleteComment(item:CommentUserModel){

  this._cmnt_data.deleteComment(item.pk_c_id).subscribe(
   (data:any)=>{
      this.allcmntbyid.splice(this.allcmntbyid.indexOf(item),1);
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
