import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery-service.service';

@Component({
  selector: 'app-friends-snippet',
  templateUrl: './friends-snippet.component.html',
  styleUrls: ['./friends-snippet.component.css']
})
export class FriendsSnippetComponent implements OnInit {

  files : any;
  basePath = '../../../../assets/images/gallery-training-images/';
  
  constructor(private galleryService : GalleryService) { }

  ngOnInit(): void {
    this.readGallery();
  }

  readGallery(){
    this.galleryService.getGellery().subscribe((data) => {
     this.files = data;
    })    
  }

}
