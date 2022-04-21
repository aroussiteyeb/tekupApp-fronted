import { Component, Input, OnInit, ViewChild , ElementRef} from '@angular/core';
import { faImage, faMicrophone, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from 'src/app/services/comment.service';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BehaviorSubject } from 'rxjs'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  imageIcon = faImage;
  vocalIcon = faMicrophone;
  documentAttachementIcon = faPaperclip;

  private commentFocusedObservable = new BehaviorSubject<boolean>(false)

  @Input() idUser : any;
  @Input() idParent : any;
  
  @Input()
    set cf(boolvar : boolean){
      this.commentFocusedObservable.next(boolvar)
    }

    get cf(){
      return this.commentFocusedObservable.getValue()
    }

  @ViewChild('textInput') textInput !: ElementRef;

  commentText = ""
  pfpPath : any;
  
  commentInputPlaceholder = "Make a comment ..."

  constructor(
    private profilePicService : ProfilePicService,
    private utilService : UtilsService,
    private commentService:  CommentService) { }

  ngOnInit(): void {

    //focus comment if pressed
    this.isCommentFocused()

    //get user Profile pic
    this.getProfilePic()

  }

  isCommentFocused(){
    this.commentFocusedObservable.subscribe({
      next : (cf : boolean) => {
        if(cf){
          this.textInput.nativeElement?.focus();
        }
      }
    })
  }

  getProfilePic(){
    this.profilePicService.getProfilePic(this.idUser).subscribe({
      next : (res : any) => {
        this.pfpPath = this.utilService.base64ToPic(res?.pfp);
        console.log("user pic",res)
      },
      error : (err : any) => {
        console.log("error getting profile pic in comment form ")
      }
    })
  }

  postComment(){
  
    let fg = new FormGroup({
      idUser : new FormControl(this.idUser),
      idParent : new FormControl(this.idParent),
      text : new FormControl(this.commentText),
      creationDate : new FormControl(new Date().toString())
    })

    this.commentService.postComment(fg.value).subscribe({
      next : (res : any) => { 
        console.log("Comment Added successfully");
        this.commentText = "";
      },
      error : (err : any) => {
        console.log(err);
      }
    })
  }


}
