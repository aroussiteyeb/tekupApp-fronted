import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent implements OnInit {

  @Input() iconProp !: IconDefinition;

  @Input() placeholderProp !: string ;

  @Input() idProp !: string;

  @Input() valueProp !: string;

  @Input() typeProp !: string;

  @Output() valuetoReturn = new EventEmitter<string>();

  @ViewChild('inpWrap') div ?: ElementRef;

  constructor() {
  }
    
  ngOnInit(): void {
  }

  valueEmit(valueChange : string){
    this.valuetoReturn.emit(valueChange);
  }

  onFocus(){
    this.div?.nativeElement.classList.add('input-focus')
  }

  onBlur(){
    this.div?.nativeElement.classList.remove('input-focus')
  }


}
