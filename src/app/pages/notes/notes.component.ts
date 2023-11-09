import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'src/app/services/cookie.service';
import { NotesService } from 'src/app/services/notes.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  cardTitle:string = 'abc';

  constructor(private cookieService:Cookie,private router:Router,private notesService:NotesService) { }

  ngOnInit() {
    this.checkAccess()
  }

  async checkAccess()
  {
    let cookie = await this.cookieService.getCookies('access_token')
    let login_id =  await this.cookieService.getCookies('login_creds')
    if(!cookie)
    {
      this.router.navigate([''])
    }
    else
    {
      const data = await this.notesService.getNotesCall(login_id);
      console.log(data)
    }

  }
}
