import { Injectable } from '@angular/core';
import { TestModel } from './test-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TestdataService {

private url:string="http://localhost:3000/tests/";
private url1:string="http://localhost:3000/testsjoin/";

  constructor(public _http:Http) { }

getAllTest(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addTest(item:TestModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteTest(id:number){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateTest(item:TestModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_t_id,body,req).map((res:Response)=>res.json());
}

getTestjoin(){

return this._http.get(this.url1).map((res:Response)=>res.json());
}

getTestById(pk_t_id:number){
  return this._http.get(this.url+pk_t_id).map((res:Response)=>res.json());
  }

  deleteAll(item:TestModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}


}
