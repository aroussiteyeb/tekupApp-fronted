import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userDefaultPfp'
})
export class UserDefaultPfpPipe implements PipeTransform {

  transform(userPfp : string | undefined): string {
    return userPfp?userPfp:"assets/images/default-pfp.jpg"
  }

}
