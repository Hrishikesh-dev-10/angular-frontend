import { Injectable } from '@angular/core';
import { Cookie } from './cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  basePath = 'http://localhost:5000/api';
  constructor(private cookies:Cookie,private router:Router) { }
  async getNotesCall(id:any)
  {
    
    try {
      const response = await fetch(`${this.basePath}/notes/getByUsers/${id}`,{
        headers:{
          'x-access-token':await this.cookies.getCookies('access_token')
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async getSharedNotes(id:any)
  {
    
    try {
      const response = await fetch(`${this.basePath}/notes/sharedNotes/${id}`,{
        headers:{
          'x-access-token':await this.cookies.getCookies('access_token')
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async shareNoteCall(noteID:any,userID:any)
  {

    let login_id = await this.cookies.getCookies('login_creds');
    try {
      if(login_id.length!=0)
      {
        const reqeustData:any={
          sharedBy:parseInt(login_id),
          sharedTo:userID,
          noteID:noteID
        }
        const response = await fetch(`${this.basePath}/notes/sharedCreate`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
            'x-access-token':await this.cookies.getCookies('access_token')
          },
         
          body:JSON.stringify(reqeustData)
        })
        const data = (await response.json())
        return data
      }
      else
      {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.log(error)
    }
  }



  async addNotesCall(requestData:any){
    try {
      const response = await fetch(`${this.basePath}/notes/create`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          'x-access-token':await this.cookies.getCookies('access_token')
        },
       
        body:JSON.stringify(requestData)
      })
      const data = (await response.json())
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteNoteCall(id:any)
  {
    try {
        const response = await fetch(`${this.basePath}/notes/deleteNote/${id}`,{
          method:"DELETE",
          headers:{
            'x-access-token':await this.cookies.getCookies('access_token')
          },
        })
        const data = await response.json();
        return data;
    } catch (error) {
      console.log(error)
    }
  }

  async getNoteByIDCall(id:any){
    try {
      const response = await fetch(`${this.basePath}/notes/getByID/${id}`,{
        headers:{
          'x-access-token':await this.cookies.getCookies('access_token')
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async updateNoteCall(requestData:any){
    try {
      
      const response = await fetch(`${this.basePath}/notes/updateNote`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",
          'x-access-token':await this.cookies.getCookies('access_token')
        },
       
        body:JSON.stringify(requestData)
      })
      
      const data = (await response.json())
      return (data)
    } catch (error) {
      console.log(error)
    }
  }

}
