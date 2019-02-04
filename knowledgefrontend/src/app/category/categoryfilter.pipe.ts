import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../shared/category-model';

@Pipe({
  name: 'categoryfilter'
})
export class CategoryfilterPipe implements PipeTransform {

cname:any[]=[];

  transform(value: any, args?: any): any {
    if(args!='')
    {
      this.cname=value.filter(res=>res.cat_name.toLowerCase().includes(args.toLowerCase()));

      return this.cname;
    }
    else{
      return value;
    }
  }

}
