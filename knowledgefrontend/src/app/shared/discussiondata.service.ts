import { Injectable } from '@angular/core';
import { DiscussionModel } from './discussion-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DiscussiondataService {
private url:string="http://localhost:3000/discussions/";
private url1:string="http://localhost:3000/discussionsjoin/";
  constructor(public _http:Http) { }

getAllDiscussion(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addDiscussion(item:DiscussionModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteDiscussion(id:number){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateDiscussion(item:DiscussionModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_d_id,body,req).map((res:Response)=>res.json());
}

getDiscussionjoin(){

return this._http.get(this.url1).map((res:Response)=>res.json());
}

getDiscussionById(pk_d_id:number){
  return this._http.get(this.url+pk_d_id).map((res:Response)=>res.json());
  }

   getDiscussionjoinById(pk_d_id:number){
  return this._http.get(this.url1+pk_d_id).map((res:Response)=>res.json());
  }

  deleteAll(item:DiscussionModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}



}
