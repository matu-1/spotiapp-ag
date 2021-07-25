import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../interfaces/album';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(value: Image[]): string {
    if(!value || value?.length == 0) return 'assets/img/noimage.png';
    return value[0].url;
  }

}
