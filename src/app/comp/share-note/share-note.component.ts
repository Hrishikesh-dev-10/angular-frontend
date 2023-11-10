import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-share-note',
  templateUrl: './share-note.component.html',
  styleUrls: ['./share-note.component.scss']
})
export class ShareNoteComponent implements OnInit {

  @Input('note_share')public note_share:any;

  allUsers:any =[] 
  filteredUserArray:any =[] 

  constructor(private userServices:AuthService,private noteService:NotesService) { }

  ngOnInit() {
   this.getAllUsers()
  }

  async getAllUsers()
  {
    try {
      const data = await this.userServices.getAllSUersCall()
     
      if(data.status_code==200)
      {
        this.allUsers= data.data
      }
      else{
        alert('No Users');
      }
    } catch (error) {
      alert('Error');
    }
  }

  async shareNote(noteId:any,userID:any)
  {
    try {
      const data = await this.noteService.shareNoteCall(noteId,userID);
      console.log(data)
      if(data.status_code===200)
      {
        alert('Note Shared');
      }
      else if(data.status_code===201)
      {
        alert('Note Already Shared');
      }
      else
      {
        alert('Error! Please try again.')
      }
    } catch (error) {
      alert('Error! Please try again.')
    }
  }

  async filterUsers(event:any)
  {
    try {
      
      if(event.target.value==='')
      {
        this.filteredUserArray = [];
      }
      else{
        let users = this.allUsers.filter((item:any)=>item.username.toLowerCase().includes((event.target.value).toString().toLowerCase()));
        this.filteredUserArray = users;
      }
          
        

    } catch (error) {
      
    }
  }

}
