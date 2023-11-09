import { Component, OnInit } from '@angular/core';
import { AuthCheckService } from 'src/app/services/auth-check.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isLoggedIn:boolean= false;
  constructor(private authCheck:AuthCheckService) { }

  ngOnInit() {
    
  }

}
