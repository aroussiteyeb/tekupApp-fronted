import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faTrophy, faEdit, faPlusCircle, faTasks, faUsers, faChessRook } from '@fortawesome/free-solid-svg-icons';
import { CoverPicService } from 'src/app/services/cover-pic.service';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  editIcon = faEdit;
  addIcon = faPlusCircle;
  featIcon = faTrophy;
  eventIcon = faTasks;
  groupIcon = faUsers;
  clubIcon = faChessRook;
  
  friendsNumber = 300;  

  pfpPath = "";
  pfp : any;
  pfpChosen = false;
  pfpSumbitted = false;

  cover : any;
  coverChosen = false;
  coverSumbitted = false;

  bio = ""

  user : any;

  @Input() idUser : any;
  @ViewChild('pfpForm') pfpForm !: ElementRef;
  @ViewChild('CoverForm') coverForm !: ElementRef;

  coverPath="";

  constructor(
    private profilePicService : ProfilePicService,
    private utilService : UtilsService,
    private userService : UserService,
    private coverPicService : CoverPicService) { }

  ngOnInit(): void {

    //getting user info
    this.getUser()
    
    //getting profile pic
    this.getProfilePic()

     //getting Cover pic
     this.getCoverPic()
  }


  getCoverPic() {
   this.coverPicService.getCoverPic(this.idUser).subscribe({
      next : (res : any) => {
        console.log('cover pic got')
        this.cover = res
        this.coverPath =  this.utilService.base64ToPic(res?.cover)
      },
      error : (err : any) => {
        console.log('error getting cover pic')
      } 
    })  }

  choosePfp(event : any){
    if(event.target.value){
      this.pfp = <File>event.target.files[0];
      this.pfpChosen = true
      this.submitPfp()
    }
  }

  chooseCover(event : any){
    if(event.target.value){
      this.cover = <File>event.target.files[0];
      this.coverChosen = true
      this.submitCover()
    }
  }


  submitCover(){

    this.coverSumbitted = true;

    if(this.cover){
      
      let fg = new FormGroup({
        cover : new FormControl(this.cover),
        creationDate : new FormControl(new Date())
      })
      
      let fd = new FormData(this.coverForm.nativeElement);
      fd.append('cover',fg.controls['cover'].value,fg.controls['cover'].value.name);
      fd.append('creationDate',fg.controls['creationDate'].value);
      fd.append('idUser',this.idUser)

      this.coverPicService.addCoverPic(fd).subscribe({
        next : (res : any) => {
          console.log("cover pic added successfully")
          this.getCoverPic()
        },
        error : (err : any) => {
          console.log("Error adding coverPic")
          console.log(err) 
        },
        complete : ()=> {
          //resetting File data 
          this.coverChosen = false;
          this.coverSumbitted = false;
          this.cover = null;
        }
      })
    }
  }

  submitPfp(){

    this.pfpSumbitted = true;

    if(this.pfp){
      
      let fg = new FormGroup({
        pfp : new FormControl(this.pfp),
        creationDate : new FormControl(new Date())
      })
      
      let fd = new FormData(this.pfpForm.nativeElement);
      fd.append('pfp',fg.controls['pfp'].value,fg.controls['pfp'].value.name);
      fd.append('creationDate',fg.controls['creationDate'].value);
      fd.append('idUser',this.idUser)

      this.profilePicService.addProfilePic(fd).subscribe({
        next : (res : any) => {
          console.log("profile pic added successfully")
          this.getProfilePic()
        },
        error : (err : any) => {
          console.log("Error adding profilePic")
          console.log(err) 
        },
        complete : ()=> {
          //resetting File data 
          this.pfpChosen = false;
          this.pfpSumbitted = false;
          this.pfp = null;
        }
      })
    }
  }
  
  inputClicked(inputPfp : HTMLElement){
    inputPfp.click()
  }

  getProfilePic(){
    this.profilePicService.getProfilePic(this.idUser).subscribe({
      next : (res : any) => {
        console.log('profile pic got')
        this.pfp = res
        this.pfpPath =  this.utilService.base64ToPic(res?.pfp)
      },
      error : (err : any) => {
        console.log('error getting profile pic')
      } 
    })
  }

  getUser(){
    this.userService.getUser(this.idUser).subscribe({
      next : (res : any) => {
        this.user = res;
      },
      error : (err : any) => {
        console.log("error getting user in profile components ")
      }
    })
  }

}
