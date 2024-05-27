import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConnectionService } from 'src/app/Connection.service';
import { Experience } from 'src/app/Experience/Experience.model';
import { ExperienceService } from 'src/app/Experience/Experience.service';
import { FieldSerivce } from 'src/app/Field/Field.Service';
import { Field } from 'src/app/Field/Field.model';
import { Project } from 'src/app/Project/Project.model';
import { ProjectService } from 'src/app/Project/Project.service';
import { ProjectType } from 'src/app/Project/ProjectType';
import { Technologie } from 'src/app/Technologie/Technologie.model';
import { TechnologieService } from 'src/app/Technologie/Technologie.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit,OnDestroy {
  project:Project
  addProjectForm:FormGroup

 ExperienceProject:boolean
 AllFields:Field[]
 
 AllTechnologies:Technologie[]
 
 AllExperiences:Experience[]
subscreptions:Subscription[]

 constructor(private connectionService:ConnectionService,private projectService:ProjectService, private fieldService:FieldSerivce,private technologieService:TechnologieService,private experienceService:ExperienceService,private router:Router){

   this.AllFields=[];
   this.AllTechnologies=[];
   this.AllExperiences=[];
   this.subscreptions=[]
  this.project=new Project(null,"","",[],"","",ProjectType.personal,[],[],null)
   this.ExperienceProject=false;
 }

 ngOnInit(): void {
   this.addProjectForm=new FormGroup({
    ProjectName:new FormControl(null, [Validators.required]),
    codeURL:new FormControl(null,[Validators.required]),
    demoURL:new FormControl(null,[Validators.required]),
    Fields:new FormControl(null),
    Technologies:new FormControl(null),
    Experience:new FormControl(null),
     Descripition:new FormControl(null)
   })
   if(this.fieldService.getFields()instanceof Observable){
    this.subscreptions.push ( ( this.fieldService.getFields() as Observable<any[]>).subscribe(param=>{
      this.AllFields=param
    }))
  }else{this.AllFields=this.fieldService.getFields() as Field[]}
  if(this.experienceService.getExperiences() instanceof Observable){
    this.subscreptions.push((this.experienceService.getExperiences() as Observable<Experience[]>).subscribe(param=>{
      this.AllExperiences=param
    }))
  }else{
    this.AllExperiences=this.experienceService.getExperiences() as Experience[]
  }
  if(this.technologieService.getTechnologies() instanceof Observable){
    this.subscreptions.push (  (this.technologieService.getTechnologies() as Observable<any []>).subscribe(param=>{
      this.AllTechnologies=param
    }))
  }else{
    this.AllTechnologies=this.technologieService.getTechnologies() as Technologie[]
  }
 }
 addProject(){

   if(this.addProjectForm.valid){
    this.project._name=this.addProjectForm.value['ProjectName']
    this.project._description=this.addProjectForm.value['Descripition']
    this.project._codeURL=this.addProjectForm.value['codeURL']
    this.project._demoURL=this.addProjectForm.value['demoURL']
    this.project._idExperience=this.addProjectForm.value['Experience']._experience_id
   this.projectService.addProject(this.project).subscribe((param)=>{
  window.alert("Project Added")
  this.router.navigate(["/admin-panel/projects/1"])
 })
   }
 }
 addTech(){
 
  this.project._technologies.push(this.addProjectForm.value['Technologies'])
  this.AllTechnologies.splice(this.AllTechnologies.indexOf(this.addProjectForm.value['Technologies']),1)
  this.addProjectForm.patchValue({
    "Technologies":null
  })
 }
 addField(){
  if(this.addProjectForm.value['Fields']!=null){
    this.project._fields.push(this.addProjectForm.value['Fields'])
    this.AllFields.splice(this.AllFields.indexOf(this.addProjectForm.value['Fields']),1)
    this.addProjectForm.patchValue({
      "Fields":null
    })
  }

 
 }
 toggleExperienceProject(){
  this.addProjectForm.setControl("Experience",new FormControl(null,!this.ExperienceProject?[Validators.required]:[]))
  this.project._type=!this.ExperienceProject?ProjectType.work:ProjectType.personal
  this.addProjectForm.setControl("codeURL",new FormControl(this.addProjectForm.value["codeURL"],this.ExperienceProject?[Validators.required]:[]))
  this.addProjectForm.setControl("demoURL",new FormControl(this.addProjectForm.value["demoURL"],this.ExperienceProject?[Validators.required]:[]))

  this.ExperienceProject=!this.ExperienceProject;
 }
 ngOnDestroy(): void {
  for (let subscription of this.subscreptions){subscription.unsubscribe()}
}
onFileSelected(event){
let file:File=event.target.files[0];
const formData = new FormData();
formData.append('file', file);



this.connectionService.uploadFile(formData).subscribe(param=>{
let fileName=file.name;
  this.project._images.push("http://localhost:8090/uploads/"+fileName)
 
})
}
removeImage(image){
  this.project._images.splice(this.project._images.indexOf(image),1)
}

removeField(field:Field){
this.project._fields.splice(this.project._fields.indexOf(field),1)
this.AllFields.push(field)
}
removeTech(tech:Technologie){
  this.project._technologies.splice(this.project._technologies.indexOf(tech),1)
  this.AllTechnologies.push(tech)
}
}
