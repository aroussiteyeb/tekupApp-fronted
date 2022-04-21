import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faUser, faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { LikeService } from 'src/app/services/like.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Like } from 'src/models/like';
import { UtilsService } from 'src/app/services/utils.service';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { CommentService } from 'src/app/services/comment.service';
import { throwError, catchError } from 'rxjs';

@Component({
  selector: 'app-post-elem',
  templateUrl: './post-elem.component.html',
  styleUrls: ['./post-elem.component.css']
})
export class PostElemComponent implements OnInit {

  likeIcon = faThumbsUp;
  commentIcon = faComment;
  shareIcon = faShare;
  personIcon = faUser;

  @Input() idPost !: any;
  @Input() postUserPfp ?: string;
  @Input() postUserName ? : string;
  @Input() postUserId !: any;

  currentUser : any;
  user ? : any;
  post ? : any;
  media ? : any;
  pfpPath : any = null;

  likes : Like[] = [];
  comments:  Comment[] = [];

  likesCount !: number;
  commentsCount !: number;
  userLikeFound : boolean = false;
  userCommentFound : boolean = false;
  commentPressed : boolean = false;
  dismissible:boolean=false;
  update: boolean=false;
  editText: any;
  
  constructor(
    private postService : PostService,
    private userService : UserService,
    private likeService : LikeService,
    private sharingService : SharingService,
    private utilService : UtilsService,
    private profilePicService : ProfilePicService,
    private commentService : CommentService) { }

  ngOnInit() : void  {

   
    //get Current user ID
    this.currentUser = this.sharingService.getUserSettings()

    //get post Creator info
    this.getPostUser()
    
    //get post info
    this.getPost();
     //post test

     this.editText=this.post.text
    //get post likes
    this.getLikes()

    //get post user profile pic
    this.getPostUserProfilePic()

    //get post comments
    this.getComments()
  }

  getPost(){
 
    //getting post
    this.postService.getPost(this.idPost).subscribe({
      next : (res) => {

        //loading post body from res
        this.post = res
        console.log(this.post)
        //loading media if it exists
        this.media = res?.media? this.utilService.base64ToPic(res?.media) : undefined;
      },
      error : (err) => {
        console.log("Error getting Post !"+this.idPost)
        console.log(err)
      }
    })
  }

  //getting user data with userId passed in properties
  getPostUser(){
    this.userService.getUser(this.postUserId).subscribe({
      next : (res) => {
        this.user = res
      },
      error : (err) => {
        console.log("Error getting user for post : "+this.idPost)
        console.log(throwError(err.message))
      }
    })
  }

  getPostUserProfilePic(){
    this.profilePicService.getProfilePic(this.postUserId).subscribe({
      next : (res : any) =>{
        this.pfpPath = this.utilService.base64ToPic(res?.pfp)
      },
      error : (err : any) => {
        console.log("error getting profile pic in post elem")
      }
    })
  }

  getLikes(){
    this.likes = []
    this.likeService.getLikesByParentId(this.idPost).subscribe({
      next : (res) => {
        let likes = res
        Object.values(likes).forEach((like : any) => this.likes.push(new Like(like._id,like.idUser,like.idParent)))
        this.likesCount = this.likes.length

        //check if user Like is found
        this.userLikeFound = this.findCurrentUserLike(this.likes);
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  getComments(){

    this.commentService.getCommentsByParentId(this.idPost).subscribe({
      next : (res : any) => {
        this.comments = res
        this.commentsCount = res.length

        
        //check if user Like is found
        this.userCommentFound = this.findCurrentUserComment(res);
        console.log(this.userCommentFound)
        
      },
      error : () => {
        console.log("error getting comment list for post "+this.idPost)
      }
    })
  }

  findCurrentUserLike(likes : Like[]){
    let like = likes.find((like : Like) => like.getIdUser() == this.currentUser._id);
    if(like){
      return true;
    }else{
      return false;
    }
  }

  findCurrentUserComment(comments : any[]){
    let comment = comments.find(comment => comment.idUser == this.currentUser._id);
    if(comment){
      return true;
    }else{
      return false;
    }
  }

  addOrDeleteLike(event : any){
    console.log("like pressed")
    this.likeService.createOrDeleteLike(this.currentUser._id, this.idPost).subscribe({
      next : (res) => {
        this.getLikes()
      },
      error : (err) => {
        console.log("error with adding like")
      }
    })
  }
  
  focusComment(event : any){
    this.commentPressed = event
  }

  addShare(event : any){
    // this.likeService.createLike(this.currentUser._id, this.idPost);  
    console.log("share pressed")
  }
  showFormUpdate()
  {
    this.update=true

  }
  updatePost(idPost:any)
  {

    console.log(idPost)

    let post={  
      
      text:this.editText   
      }
    this.postService.updatePost(idPost,post).subscribe(()=>{
      this.update=false
      this.getPost
      console.log("post updated")


    })
  }

   deletePost(idPost:any)
  {

    this.postService.deletePost(idPost).subscribe(async ()=>{
      console.log(idPost)
      //get post info
   await this.getPost();
   this.post=this.post
    this.dismissible=true;

    })

  }



}
