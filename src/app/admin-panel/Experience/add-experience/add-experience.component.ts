import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from 'src/app/Experience/Experience.model';
import { ExperienceService } from 'src/app/Experience/Experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
   addExperienceForm:FormGroup
  stillGoing:boolean;
  constructor(private experienceService:ExperienceService,private route:Router){
    this.stillGoing=false
  }
  ngOnInit(): void {
    this.addExperienceForm=new FormGroup({
      Role:new FormControl(null, [Validators.required]),
      Company:new FormControl(null,[Validators.required]),
      startDate:new FormControl(null,[Validators.required]),
      endDate:new FormControl(null),  
      Descripition:new FormControl(null)
    })
  }
  addEducation(){
    if(this.experienceService.isAdmin()){
    if(this.addExperienceForm.valid){
      let endDate=null;
      if(this.addExperienceForm.value["endDate"]!=null){
        endDate=new Date( this.addExperienceForm.value["endDate"])
      }
      this.experienceService.addExperience(new Experience(null,this.addExperienceForm.value["Role"],this.addExperienceForm.value["Company"],new Date(this.addExperienceForm.value["startDate"]),
     endDate,this.addExperienceForm.value["Descripition"],[]
      )).subscribe(param=>{
        this.route.navigate(['/admin-panel/experiences/1'])
      })

    }}else{
      window.alert("You must be an admin to do this action")
    }
  }
  toggleStillGoing(){
    this.stillGoing=!this.stillGoing
    if(this.stillGoing){
      this.addExperienceForm.patchValue({endDate:null})
      this.addExperienceForm.get("endDate")?.disable()
    }else{
      this.addExperienceForm.get("endDate")?.enable()
    }
  }
}
