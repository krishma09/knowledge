import { Injectable } from '@angular/core';
import { AnswerModel } from './answer-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class AnswerdataService {
private url:string="http://localhost:3000/answers/";
private url1:string="http://localhost:3000/ansjoin/";
private url2:string="http://localhost:3000/answerbyqueid/";
  constructor(public _http:Http) { }

getAllAnswer(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addAnswer(item:AnswerModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteAnswer(id:number){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateAnswer(item:AnswerModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_ans_id,body,req).map((res:Response)=>res.json());
}

getAnswerjoin(){

return this._http.get(this.url1).map((res:Response)=>res.json());
}

getAnswerById(pk_ans_id:number){
  return this._http.get(this.url+pk_ans_id).map((res:Response)=>res.json());
  }

  getAnswertByQueId(pk_ans_id:number){
    return this._http.get(this.url2+pk_ans_id).map((res:Response)=>res.json());
  }

  deleteAll(item:AnswerModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}

}
