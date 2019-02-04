import { Component, OnInit } from '@angular/core';
import { TestdetailsModel } from '../shared/testdetails-model';
import { TestdetailsdataService } from '../shared/testdetailsdata.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../shared/category-model';
import { CategorydataService } from '../shared/categorydata.service';
import { Subscription } from 'rxjs/Rx';
import { TestdetailsModel1 } from '../shared/testdetails-model1';

@Component({
  selector: 'app-addtestdetails',
  templateUrl: './addtestdetails.component.html',
  styleUrls: ['./addtestdetails.component.css']
})
export class AddtestdetailsComponent implements OnInit {

  private pk_test_details_id:number;
  private fk_email_id:string;
  private fk_cat_id:number;
  private t_marks:number;
  private t_date:string;
  private cat_name:string;
  private pk_cat_id:string;

  private _subscription:Subscription;

  public allcat:CategoryModel[]=[];  
  public test:TestdetailsModel1[]=[];

  constructor(public _test_data:TestdetailsdataService,public _router:Router,public _acroute:ActivatedRoute,public _cat_data:CategorydataService) { }

  ngOnInit() {

this._subscription=this._acroute.params.subscribe(

      (params:any)=>{

       this.pk_test_details_id =params["pk_test_details_id"];
      }
    );

    this._cat_data.getAllCategory().subscribe(
      (data:CategoryModel[])=>{
        this.allcat=data;
      }
    );
    if(this.pk_test_details_id!=0)
    {
      this._test_data.getTest_details_ById(this.pk_test_details_id).subscribe(

        (data:TestdetailsModel[])=>{
          
          this.pk_test_details_id=data[0].pk_test_details_id,
          this.fk_email_id=data[0].fk_email_id,
           this.fk_cat_id=data[0].fk_cat_id,
          this.t_marks=data[0].t_marks,
          this.t_date=data[0].t_date;
        }
      );
    }

  }


  addTest_details()
  {
    if(this.pk_test_details_id==0)
    {

    this._test_data.addTest_details(new TestdetailsModel(this.pk_test_details_id,this.fk_email_id,this.fk_cat_id,this.t_marks,this.t_date))
    .subscribe(
      (data:any)=>{

         console.log(data);
         this._router.navigate(['/allTestdetails']);
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
    this._test_data.updateTest_details(new TestdetailsModel(this.pk_test_details_id,this.fk_email_id,this.fk_cat_id,this.t_marks,this.t_date))
    .subscribe(
      (data:any)=>{

         console.log(data); 
         this._router.navigate(['/allTestdetails']); 
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
