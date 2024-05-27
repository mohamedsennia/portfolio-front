import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Technologie } from 'src/app/Technologie/Technologie.model';
import { TechnologieService } from 'src/app/Technologie/Technologie.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit ,OnDestroy{
  private subscreptions:Subscription[]
  technologies:Technologie[]
  ngOnInit(): void {
    if(this.technologieService.getTechnologies() instanceof Observable){
      this.subscreptions.push (  (this.technologieService.getTechnologies() as Observable<any []>).subscribe(param=>{
        this.technologies=param
       
     
  
      }))
    }else{
      this.technologies=this.technologieService.getTechnologies() as Technologie[]
    }
  }
  constructor(private technologieService:TechnologieService){
    this.subscreptions=[];
    this.technologies=[]
  }
  ngOnDestroy(): void {
    for(let subscreption of this.subscreptions){
      subscreption.unsubscribe()
    }
  }
}
