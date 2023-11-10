import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCheckService } from 'src/app/services/auth-check.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

 
  constructor(private authCheck:AuthCheckService,private router:Router) { }

  ngOnInit() {

  }
  async checkAuth()
  {
    try {
     
    } catch (error) {
      
    }
  }

  async logout()
  {
    
    document.cookie = 'access_token='+';max-age='+(0) +'; Path=/';
    document.cookie = 'login_creds='+';max-age='+(0) +'; Path=/';
    this.router.navigate(['/'])
  }
}
