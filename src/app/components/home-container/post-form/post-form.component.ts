import { Component, OnInit, NgZone, Output, EventEmitter, Input} from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { UtilsService } from 'src/app/services/utils.service';
import { faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  imageUploadIcon = faImage

  postText = ""
  postImage : any;
  imageChosen : boolean = false;
  submitted : boolean = false;

  pfpPath : any = null

  @Input() idUser : any;

  @Output() postSumbitted = new EventEmitter<boolean>();

  postForm = new FormGroup({
    text : new FormControl(''),
  });

  constructor(
    private postService: PostService,
    private profilePicService : ProfilePicService,
    private utilService : UtilsService,
    private router : Router,
    private ngZone : NgZone,) { 
    }

  ngOnInit(): void {
    this.getCurrentUserProfilePic()
  }

  addPost(){

    this.submitted = true;

    let fd = new FormData();
    fd.append("text",this.postForm.controls['text'].value)
    fd.append("idUser",this.idUser);
    fd.append("creationDate",new Date().toString());

    if(this.postImage){
      fd.append("media",this.postImage,this.postImage.name);
    }
  
    this.postService.createPost(fd).subscribe(
      {
        next : (res) => {
          console.log('Post successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/home'))

          //notifying parent that post is sumbitted
          this.postSumbitted.emit(this.submitted)

          //resetting Form fields
          
          this.submitted = false;
          this.imageChosen = false;
          this.postImage = undefined;
          this.postText = "";
        },
        error : (error) => {
          console.log(error);
        }
    });
  }

  fileChosen(event : any){
    if(event.target.value){
      this.postImage = <File>event.target.files[0];
      this.imageChosen = true
    }
  }

  getCurrentUserProfilePic(){
    this.profilePicService.getProfilePic(this.idUser).subscribe({
      next : (res : any) => {
        this.pfpPath = this.utilService.base64ToPic(res?.pfp)
      },
      error : (err : any) => {
        console.log("error getting profile pic in post-form")
      }
    })
  }

  mediaUploadClick(mediaInput : HTMLElement){
    mediaInput.click()
  }
  
}
