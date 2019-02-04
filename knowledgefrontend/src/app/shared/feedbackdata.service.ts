import { Injectable } from '@angular/core';
import { FeedbackModel } from './feedback-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class FeedbackdataService {
private url:string="http://localhost:3000/feedbacks/";
private url1:string="http://localhost:3000/feedbackjoin/";
  constructor(public _http:Http) { }

getAllFeedback(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addFeedback(item:FeedbackModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteFeedback(id:number){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateFeedback(item:FeedbackModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_f_id,body,req).map((res:Response)=>res.json());
}

getFeedbackjoin(){

return this._http.get(this.url1).map((res:Response)=>res.json());
}

getFeedbackById(pk_f_id:number){
  return this._http.get(this.url+pk_f_id).map((res:Response)=>res.json());
  }

 deleteAll(item:FeedbackModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}

}
