import { Component, ElementRef, OnInit, ViewChild,NgModule, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  @ViewChild('submitButton',{static:false}) submitButton:ElementRef<HTMLElement>;


  email:string='';
  password:string='';
  

  constructor(private authServeice:AuthService,private router:Router) { }


 
  ngOnInit() {
   
  }
  async clickEvent(){
    if(this.email!==''&&this.password!=='')
    {
     let data=await this.authServeice.authService({
        'email':this.email,
        'password':this.password
      })
      if(data.status_code===200)
      { 
        
        window.document.cookie = 'access_token='+data.token.access_token+';max-age=86400;path=/';
        window.document.cookie = 'login_creds='+data.data.id+';max-age=86400;path=/';
        this.router.navigate(['/notes'])
      }
      else
      {
        alert('Login Failed.')
        this.router.navigate(['/'])
      }
    }
    else
    {
      alert('Error');
    }
  }
}
