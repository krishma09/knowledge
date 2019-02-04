export class DiscussionModel {

    public constructor(public pk_d_id:number,public fk_cat_id:number,public d_title:string,public d_desc:string,public d_date:string,public fk_email_id:string) {}
}
