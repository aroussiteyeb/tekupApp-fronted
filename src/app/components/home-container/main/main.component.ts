import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  refresh = ""
  posts = []
  idUser : any

  constructor(
    private postService : PostService,
    private sharingService : SharingService) { }

  ngOnInit(): void {
    this.idUser = this.sharingService.getUserSettings()._id;
    this.getPosts()
  }

  refreshPostList(event : any){
    this.refresh = "ref"
  }

  resRef(event : any){
    this.refresh = ""
  }

  getPosts(){
    this.postService.getPosts().subscribe({
      next : (res : any) => {
        this.posts = res
      },
      error : (err : any) => {
        console.log("error getting posts");
        console.log(err)
      }
    })
  }
}