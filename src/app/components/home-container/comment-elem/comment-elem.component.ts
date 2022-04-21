import { Component, Input, OnInit } from '@angular/core';
import { faEdit, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { zip } from 'rxjs';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-comment-elem',
  templateUrl: './comment-elem.component.html',
  styleUrls: ['./comment-elem.component.css']
})
export class CommentElemComponent implements OnInit {

  deleteIcon = faTrash;
  editIcon = faEdit;
  likeIcon = faThumbsUp;

  @Input() postUserId : any;
  @Input() comment : any; 

  commentUserId : any;
  userName ?: string;
  userLastName ?: string;
  text ?: string;
  pfpPath ?: string;
  creationDate ?: string;

  constructor(
    private profilePicService : ProfilePicService,
    private utilService : UtilsService,
    private userService : UserService) { }

  ngOnInit(): void {

    //getting comment info
    this.getCommentInfo();

    //getting comment user pfp
    this.getCommentUserPfp();

    //getting comment user info
    this.getCommentUser();
  }

  getCommentInfo(){
        //getting comment user id
        this.commentUserId = this.comment.idUser;

        //getting comment text 
        this.text = this.comment.text
    
        //getting comment creation Date
        this.creationDate = this.comment.creationDate;
  }

  getCommentUserPfp(){
    this.profilePicService.getProfilePic(this.commentUserId).subscribe({
      next : (res : any) => {
        this.pfpPath = this.utilService.base64ToPic(res?.pfp)
      },
      error : (err: any) => {
        console.log("Error getting profile pic in comment for post "+this.comment.idParent)
      }
    })
  }

  getCommentUser(){
    this.userService.getUser(this.commentUserId).subscribe({
      next : (res : any) => {
        this.userName = res.name;
        this.userLastName = res.lastName;
      },
      error : (err : any) => {
        console.log("Error getting comment user info for post "+this.comment.idParent)
      }
    })
  }

}
