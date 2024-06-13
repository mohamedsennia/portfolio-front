import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from 'src/app/Education/Education.model';
import { EducationService } from 'src/app/Education/Education.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit{
  public addEducationForm:FormGroup;
  stillGoing:boolean;
  constructor(private educationService:EducationService,private router:Router){
  this.stillGoing=false;
  }
    ngOnInit(): void {
      this.addEducationForm=new FormGroup({
        DegreeName:new FormControl(null,[Validators.required]),
        SchoolName:new FormControl(null,[Validators.required]),
        startDate:new FormControl(null,[Validators.required]),
        endDate:new FormControl(null),  
        Descripition:new FormControl(null)

      },)
    }
    addEducation(){
      if(this.educationService.isAdmin()){
      if(this.addEducationForm.valid){
        let endDate=null;
        if(this.addEducationForm.value["endDate"]!=null){
          endDate=this.addEducationForm.value["endDate"];
        }
        this.educationService.addEducation(new Education(null,this.addEducationForm.value["DegreeName"],this.addEducationForm.value["SchoolName"],new Date(this.addEducationForm.value["startDate"]),endDate,this.addEducationForm.value["Descripition"])).subscribe((param)=>{
          window.alert("Project Added")
          this.router.navigate(["/admin-panel/educations/1"])
        })

      }}else{
        window.alert("You must be an admin to do this action")
      }
    }
    toggleStillGoing(){
      this.stillGoing=!this.stillGoing
      if(this.stillGoing){
        this.addEducationForm.patchValue({endDate:null})
        this.addEducationForm.get("endDate")?.disable()
      }else{
        this.addEducationForm.get("endDate")?.enable()
      }
    }
}
