import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePeriod'
})
export class TimePipe implements PipeTransform {

  transform(dateString : Date): string {
    
     // return daysPeriod.toString();
    return this.choosePeriod(dateString);
    
  }

  private choosePeriod(dateString : Date){

    let date = new Date(dateString);    
    let currentDate = new Date();

    let daysPeriod = currentDate.getDay() - date.getDay()
    let secondsPeriod = currentDate.getSeconds() - date.getSeconds()
    let minutesPeriod = currentDate.getMinutes() - date.getMinutes();
    let hoursPeriod = currentDate.getHours() - date.getHours();

    let msg = ""

    if(daysPeriod>0){
      msg = daysPeriod.toString()
      
      if(daysPeriod == 1){
        
        msg+=" day ago"

      }else{
        msg+=" days ago"
      }
    }else if(hoursPeriod>0){
      
      msg = hoursPeriod.toString()
      
      if(hoursPeriod == 1){
        
        msg+=" hour ago"

      }else{
        msg+=" hours ago"
      }
    }else if(minutesPeriod>0){
      
      msg = minutesPeriod.toString()
      
      if(hoursPeriod == 1){
        
        msg+=" minute ago"

      }else{
        msg+=" minutes ago"
      }
    }else if(secondsPeriod>0){
      
      msg = secondsPeriod.toString()
      
      if(secondsPeriod == 1){
        
        msg+=" second ago"

      }else{
        msg+=" seconds ago"
      }
    }
    
  return msg
  }


}
