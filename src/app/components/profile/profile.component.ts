import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  currentUserId : any;
  currentUserPosts !: any[]
  currentUser : any;

  constructor(
      private postService : PostService,
      private userService : UserService,
      private route : ActivatedRoute
    ) { }

  ngOnInit(): void {

    //getting user Id from route params
    this.getCurrentUserId()

    //getting user with user Id passed in params
    this.getCurrentUser()

    //getting user posts by user Id
    this.getCurrentUserPosts()
  
  }

  getCurrentUserId(){
    this.route.paramMap.subscribe({
      next : (res : any) => {
        this.currentUserId = res.params.id;
      },
      error : (err : any) => {
        console.log("Error getting user Id from params")
      }
    })
  }

  getCurrentUser(){
    this.userService.getUser(this.currentUserId).subscribe({
      next : (res : any) =>{
        this.currentUser = res
      },
      error : (err : any) => {
        console.log("error getting user")
      }
    })
  }

  getCurrentUserPosts(){
    this.postService.getPostsByUser(this.currentUserId).subscribe({
      next : (res : any) => {
        this.currentUserPosts = res
      },
      error : (err : any) => {
        console.log("Error getting posts by user id")
      }
    })
  }

}
