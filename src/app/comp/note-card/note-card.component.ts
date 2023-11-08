import { Component, OnInit,ViewChild,ElementRef,Renderer2,Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title:string;
  @Input() body:string;

  
 @ViewChild('truncator',{static:true})truncator: ElementRef<HTMLElement>;
 @ViewChild('cardText',{static:true})cardText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    let style = window.getComputedStyle(this.cardText.nativeElement,null);
    let viewHeight = parseInt(style.getPropertyValue("height"),10);
    if(this.cardText.nativeElement.scrollHeight>viewHeight)
    {
      this.renderer.setStyle(this.truncator.nativeElement, 'display','block')
    }
    else
    {
      this.renderer.setStyle(this.truncator.nativeElement,'display','none')
    }
  }

}
