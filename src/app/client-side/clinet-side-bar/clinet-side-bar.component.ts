import { Component } from '@angular/core';
import { applicationService } from 'src/app/app.service';

@Component({
  selector: 'app-clinet-side-bar',
  templateUrl: './clinet-side-bar.component.html',
  styleUrls: ['./clinet-side-bar.component.css']
})
export class ClinetSideBarComponent {
  constructor(private appService:applicationService){

  }
  toggleHidden(){
  this.appService.toggleHidden()
}
isHidden(){
  return this.appService.isHiden()
}
close(){
  if(!this.isHidden()){
    this.toggleHidden();
  }
}
}
