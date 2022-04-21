import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  eyeIcon = faEyeSlash
  passwordShown = false;
  passType = "password";

  email : string = "";
  password : string = "";

  submitDisabled = true

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private ngZone : NgZone,
    private userService : UserService,
    private sharingService : SharingService,) { }

  ngOnInit(): void {
  }

  ngDoCheck() : void{
    this.submitDisabled = !this.inputsNotEmplty();
  }  

  login(){
    if(
      //Validating text fields
      this.isEmailValid() && 
      this.isPasswordValid())
    { 
      // if inputs Valid
      console.log("valid");
      this.userService.getUserByEmailAndPass(this.email.toLowerCase(),this.password).subscribe(
        (res) => {
          //if res is not null
            if(res?._id){
              console.log('User found!\n');
              //Updating user.authenticated to true
              this.updateAuthState(res._id)
              // Load User ID into State
              this.sharingService.setSettings(res)
              // Redirect to home page
              this.ngZone.run(() => { 
                localStorage.setItem("currentUser",res._id) 
                this.router.navigate(['/home/main'], {state : {user : res}}) 
              })
            }
          //if res is null
            else{
              console.log('Email or password are incorrect ! ');
            }
        }, (error) => {
          console.log("User not found\n"+error);
        });
    }else{
      console.log("invalid")
      // if inputs Invalid
    }

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

  isEmailValid (){
    if(this.validateEmail(this.email) != null){
      console.log("email valid");
      return true;
    }else{
      console.log("email invalid");
      return false;
    }
  }

  isPasswordValid(){
    if(this.validatePassword(this.password) != null){
      console.log("password valid");
      return true
    }else{
      console.log("password invalid");
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
  
  private updateAuthState(id : any){
    this.userService.changeAuthState(id).subscribe(res => {
      console.log("finished Update of userAuth")
    },
    (error)=>{
      console.log("error updating authenticated",error)
    })
  }

  inputsNotEmplty(){
    if (
      this.email.length>0 && 
      this.password.length>0 ){
        return true;
      }
    else{
        return false;
    }  
  }
}
