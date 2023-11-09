import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthCheckService } from 'src/app/services/auth-check.service';
import { Cookie } from 'src/app/services/cookie.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  title:string ='';
  body:string='';
  isEdit:boolean= false;
  editID :number = null

  constructor(private cookies:Cookie,private router:Router,private checkAuth:AuthCheckService,private noteService:NotesService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(async(params:Params)=>{
      if(params.id)
      {
       try {
        const data = await this.noteService.getNoteByIDCall(params.id);
        
        if(data.status_code!==200)
        {
          alert('No Data Found.')
        }
        else
        {
          this.editID=params.id
          this.isEdit=true
          this.title = data.data.title;
          this.body = data.data.body
        }
       } catch (error) {
        
       }
      }
    })

    this.checkAuth.checkAuth()

  }


  async editNote()
  {
    try {
      
      if(this.title===''&&this.body===''&&this.editID===null)
      {
        alert('Please add note details.')
      }
      else{
       
        const data:any = await this.noteService.updateNoteCall({
          id:this.editID,
          title:this.title,
          body:this.body
        })
        if(data.status_code===200)
        {
          alert('Note Updated');
          this.router.navigate(['/notes']);
        }
        else
        {
          alert('Error! Please try again.')
        }
      }
    } catch (error) {
      
      alert('Error! Please try again.')
    }
  }

  async addNote()
  {
    try {
      const user_id = await this.cookies.getCookies('login_creds');
      if(this.title===''&&this.body===''&&user_id===undefined)
      {
        alert('Please add note details.')
      }
      else{
       
        const data = await this.noteService.addNotesCall({
          user_id,
          title:this.title,
          body:this.body
        })
        if(data.status_code===200)
        {
          alert('Note Added');
          this.router.navigate(['/notes']);
        }
        else
        {
          alert('Error! Please try again.')
        }
      }
    } catch (error) {
      console.log(error)
      alert('Error! Please try again.')
    }
  }
}
