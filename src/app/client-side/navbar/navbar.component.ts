import { Component } from '@angular/core';
import { applicationService } from 'src/app/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private appService:applicationService){

  }
  toggelHidden(){
    this.appService.toggleHidden();
  }
  
}
