import { ViewChild, Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-second',
  templateUrl: './auth-second.component.html',
  styleUrls: ['./auth-second.component.css']
})
export class AuthSecondComponent implements OnInit {


  @ViewChild('loginLi') loginli ?: ElementRef;
  @ViewChild('registerLi') registerLi ?: ElementRef;

  @Output() successEmitter = new EventEmitter<boolean>();

  loginActive = true;

  constructor() { }

  ngOnInit(): void {
  }

  loginSelect(){
    if(!this.loginActive){
      this.loginActive = true;
      this.registerLi?.nativeElement.classList.remove("active");
      this.loginli?.nativeElement.classList.add("active");
    }else;{
      return
    }
    
  }

  registerSelect(){
    if(this.loginActive){
      this.loginActive = false;
      this.loginli?.nativeElement.classList.remove("active");
      this.registerLi?.nativeElement.classList.add("active");
    }else{
      return
    }
  }

  toLoginTab(b: boolean){
    this.successEmitter.emit(true);
    this.loginSelect();
  }
}
