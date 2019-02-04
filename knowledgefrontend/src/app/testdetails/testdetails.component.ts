import { Component, OnInit } from '@angular/core';
import { TestdetailsModel } from '../shared/testdetails-model';
import { TestdetailsdataService } from '../shared/testdetailsdata.service';
import { TestdetailsModel1 } from '../shared/testdetails-model1';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.css']
})
export class TestdetailsComponent implements OnInit {

delarr:TestdetailsModel1[]=[];
alltestdetails:TestdetailsModel1[]=[];

  constructor(public _test_data:TestdetailsdataService,public _router:Router) { }

  ngOnInit() {

    this._test_data.getTest_details_join().subscribe(

      (data:TestdetailsModel1[])=>{
        this.alltestdetails=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    );
  }


   deleteTest_details(item:TestdetailsModel1){

  this._test_data.deleteTest_details(item.pk_test_details_id).subscribe(
   (data:any)=>{
      this.alltestdetails.splice(this.alltestdetails.indexOf(item),1);
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

 addTest_details(item:TestdetailsModel1){

        this._router.navigate(['/addTestdetails',0]);
}

 updateTest_details(item:TestdetailsModel1)
  {
      this._router.navigate(['/addTestdetails',item.pk_test_details_id]);
  }

 
i:number=0;
    checkChange(item:TestdetailsModel1)
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
      this._test_data.deleteAll(this.delarr).subscribe(
        
          (data:any)=>{
            
            for(this.i=0 ; this.i<this.delarr.length ; this.i++)
            {
               if(this.alltestdetails.find(x=>x==this.delarr[this.i]))
                {
                   this.alltestdetails.splice(this.alltestdetails.indexOf(this.delarr[this.i]),1);
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
