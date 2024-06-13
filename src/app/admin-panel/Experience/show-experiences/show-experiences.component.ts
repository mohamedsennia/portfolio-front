import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Experience } from 'src/app/Experience/Experience.model';
import { ExperienceService } from 'src/app/Experience/Experience.service';

@Component({
  selector: 'app-show-experiences',
  templateUrl: './show-experiences.component.html',
  styleUrls: ['./show-experiences.component.css']
})
export class ShowExperiencesComponent implements OnInit, OnDestroy {
experiences:Experience[]
private subscreptions:Subscription[]
constructor(private experienceService:ExperienceService,private router:Router){
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
  getEndDate(experience:Experience){
     if(experience._endDate!=null){
      return experience._endDate.toISOString().split('T')[0]
     }else{
      return "ON going"
     }
  }
  edit(id:number){
    this.router.navigate(["admin-panel/experiences/editExperience/"+id])
  }
  delete(experience:Experience){
    if(this.experienceService.isAdmin()){
   if(window.confirm("Are you sure you want to delete this experience")){
    this.experienceService.deleteExperience(experience).subscribe(param=>{
      console.log(this.experiences)
      this.experiences.slice(this.experiences.indexOf(experience),1)
      window.location.reload()
    })
   }}else{
    window.alert("You must be an admin to do this action")
  }
  }
  ngOnDestroy(): void {
    for(let subscreption of this.subscreptions){
      subscreption.unsubscribe()
    }
  }
}
