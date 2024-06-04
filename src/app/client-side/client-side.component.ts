import { Component } from '@angular/core';
import { applicationService } from '../app.service';

@Component({
  selector: 'app-client-side',
  templateUrl: './client-side.component.html',
  styleUrls: ['./client-side.component.css']
})
export class ClientSideComponent {
constructor(public appService:applicationService){

}
}
