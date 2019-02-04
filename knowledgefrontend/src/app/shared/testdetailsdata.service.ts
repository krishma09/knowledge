import { Injectable } from '@angular/core';
import { TestdetailsModel } from './testdetails-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TestdetailsdataService {

private url:string="http://localhost:3000/tests_details/";
private url1:string="http://localhost:3000/tests_detailsjoin/";
 
 constructor(public _http:Http) { }


getAllTest_details(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addTest_details(item:TestdetailsModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteTest_details(id:number){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateTest_details(item:TestdetailsModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_test_details_id,body,req).map((res:Response)=>res.json());
}

getTest_details_join(){

return this._http.get(this.url1).map((res:Response)=>res.json());
}

getTest_details_ById(pk_test_details_id:number){
  return this._http.get(this.url+pk_test_details_id).map((res:Response)=>res.json());
  }

   getTest_details_joinById(pk_test_details_id:number){
  return this._http.get(this.url1+pk_test_details_id).map((res:Response)=>res.json());
  }

  deleteAll(item:TestdetailsModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}                                 



}
