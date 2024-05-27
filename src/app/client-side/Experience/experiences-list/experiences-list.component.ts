import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Experience } from 'src/app/Experience/Experience.model';
import { ExperienceService } from 'src/app/Experience/Experience.service';

@Component({
  selector: 'app-experiences-list',
  templateUrl: './experiences-list.component.html',
  styleUrls: ['./experiences-list.component.css']
})
export class ExperiencesListComponent implements OnInit{
experiences:Experience[]
  subscreptions: Subscription[];
constructor (private experienceService:ExperienceService){
  this.experiences=[]
this.subscreptions=[]
}
  ngOnInit(): void {
    if(this.experienceService.getExperiences() instanceof Observable){
      this.subscreptions.push((this.experienceService.getExperiences() as Observable<Experience[]>).subscribe(param=>{
        this.experiences=param
      }))
    }else{
      this.experiences=this.experienceService.getExperiences() as Experience[]
    }
  }
}
