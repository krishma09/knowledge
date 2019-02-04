import { Injectable } from '@angular/core';
import { CommentModel } from './comment-model';
import { Http,Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';
 
@Injectable()
export class CommentdataService {
private url:string="http://localhost:3000/comments/";
private url1:string="http://localhost:3000/commentsjoin/";
private url2:string="http://localhost:3000/commentbydisid/";

  constructor(public _http:Http) { }

getAllComment(){

return this._http.get(this.url).map((res:Response)=>res.json());
}
addComment(item:CommentModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.post(this.url,body,req).map((res:Response)=>res.json());
}
deleteComment(id:number){

let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.delete(this.url+id,req).map((res:Response)=>res.json());
}
updateComment(item:CommentModel){

let body=JSON.stringify(item);
let header=new Headers({'Content-Type':'application/json'});
let req=new RequestOptions({headers:header});
return this._http.put(this.url+item.pk_c_id,body,req).map((res:Response)=>res.json());
}

getCommentUserjoin(){

return this._http.get(this.url1).map((res:Response)=>res.json());
}

getCommentById(pk_c_id:number){
  return this._http.get(this.url+pk_c_id).map((res:Response)=>res.json());
}

getCommentByDisId(pk_c_id:number){
    return this._http.get(this.url2+pk_c_id).map((res:Response)=>res.json());
  }

 deleteAll(item:CommentModel[]){
  let body=JSON.stringify(item);
   let headers=new Headers({'Content-Type':'application/json'});
  let requestoption=new RequestOptions({headers:headers});
  return this._http.post(this.url+1,body,requestoption).map((res:Response)=>res.json());
  
}

}
