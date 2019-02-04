import { Pipe, PipeTransform } from '@angular/core';
import { DiscussionModel1 } from '../shared/discussion-model1';

@Pipe({
  name: 'discussionfilter'
})
export class DiscussionfilterPipe implements PipeTransform {

cname:any[]=[];
dtitle:any[]=[];
ddesc:any[]=[];
uname:any[]=[];

  transform(value: any, args?: any): any {
    if(args!='')
    {
      this.cname=value.filter(res=>res.cat_name.toLowerCase().includes(args.toLowerCase()));
      this.dtitle=value.filter(res=>res.d_title.toLowerCase().includes(args.toLowerCase()));
      

      return this.cname.concat(this.dtitle);
    }
    else{
      return value;
    }
  }

}
