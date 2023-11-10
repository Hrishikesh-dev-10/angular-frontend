import { Component, OnInit,ViewChild,ElementRef,Renderer2,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCheckService } from 'src/app/services/auth-check.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

 @Input('notes') public notes:any;

 @Input('isShared') public isShared:any;

 shareEnable:boolean = false;
 note_share:number = null;

 @ViewChild('truncator',{static:true})truncator: ElementRef<HTMLElement>;
 @ViewChild('cardText',{static:true})cardText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2,private router:Router,private checkAuth:AuthCheckService,private noteService : NotesService) { }

  ngOnInit() {
   
    this.checkAccess()
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

  async checkAccess()
  {
    await this.checkAuth.checkAuth();
  }

  async deleteNote(id:any)
  {
    try {
      const data = await this.noteService.deleteNoteCall(id);
      if(data.status_code===200){
        alert('Note Deleted')
        window.location.reload()
      }
      else
      {
        alert('Please try again.')
      }
    } catch (error) {
      console.log(error)
      alert('Error! Please try again.')
    }
  }
  async setShare(id:any)
  {
    this.shareEnable=!this.shareEnable
    this.note_share= id;
  }
}
