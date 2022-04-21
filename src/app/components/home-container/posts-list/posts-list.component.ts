import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  @Input() refresh = "";
  @Input() posts : any;

  @Output() resetRefresh = new EventEmitter()

  currentUser : any;

  constructor(
    private postService : PostService,
    private sharingService : SharingService  ) {
     }

  ngOnInit(): void {
    this.currentUser = this.sharingService.getUserSettings();
  }

  resRef(){
    this.resetRefresh.emit(true);
  }


}
