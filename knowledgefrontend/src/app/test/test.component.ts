import { Component, OnInit } from '@angular/core';
import { TestdataService } from '../shared/testdata.service';
import { TestCatModel } from '../shared/test-cat-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

delarr:TestCatModel[]=[];
allTest:TestCatModel[]=[];

  constructor(public _test_data:TestdataService,public _router:Router) { }

  ngOnInit() {


 this._test_data.getTestjoin().subscribe(

      (data:TestCatModel[])=>{
        this.allTest=data;
      },
      function(error){
        alert('vaat lagshe');
      },
      function(){
        console.log('badhu patyu');
      }
    ); 

  }

   deleteTest(item:TestCatModel){

  this._test_data.deleteTest(item.pk_t_id).subscribe(
   (data:any)=>{
      this.allTest.splice(this.allTest.indexOf(item),1);
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

  addTest(item:TestCatModel){

        this._router.navigate(['/addTest',0]);
}

 updateTest(item:TestCatModel)
  {
      this._router.navigate(['/addTest',item.pk_t_id]);
  }


i:number=0;
    checkChange(item:TestCatModel)
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
               if(this.allTest.find(x=>x==this.delarr[this.i]))
                {
                   this.allTest.splice(this.allTest.indexOf(this.delarr[this.i]),1);
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
