import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username:string =''
  email:string =''
  phone:string =''
  password:string =''
  confirmPassword:string =''

  constructor(private registerService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  async registerUserEvent()
  {
    try {
      if(this.confirmPassword!==this.password)
      {
        alert('Passwords not matching')
      }
      else if(this.username!==''&&this.password!==''&&this.email!==''&&this.phone!==''&&this.confirmPassword!=='')
      {
        const data = await this.registerService.registerUser({
          'username':this.username,
          'email':this.email,
          'phone':this.phone,
          'password':this.password
        })
        console.log(data)
        if(data.status_code===200)
        {
          this.router.navigate(['/'])
        }
        else
        {
          alert('Error! Please try again.')
        }
       
      }
      else
      {
        alert('Please fill the entire form.')
      }
     
    } catch (error) {
      alert('Registration failed');
    }
  }

}
