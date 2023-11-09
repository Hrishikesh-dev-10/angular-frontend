
import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = 'http://localhost:5000/api';
  
  constructor(private http:HttpClient) {
   
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
}
