import { Injectable } from '@angular/core';
import { QuestionModel } from './question-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class QuestiondataService {
private url:string="http://localhost:3000/questions/";
private url1:string="http://localhost:3000/questionsjoin/";
  constructor(public _http:Http) { }

getAllQuestion(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addQuestion(item:QuestionModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteQuestion(id:number){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateQuestion(item:QuestionModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_q_id,body,req).map((res:Response)=>res.json());
}

getQuestionjoin(){

return this._http.get(this.url1).map((res:Response)=>res.json());
}

getQuestionById(pk_q_id:number){
  return this._http.get(this.url+pk_q_id).map((res:Response)=>res.json());
  }

   getQuestionjoinById(pk_q_id:number){
  return this._http.get(this.url1+pk_q_id).map((res:Response)=>res.json());
  }

  deleteAll(item:QuestionModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}                                 

}
