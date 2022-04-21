import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatListPipe'
})
export class ChatListPipePipe implements PipeTransform {

  transform( chatList : any[], idUser: any): any[] {
    return chatList.filter((user : any) => user._id != idUser);
  }

}
