import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.css']
})
export class AuthWrapperComponent implements OnInit {

  constructor() { }

  modalText = "Account created successfully";

  ngOnInit(): void {
  }

  showModel(b : boolean){
  }

}
