import { Injectable } from '@angular/core';
import { Cookie } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  basePath = 'http://localhost:5000/api';
  constructor(private cookies:Cookie) { }
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
}
