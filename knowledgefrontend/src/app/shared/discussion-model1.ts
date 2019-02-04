export class DiscussionModel1 {

    public constructor(public pk_d_id:number,public fk_cat_id:number,public d_title:string,public d_desc:string,public d_date:string,public fk_email_id:string,
    public pk_cat_id:number,public cat_name:string,public cat_img:string,
    public u_name:string,public pk_email_id:string,public u_pwd:string,public u_gender:string,public u_city:string,public u_pic:string) {}
}
