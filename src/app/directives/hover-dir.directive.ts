import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverDir]'
})
export class HoverDirDirective {

  constructor() { }

  @HostBinding('classList') cl : string = "reaction transition-2s link-wrapper"

  @HostListener('mouseenter') mouseenter(){
    console.log(this.cl);
    
    if(this.cl.split(" ").indexOf("active-link") != -1){
      this.cl = "reaction transition-2s link-wrapper active-link";
    }else{
      this.cl = "reaction transition-2s link-wrapper reaction-hover";     
    }
}
  
  @HostListener('mouseleave') mouseleave(){
    if(!this.cl.includes("active-link")){
      this.cl = "reaction transition-2s link-wrapper"
    }else{
      this.cl = "reaction transision-2s link-wrapper active-link"
    }
  }
}
