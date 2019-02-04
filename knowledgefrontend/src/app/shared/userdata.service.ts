import { Injectable } from '@angular/core';
import {  UserModel} from './user-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserdataService {
private url:string="http://localhost:3000/usertbls/";
  constructor(public _http:Http) { }


getAllUsertbl(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addUsertbl(item:UserModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteUsertbl(id:string){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateUsertbl(item:UserModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_email_id,body,req).map((res:Response)=>res.json());
}



getUserById(pk_email_id:string){
  return this._http.get(this.url+pk_email_id).map((res:Response)=>res.json());
  }

  deleteAll(item:UserModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}



}
