export class AnswerUserModel {

    public constructor(public pk_ans_id:number,public ans_desc:string,public fk_email_id:string,public fk_q_id:number,public ans_date:string,public ans_ex:string,public flag:number,public ans_img:string,
    public u_name:string,public pk_email_id:string,public u_pwd:string,public u_gender:string,
    public u_city:string,public u_pic:string){}
}
