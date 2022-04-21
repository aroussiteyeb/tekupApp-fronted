import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faCheck, faImage, faStar, faTimes, faMicrophone, faPaperclip, faTrash, faEdit, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { EventService } from 'src/app/services/event.service';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Eventt } from 'src/models/eventt';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { threadId } from 'worker_threads';




@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  interestedIcon = faStar;
  notInterestedIcon = faTimes;
  goingIcon = faCheck;
  imageIcon = faImage;
  vocalIcon = faMicrophone;
  deleteIcon = faTrash;
  editIcon = faEdit;
  documentAttachementIcon = faPaperclip;

  selectedParticipation = "";
  imageUploadIcon = faImage
  idUser: any;
  postText = ""
  postImage: any;
  imageChosen: boolean = false;
  submitted: boolean = false;

  commentText = ""
  pfpPath: any;

  commentInputPlaceholder = "Make a comment ..."

  eventForm = new FormGroup({
    text: new FormControl(''),
    title: new FormControl(''),
  }); @ViewChildren("reactions") private reactions?: QueryList<ElementRef>;
  events: any;
  subEvent: Eventt[] = [];
  imageEvent: any;
  userIntercation: string="";
  goingLength: any;
  InterestedLength: any;
  NotInterestedLength: any;

  constructor(private fb: FormBuilder,
    private profilePicService: ProfilePicService,
    private utilService: UtilsService,
    private eventService: EventService,
    private userService: UserService,
    private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getEvents()
    this.idUser = localStorage.getItem("currentUser");
    this.getCurrentUserProfilePic()
  }


  addEvent() {

    this.submitted = true;

    let fd = new FormData();
    fd.append("text", this.eventForm.controls['text'].value)
    fd.append("title", this.eventForm.controls['title'].value)
    fd.append("idUser", this.idUser);

    fd.append("creationDate", new Date().toString());

    if (this.postImage) {
      fd.append("media", this.postImage, this.postImage.name);
    }

    console.log(fd)

    this.eventService.createEvent(fd).subscribe(
      {
        next: (res) => {
          console.log('Post successfully created!')
          //this.ngZone.run(() => this.router.navigateByUrl('/home'))

          //notifying parent that post is sumbitted
          //this.postSumbitted.emit(this.submitted)

          //resetting Form fields

          this.submitted = false;
          this.imageChosen = false;
          this.postImage = undefined;
          this.postText = "";
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  postComment() {

    /* let fg = new FormGroup({
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
    }) */
  }

  fileChosen(event: any) {
    if (event.target.value) {
      this.postImage = <File>event.target.files[0];
      this.imageChosen = true
    }
  }

  getCurrentUserProfilePic() {
    this.profilePicService.getProfilePic(this.idUser).subscribe({
      next: (res: any) => {
        this.pfpPath = this.utilService.base64ToPic(res?.pfp)
      },
      error: (err: any) => {
        console.log("error getting profile pic in post-form")
      }
    })
  }

  mediaUploadClick(mediaInput: HTMLElement) {
    mediaInput.click()
  }

  resetLists() {
    this.reactions?.forEach(elem => elem.nativeElement.classList.remove('selected'));
  }


  selectedReact(reactionsIndex: number, idEvent: any,event:any) {
    this.resetLists();

    this.reactions?.get(reactionsIndex)?.nativeElement.classList.toggle('selected');
    console.log('event', this.reactions?.get(reactionsIndex)?.nativeElement)

    this.selectedParticipation = reactionsIndex == 0 ? "notInterested" : reactionsIndex == 1 ? "interested" : "going";
    console.log("selectedParticipation", this.selectedParticipation)
      
    let userid = {
      userId: this.idUser
    }

    

        if(this.selectedParticipation=='going')
        {
          let userEvents=this.events.find((item: { _id: any; })=>item._id==idEvent)
          let userIntercation=userEvents.going.find((item: { userId: any; })=>item.userId==this.idUser)
          console.log('eveny',userIntercation)
          if(userIntercation)
          {

            this.eventService.deleteInetrraction(idEvent,this.selectedParticipation,userid).subscribe(()=>{
              console.log('events reaction deselected')
              //this.goingLength=this.goingLength-1
             // this.resetLists()

            })

          }
          else{
            this.eventService.deleteInetrraction(idEvent,'interested',userid).subscribe(()=>{
              console.log('events reaction deselected')
            })
            this.eventService.deleteInetrraction(idEvent,'notInterested',userid).subscribe(()=>{
              console.log('events reaction deselected')
            })
            this.eventService.createInterraction(idEvent, this.selectedParticipation, userid).subscribe(() => {
              console.log("intercation added",this.subEvent)
            // this.goingLength=this.goingLength+1

            })
  
          }
         

        }

        if(this.selectedParticipation=='interested')
        {
          let userEvents=this.events.find((item: { _id: any; })=>item._id==idEvent)
          let userIntercation=userEvents.interested.find((item: { userId: any; })=>item.userId==this.idUser)
          if(userIntercation)
          {

            this.eventService.deleteInetrraction(idEvent,this.selectedParticipation,userid).subscribe(()=>{
              console.log('events reaction deselected')
              //this.InterestedLength=this.InterestedLength-1

            })

          }
          else{
            this.eventService.deleteInetrraction(idEvent,'going',userid).subscribe(()=>{
              console.log('events reaction deselected')
            })
            this.eventService.deleteInetrraction(idEvent,'notInterested',userid).subscribe(()=>{
              console.log('events reaction deselected')
            })
            this.eventService.createInterraction(idEvent, this.selectedParticipation, userid).subscribe(() => {
             // this.InterestedLength=this.InterestedLength+1

            })
  
          }
         

        }

        if(this.selectedParticipation=='notInterested')
        {
          let userEvents=this.events.find((item: { _id: any; })=>item._id==idEvent)
          let userIntercation=userEvents.notinterested.find((item: { userId: any; })=>item.userId==this.idUser)
          if(userIntercation)
          {

            this.eventService.deleteInetrraction(idEvent,this.selectedParticipation,userid).subscribe(()=>{
              console.log('events reaction deselected')
              //this.NotInterestedLength=this.NotInterestedLength-1

            })

          }
          else{
            this.eventService.deleteInetrraction(idEvent,'interested',userid).subscribe(()=>{
              console.log('events reaction deselected')
            })
            this.eventService.deleteInetrraction(idEvent,'going',userid).subscribe(()=>{
              console.log('events reaction deselected')
            })
            this.eventService.createInterraction(idEvent, this.selectedParticipation, userid).subscribe(() => {
              //this.NotInterestedLength=this.NotInterestedLength+1

            })
  
          }
         

        }

  }

 
  getEvents() {
  this.subEvent=[]
    this.eventService.getEvents().subscribe((events) => {
console.log(events)
this.events = events;

      if(this.events.length!=0)
      {
        this.ngxLoader.startLoader('loader-01'); // start non-master loader

      for (let index = 0; index < this.events.length; index++) {
        const element = this.events[index];


        this.profilePicService.getProfilePic(element.idUser).subscribe((userPic: any) => {
          let userPicData = this.utilService.base64ToPic(userPic?.pfp)

          this.userService.getUser(element.idUser).subscribe((userInfo) => {

            let userName = userInfo.name + '' + userInfo.lastName
            if (element.media) {

              this.imageEvent = this.utilService.base64ToPic(element.media)
              //console.log('element.media', this.imageEvent)


            }
            else {
              this.imageEvent = ""
            }

            let CurrentUsergoing=element.going.find((item: { userId: any; })=>item.userId==this.idUser)
            let CurrentUserInterested=element.interested.find((item: { userId: any; })=>item.userId==this.idUser)
            let CurrentUserNoInterested=element.notinterested.find((item: { userId: any; })=>item.userId==this.idUser)
            console.log("check interrqction current user ", CurrentUsergoing,CurrentUserInterested,CurrentUserNoInterested,this.idUser)

            if(CurrentUserInterested)
            {
             this.userIntercation="interested"
        
            }

            if(CurrentUserNoInterested)
            {
             this.userIntercation="notInterested"
        
            }

            if(CurrentUsergoing)
            {
             this.userIntercation="going"
        
            }
        
           /*  if(CurrentUserNoInterested)
            {
              this.userIntercation="notInterested"
        
            }
            if(CurrentUsergoing)
            {
              this.userIntercation="going"
        
            } */

             this.goingLength=element.going.length
             this.InterestedLength=element.interested.length
            this.NotInterestedLength=element.notinterested.length

            this.subEvent.push(new Eventt(element._id, element.idUser,
              element.creationDate, element.title,
              element.text, this.imageEvent, userName,
              userPicData, this.InterestedLength,
              this.NotInterestedLength, this.goingLength,this.userIntercation))
              
            console.log("events", this.subEvent)
            this.ngxLoader.stopLoader('loader-01');


          })

        })

      }


      }
      




    })



  }


}
