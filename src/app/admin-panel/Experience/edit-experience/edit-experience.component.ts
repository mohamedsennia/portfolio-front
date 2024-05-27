import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from 'src/app/Experience/Experience.model';
import { ExperienceService } from 'src/app/Experience/Experience.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit{
public editExperienceForm:FormGroup;
stillGoing:boolean
experience:Experience
constructor(private experienceService:ExperienceService,private router:Router,private activatedRoute:ActivatedRoute){
  this.stillGoing=false;
  this.experience=new Experience(null,null,null,null,null,null,[])
}
  ngOnInit(): void {
    this.editExperienceForm=new FormGroup({
      Role:new FormControl(null, [Validators.required]),
      Company:new FormControl(null,[Validators.required]),
      startDate:new FormControl(null,[Validators.required]),
      endDate:new FormControl(null),  
      Descripition:new FormControl(null)
    })
    this.activatedRoute.params.subscribe(param=>{
      let id=+param["id"];
      this.experienceService.getExperienceById(id).subscribe(param=>{
        this.experience=param
        let startDate=param._startDate.toISOString().split('T')[0]
     
        this.editExperienceForm.patchValue({
          Role:this.experience._role,
        Company:this.experience._company,
        startDate:startDate,
        
        Descripition:this.experience._description
        })
   
        if(param._endDate!=null){
          let endDate=param._endDate.toISOString().split('T')[0]
          this.editExperienceForm.patchValue({
            endDate:endDate
          })
        }else{
          this.toggleStillGoing()
        }
      })
     
    })
  }
  editExperience(){

    if(this.editExperienceForm.valid){
      this.experienceService.editExperience(new Experience(this.experience._experience_id,this.editExperienceForm.value["Role"],this.editExperienceForm.value["Company"],new Date(this.editExperienceForm.value["startDate"]),new Date(this.editExperienceForm.value["endDate"]),this.editExperienceForm.value["Descripition"],this.experience._projects)).subscribe(
        param=>{
          window.alert("Experience edited successfully")
          this.router.navigate(["/admin-panel/experiences/1"])
        }
      )

    }
  }
  toggleStillGoing(){
    this.stillGoing=!this.stillGoing
    if(this.stillGoing){
      this.editExperienceForm.patchValue({endDate:null})
      this.editExperienceForm.get("endDate")?.disable()
    }else{
      this.editExperienceForm.get("endDate")?.enable()
    }
  }
}
