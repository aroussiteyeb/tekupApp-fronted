import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postMedia'
})
export class PostMediaPipe implements PipeTransform {

  transform(postMedia : string): any {
    return postMedia?postMedia:'';
  }

}
