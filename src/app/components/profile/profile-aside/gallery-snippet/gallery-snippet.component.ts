import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery-service.service';

@Component({
  selector: 'app-gallery-snippet',
  templateUrl: './gallery-snippet.component.html',
  styleUrls: ['./gallery-snippet.component.css']
})
export class GallerySnippetComponent implements OnInit {

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
