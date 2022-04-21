import { Component, EventEmitter, OnInit, Output, NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  eyeIcon = faEyeSlash;
  passwordShown = false;
  passType = "password";
  
  name : string = "";
  lastName : string = "";
  email : string = "";
  password : string = "";
  passConf : string = "";

  submitDisabled = true

  @Output() toLogin = new EventEmitter<boolean>();

  constructor(
    private userService : UserService, 
    private router: Router,
    private ngZone : NgZone) { }

  ngOnInit(): void {
  }

  ngDoCheck() : void{
    this.submitDisabled = !this.inputsNotEmplty();
  }

  register(){
    if(this.isNameLastNameValid(this.name) && 
      this.isNameLastNameValid(this.lastName) && 
      this.isEmailValid() && 
      this.isPasswordValid() &&
      this.isPassIdentical())
    { 
        
      this.userService.createUser({
        name: this.name,
        lastName : this.lastName,
        email : this.email.toLowerCase(),
        password : this.password,
        authenticated : false,
        imgUrl : undefined,
      }).subscribe({
        next : (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/'))
        }, 
        error : (error) => {
          console.log(error);
        }
      })

      console.log("valid");
      
      this.toLogin.emit(true);
    }else{
      console.log("invalid")
      // if inputs Invalid
    }
  }

  inputsNotEmplty(){
    if (
      this.name.length>0 &&
      this.lastName.length>0 && 
      this.email.length>0 && 
      this.password.length>0 && 
      this.passConf.length>0 ){
        return true;
      }
    else{
        return false;
    }  
  }


  isPassIdentical(){
    return this.passConf == this.password
  }

  isPasswordValid(){
    if(this.validatePassword(this.password) != null){
      return true
    }else{
      return false;
    }
  }

  isNameLastNameValid(name : string){
    return (name.length > 2)
  }

  isEmailValid (){
    if(this.validateEmail(this.email) != null){
      return true;
    }else{
      return false;
    }
  }

  validateEmail = (email : string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  validatePassword = (password : string) => {
    return String(password)
      .toLowerCase()
      .match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      );
  }

  passwordShowHide(){
    if(this.passwordShown){
      this.passType = "password";
      this.passwordShown = false;
      this.eyeIcon = faEyeSlash;
    }else{
      this.passType = "text";
      this.passwordShown = true;
      this.eyeIcon = faEye;
    }
  }

}
