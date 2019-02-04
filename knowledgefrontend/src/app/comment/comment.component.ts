import { Component, OnInit } from '@angular/core';
import { CommentModel } from '../shared/comment-model';
import { CommentdataService } from '../shared/commentdata.service';
import { Router } from '@angular/router';
import { CommentUserModel } from '../shared/comment-user-model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

delarr:CommentUserModel[]=[];   
allComment1:CommentUserModel[]=[];
  constructor(public _cmnt_data:CommentdataService,public _router:Router) { }

  ngOnInit() {

  this._cmnt_data.getCommentUserjoin().subscribe(

      (data:CommentUserModel[])=>{
        this.allComment1=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    ); 

  }
  deleteComment(item:CommentUserModel){

  this._cmnt_data.deleteComment(item.pk_c_id).subscribe(
   (data:any)=>{
      this.allComment1.splice(this.allComment1.indexOf(item),1);
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


 addComment(item:CommentUserModel){

        this._router.navigate(['/addComment',0]);
}

 updateComment(item:CommentUserModel)
  {
      this._router.navigate(['/addComment',item.pk_c_id]);
  }


  i:number=0;
    checkChange(item:CommentUserModel)
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
      this._cmnt_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.allComment1.find(x=>x==this.delarr[this.i]))
                {
                   this.allComment1.splice(this.allComment1.indexOf(this.delarr[this.i]),1);
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
