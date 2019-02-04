export class FeedbackUserModel {

    public constructor(public f_cat:string,public fk_email_id:string,public f_desc:string,public f_date:string,public pk_f_id:number,
    public u_name:string,public pk_email_id:string,public u_pwd:string,public u_gender:string,public u_city:string,public u_pic:string,public u_type:string) {}
}
