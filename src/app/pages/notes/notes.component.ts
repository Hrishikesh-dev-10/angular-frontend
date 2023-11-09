import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCheckService } from 'src/app/services/auth-check.service';
import { Cookie } from 'src/app/services/cookie.service';
import { NotesService } from 'src/app/services/notes.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  cardTitle:string = 'abc';
  notesData:Array<object>[]=[];
  isNotes:boolean=false;

  constructor(private cookieService:Cookie,private router:Router,private notesService:NotesService,private checkAuth:AuthCheckService) { }

  ngOnInit() {
    
    this.getNotesData()
  }

  async getNotesData()
  {
    if(await this.checkAuth.checkAuth())
    {
      let login_id =  await this.cookieService.getCookies('login_creds')
   
      let data = await this.notesService.getNotesCall(login_id)
      
      if(data.status_code===201)
      {
        this.isNotes = true;
      }
      else
      {
        this.isNotes = false;
        this.notesData=(data.data);
        
      }
      
      }
    }
   async filterNotes(event:any)
   {
    try {
        if(event.target.value!=='')
        {
          let notes = this.notesData.filter((item:any)=>item.title.toLoweCase().includes((event.target.value).toLoweCase()));
          this.notesData= notes;
        }
        else
        {
          this.getNotesData();
        }
        
    } catch (error) {
      console.log()
    }
   }

}
