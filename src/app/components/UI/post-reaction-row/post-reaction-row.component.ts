import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faComment, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-post-reaction-row',
  templateUrl: './post-reaction-row.component.html',
  styleUrls: ['./post-reaction-row.component.css']
})
export class PostReactionRowComponent implements OnInit {


  likeIcon = faThumbsUp;
  commentIcon = faComment;
  shareIcon = faShare;
  
  private likeFoundObservable = new BehaviorSubject<boolean>(false);
  private commentFoundObservable = new BehaviorSubject<boolean>(false);
  
  @Input() 
    set commentFound(commentFound : boolean){
      this.commentFoundObservable.next(commentFound)
    } 

    get commentFound(){
      return this.commentFoundObservable.getValue()
    }

  @Input() 
    set likeFound(LikeFound : boolean){
      this.likeFoundObservable.next(LikeFound)
    } 

    get likeFound(){
      return this.likeFoundObservable.getValue()
    }

  @Output() likePressed = new EventEmitter<boolean>();
  @Output() commentPressed = new EventEmitter<boolean>()
  @Output() sharePressed = new EventEmitter<boolean>()

  @ViewChild('likeElem') likeElem !: ElementRef
  @ViewChild('commentElem') commentElem !: ElementRef
  @ViewChild('shareElem') shareElem !: ElementRef
  
  constructor() {
   }

  ngOnInit(): void {
    this.likeIsFound()
    this.commentIsFound()
  }

  likeIsFound(){
    this.likeFoundObservable.subscribe({
      next : (lf : boolean) => {
        if(lf == true){
          this.likeElem.nativeElement.classList.add('reaction-pressed')
        }
      }
    })
  }

  commentIsFound(){
    this.commentFoundObservable.subscribe({
      next : (cf : boolean) => {
        if(cf == true){
          this.commentElem.nativeElement.classList.add('reaction-pressed')
        }
      }
    })
  }

  likePress(){
    this.likePressed.emit(true)
    this.togglePressedStyle(this.likeElem);
  }

  commentPress(){
    this.commentPressed.emit(true)
  }
  
  sharePress(){
    this.sharePressed.emit(true)
  }

  togglePressedStyle(elem : ElementRef){
    elem.nativeElement.classList.toggle('reaction-pressed')
  }

}
