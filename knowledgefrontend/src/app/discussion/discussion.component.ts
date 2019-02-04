import { Component, OnInit } from '@angular/core';
import { DiscussionModel } from '../shared/discussion-model';
import { DiscussiondataService } from '../shared/discussiondata.service';
import { DiscussionModel1 } from '../shared/discussion-model1';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

delarr:DiscussionModel1[]=[];
allDiscussion1:DiscussionModel1[]=[];
  constructor(public _dis_data:DiscussiondataService,public _router:Router) { }

cmnt(item:DiscussionModel1){
    this._router.navigate(['/cmntlink',item.pk_d_id]);
  } 

  ngOnInit() {

 this._dis_data.getDiscussionjoin().subscribe(

      (data:DiscussionModel1[])=>{
        this.allDiscussion1=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    ); 

  }

   deleteDiscussion(item:DiscussionModel1){

  this._dis_data.deleteDiscussion(item.pk_d_id).subscribe(
   (data:any)=>{
      this.allDiscussion1.splice(this.allDiscussion1.indexOf(item),1);
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

 addDiscussion(item:DiscussionModel1){

        this._router.navigate(['/addDiscussion',0]);
}

 updateDiscussion(item:DiscussionModel1)
  {
      this._router.navigate(['/addDiscussion',item.pk_d_id]);
  }


i:number=0;
    checkChange(item:DiscussionModel1)
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
      this._dis_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.allDiscussion1.find(x=>x==this.delarr[this.i]))
                {
                   this.allDiscussion1.splice(this.allDiscussion1.indexOf(this.delarr[this.i]),1);
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
