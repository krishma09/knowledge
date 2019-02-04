export class QuestionModel1 {

    public constructor(public pk_q_id:number,public q_title:string,public q_desc:string,public q_img:string,public q_date:string,public fk_email_id:string,public fk_cat_id:number,public flag:number,
    public pk_cat_id:number,public cat_name:string,public cat_img:string,
    public u_name:string,public pk_email_id:string,public u_pwd:string,public u_gender:string,public u_city:string,public u_pic:string) {}
}
