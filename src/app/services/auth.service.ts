
import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Cookie } from './cookie.service';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = 'http://localhost:5000/api';
  
  constructor(private http:HttpClient,private cookies:Cookie) {
   
   }
  async authService(reqeustData:any){
      try {
      const response =await fetch(`${this.basePath}/users/login`,
      {
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        
        body:JSON.stringify(reqeustData)
      })
       const data = await response.json();

        return(data)
      } catch (error) {
        console.log(error)
      }
  }

  async registerUser(requestData:any)
  {
    try {
      const response =await fetch(`${this.basePath}/users/create`,
      {
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        
        body:JSON.stringify(requestData)
      })
       const data = await response.json();

        return(data)
    } catch (error) {
      console.log(error)
    }
  }

  async getAllSUersCall()
  {
    let login_id =await this.cookies.getCookies('login_creds');
    try {
      const response =await fetch(`${this.basePath}/users/getAll/${login_id}`,
      {
        headers:{
          "Content-Type": "application/json",
        },
      })
       const data = await response.json();

        return(data)
      } catch (error) {
        console.log(error)
      }
  }
}
