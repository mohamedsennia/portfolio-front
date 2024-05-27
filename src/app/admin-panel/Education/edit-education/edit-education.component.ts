import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/Education/Education.model';
import { EducationService } from 'src/app/Education/Education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent {
  public editEducationForm:FormGroup;
  stillGoing:boolean;
  education:Education
  constructor(private educationService:EducationService,private router:Router,private activatedRoute:ActivatedRoute){
  this.stillGoing=false;
  this.education=new Education(null,null,null,null,null,null)
  }
    ngOnInit(): void {
      this.editEducationForm=new FormGroup({
        DegreeName:new FormControl(null,[Validators.required]),
        SchoolName:new FormControl(null,[Validators.required]),
        startDate:new FormControl(null,[Validators.required]),
        endDate:new FormControl(null),  
        Descripition:new FormControl(null)

      })
      this.activatedRoute.params.subscribe(param=>{
        let id=+param["id"];
        this.educationService.getEducationById(id).subscribe(param=>{
          this.education=param
          let startDate=param._startDate.toISOString().split('T')[0]
      
          let endDate=param._endDate.toISOString().split('T')[0]
          this.editEducationForm.patchValue({
            DegreeName:param._degree,
            SchoolName:param._school,
            startDate:startDate,
            endDate:endDate,
            Descripition:param._description
          })
        })
      })
    }
    editEducation(){

      if(this.editEducationForm.valid){
        this.educationService.editEducation(new Education(this.education.id,this.editEducationForm.value["DegreeName"],this.editEducationForm.value["SchoolName"],new Date(this.editEducationForm.value["startDate"]),new Date(this.editEducationForm.value["endDate"]),this.editEducationForm.value["Descripition"])).subscribe(
          param=>{
            window.alert("Education edited successfully")
            this.router.navigate(["/admin-panel/educations/1"])
          }
        )

      }
    }
    toggleStillGoing(){
      this.stillGoing=!this.stillGoing
      if(this.stillGoing){
        this.editEducationForm.patchValue({endDate:null})
        this.editEducationForm.get("endDate")?.disable()
      }else{
        this.editEducationForm.get("endDate")?.enable()
      }
    }
}
