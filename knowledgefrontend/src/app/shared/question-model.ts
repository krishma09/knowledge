export class QuestionModel {

     public constructor(public pk_q_id:number,public q_title:string,public q_desc:string,public q_img:string,public q_date:string,public fk_email_id:string,public fk_cat_id:number,public flag:number) {}
}
