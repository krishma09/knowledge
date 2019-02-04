import { Component, OnInit } from '@angular/core';
import { TestModel } from '../shared/test-model';
import { TestdataService } from '../shared/testdata.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../shared/category-model';
import { CategorydataService } from '../shared/categorydata.service';
import { Subscription } from 'rxjs/Rx';
import { TestCatModel } from '../shared/test-cat-model';

@Component({
  selector: 'app-addtest',
  templateUrl: './addtest.component.html',
  styleUrls: ['./addtest.component.css']
})
export class AddtestComponent implements OnInit {

private t_que:string;
private t_option1:string;
private t_option2:string;
private t_option3:string;
private t_option4:string;
private t_answer:string;
private fk_cat_id:number;
private pk_t_id:number;

private cat_name:string;
private pk_cat_id:string;
private _subscription:Subscription;

public allcat:CategoryModel[]=[];  
public test:TestModel[]=[];

  constructor(public _test_data:TestdataService,public _router:Router,public _acroute:ActivatedRoute,public _cat_data:CategorydataService) { }

  ngOnInit() {

this._subscription=this._acroute.params.subscribe(

      (params:any)=>{

       this.pk_t_id =params["pk_t_id"];
      }
    );

    this._cat_data.getAllCategory().subscribe(
      (data:CategoryModel[])=>{
        this.allcat=data;
      }
    );
    if(this.pk_t_id!=0)
    {
      this._test_data.getTestById(this.pk_t_id).subscribe(

        (data:TestModel[])=>{
          
          this.t_que=data[0].t_que,
          this.t_option1=data[0].t_option1,
          this.t_option2=data[0].t_option2,
          this.t_option3=data[0].t_option3,
          this.t_option4=data[0].t_option4,
          this.t_answer=data[0].t_answer,
          this.fk_cat_id=data[0].fk_cat_id,
          this.pk_t_id=data[0].pk_t_id;
        }
      );
    }

  }

   addTest()
  {
    if(this.pk_t_id==0)
    {

    

    this._test_data.addTest(new TestModel(this.t_que,this.t_option1,this.t_option2,this.t_option3,this.t_option4,this.t_answer,this.fk_cat_id,this.pk_t_id))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allTest']);
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
    this._test_data.updateTest(new TestModel(this.t_que,this.t_option1,this.t_option2,this.t_option3,this.t_option4,this.t_answer,this.fk_cat_id,this.pk_t_id))
    .subscribe(
      (data:any)=>{

         console.log(data); 
         this._router.navigate(['/allTest']); 
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
