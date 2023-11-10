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
  isShared:boolean = false;

  constructor(private cookieService:Cookie,private router:Router,private notesService:NotesService,private checkAuth:AuthCheckService) { }

  ngOnInit() {
    
    this.getNotesData()
  }


  async logout()
  {
    
    document.cookie = 'access_token='+';max-age='+(0) +'; Path=/';
    document.cookie = 'login_creds='+';max-age='+(0) +'; Path=/';
    this.router.navigate(['/'])
  }

  async getNotesData()
  {
    try {
      if(await this.checkAuth.checkAuth())
      {
        let login_id =  await this.cookieService.getCookies('login_creds')
     
        let data = await this.notesService.getNotesCall(login_id)
        
        if(data.status_code===201)
        { 
          if(this.notesData.length>0)
          {
            this.notesData=[];
            this.isNotes = true;
            this.isShared=false
          }
          else
          {
            this.isShared=false
            this.isNotes = true;
          }
          
        }
        else
        {
          this.isShared=false
          this.isNotes = false;
          this.notesData=(data.data);
          
        }
        
        }
    } catch (error) {
     
    }
   
    }

    async sharedNotes()
    {
      if(await this.checkAuth.checkAuth())
      {
        let login_id =  await this.cookieService.getCookies('login_creds')
     
        let data = await this.notesService.getSharedNotes(login_id)
        
        if(data.status_code===201)
        {
          this.isNotes = true;
        }
        else
        {
          this.isNotes = false;
          this.isShared=true
         
          this.notesData=(data.data);
          
        }
        
        }
    }

   async filterNotes(event:any)
   {
    
    try {
          if(event.target.value==='')
          {
            await this.getNotesData();
          }
         
         else
         {
          let notes =this.notesData.filter((item:any)=>(item.title.toLowerCase().includes((event.target.value).toString().toLowerCase())));
          this.notesData = notes
         }
    } catch (error) {
      console.log()
    }
   }

}
