import { Injectable } from '@angular/core';
import { Cookie } from './cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor(private cookies:Cookie,private router:Router) { }
  async checkAuth()
  {
    let access_token =await this.cookies.getCookies('access_token');
    let role_id =await this.cookies.getCookies('login_creds');
    if(!access_token || !role_id)
    {
      this.router.navigate(['']);
      return false
    }
    else
      return true;
  }
}
