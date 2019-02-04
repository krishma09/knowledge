import { Pipe, PipeTransform } from '@angular/core';
import { QuestionModel1 } from '../shared/question-model1';

@Pipe({
  name: 'questionfilter'
})
export class QuestionfilterPipe implements PipeTransform {

cname:any[]=[];
qtitle:any[]=[];

  transform(value: any, args?: any): any {
    if(args!='')
    {
      this.cname=value.filter(res=>res.cat_name.toLowerCase().includes(args.toLowerCase()));
      this.qtitle=value.filter(res=>res.q_title.toLowerCase().includes(args.toLowerCase()));
      

      return this.cname.concat(this.qtitle);
    }
    else{
      return value;
    }
  }

}
