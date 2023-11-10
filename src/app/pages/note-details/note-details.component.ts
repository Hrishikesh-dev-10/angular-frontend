import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthCheckService } from 'src/app/services/auth-check.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  noteID:number =null;
  noteTitle:string='';
  noteBody:string='';

  constructor(private route:ActivatedRoute,private checkAuth:AuthCheckService,private notesService:NotesService) { }

  ngOnInit() {
    this.route.params.subscribe(async(params:Params)=>{
      if(params.id)
      {
        let auth = await this.checkAuth.checkAuth()
        if(auth)
        {
          await this.getNoteDetails(params.id)
        }
        
      }
      else
      {

      }
    })
  }

  async getNoteDetails(id:any)
  {
    try {
      const data = await this.notesService.getNoteByIDCall(id);
      if(data.status_code===200)
      {
        this.noteTitle=data.data.title;
        this.noteBody=data.data.body
      }
      else
      {
        alert('Error')
      }
      
    } catch (error) {
      alert('Error! Please try again.')
    }
  }

} 
