import { Injectable } from '@angular/core';


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userDefaultCover'
})

@Injectable({
  providedIn: 'root'
})
export class UserDefaultCoverService implements PipeTransform {

  transform(userCover : string | undefined): string {
    return userCover?userCover:"assets/images/auth-first-background.jpg"
  }
}
