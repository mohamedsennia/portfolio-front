import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit,OnDestroy{
  private subscreptions:Subscription[]
   project:Project
   fields:Field[]
    techs:Technologie[]
    experiences:Experience[]
 ExperienceProject:boolean
  editProjectForm:FormGroup
    constructor(private activatedRoute:ActivatedRoute,private projectService:ProjectService,private fieldService:FieldSerivce,private technologieService:TechnologieService,private experienceService:ExperienceService,private router:Router,private connectionService:ConnectionService){
      this.project=null
      this.subscreptions=[];
      this.fields=[]
      this.techs=[]
      this.experiences=[]
      this.ExperienceProject=false
    }
  ngOnInit(): void {
    if(this.experienceService.getExperiences() instanceof Observable){
      this.subscreptions.push((this.experienceService.getExperiences() as Observable<Experience[]>).subscribe(param=>{
        this.experiences=param
      }))
    }else{
      this.experiences=this.experienceService.getExperiences() as Experience[]
    }
    if(this.fieldService.getFields() instanceof Observable){
      this.subscreptions.push((this.fieldService.getFields() as Observable<Field[]>).subscribe((fields)=>{
        this.fields=fields.slice()
        if(this.project!=null){
        
          for(let f of this.fields){
            for(let projectField of this.project._fields){
              if(f.equals(projectField)){
                this.fields.splice(this.fields.indexOf(f))
              }
            }
          }
         }
      }))
    }else{
      this.fields=(this.fieldService.getFields() as Field[]).slice()
      if(this.project!=null){
       
        for(let f of this.fields){
          for(let projectField of this.project._fields){
            if(f.equals(projectField)){
              this.fields.splice(this.fields.indexOf(f))
            }
          }
        }
        for(let t of this.techs){
          for(let projectTech of this.project._technologies){
            if(t.equals(projectTech)){
              this.techs.splice(this.techs.indexOf(t))
            }
          }
        }
       }
    }
    if(this.technologieService.getTechnologies() instanceof Observable){
      this.subscreptions.push((this.technologieService.getTechnologies() as Observable<Technologie[]>).subscribe((techs)=>{
        this.techs=techs.slice()

      }))
    }
    else{
      this.techs=(this.technologieService.getTechnologies() as Technologie[]).slice()
    }
    this.editProjectForm=new FormGroup({
      ProjectName:new FormControl(null, [Validators.required]),
      codeURL:new FormControl(null,[Validators.required]),
      demoURL:new FormControl(null,[Validators.required]),
      Fields:new FormControl(null),
      Technologies:new FormControl(null),
      Experience:new FormControl(null),
       Descripition:new FormControl(null)
     })
    this.subscreptions.push(this.activatedRoute.params.subscribe((params)=>{
  
     this.subscreptions.push(this.projectService.getProjectById(params["id"]).subscribe((project)=>{
      this.project=project
      if(this.project._idExperience!=0){
        this.toggleExperienceProject()
        for(let exp of this.experiences){
          if(exp._experience_id==this.project._idExperience){
            this.editProjectForm.patchValue({
              "Experience":exp
            })
          }
        }
      }
      this.editProjectForm.patchValue({
        "ProjectName":project._name,
        "codeURL":project._codeURL,
        "demoURL":project._demoURL,
        "Descripition":project._description
      })
      for(let f of this.fields){
        
        for(let projectField of this.project._fields){
          
          if(f.equals(projectField)){
            
            this.fields.splice(this.fields.indexOf(f))
          }
        }
      }
      for(let t of this.techs){
        for(let projectTech of this.project._technologies){
          if(t.equals(projectTech)){
            this.techs.splice(this.techs.indexOf(t))
          }
        }
      }
     }))
    }))
    
  }







  getFields():Field[]{
    if (this.project!=null){
      return this.project._fields.slice()
    }
    return []
  }
  getTechs():Technologie[]{
   
    if (this.project!=null){
      return this.project._technologies.slice()
    }
    return []
  }
  getImages():string[]{
if (this.project!=null){
  return this.project._images.slice()
}
return []
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
  toggleExperienceProject(){

    this.editProjectForm.setControl("Experience",new FormControl(null,!this.ExperienceProject?[Validators.required]:[]))
    this.project._type=!this.ExperienceProject?ProjectType.work:ProjectType.personal
    this.editProjectForm.setControl("codeURL",new FormControl(this.editProjectForm.value["codeURL"],this.ExperienceProject?[Validators.required]:[]))
    this.editProjectForm.setControl("demoURL",new FormControl(this.editProjectForm.value["demoURL"],this.ExperienceProject?[Validators.required]:[]))
  
    this.ExperienceProject=!this.ExperienceProject;
  }
  addTech(){
    this.project._technologies.push(this.editProjectForm.value['Technologies'])
    this.techs.splice(this.techs.indexOf(this.editProjectForm.value['Technologies']),1)
    this.editProjectForm.patchValue({
      "Technologies":null
    })
  }
  addField(){
    if(this.editProjectForm.value['Fields']!=null){
      this.project._fields.push(this.editProjectForm.value['Fields'])
      this.fields.splice(this.fields.indexOf(this.editProjectForm.value['Fields']),1)
      this.editProjectForm.patchValue({
        "Fields":null
      })
    }
  }
  removeImage(image){
    this.project._images.splice(this.project._images.indexOf(image),1)
  }
  
  removeField(field:Field){
  this.project._fields.splice(this.project._fields.indexOf(field),1)
  this.fields.push(field)
  }
  removeTech(tech:Technologie){
    this.project._technologies.splice(this.project._technologies.indexOf(tech),1)
    this.techs.push(tech)
  }
   editProject(){
    if(this.editProjectForm.valid){
      this.project._name=this.editProjectForm.value['ProjectName']
    this.project._description=this.editProjectForm.value['Descripition']
    this.project._codeURL=this.editProjectForm.value['codeURL']
    this.project._demoURL=this.editProjectForm.value['demoURL']
    this.projectService.editProject(this.project).subscribe((param)=>{
      window.alert("Project edited sucessfully")
      this.router.navigate(["/admin-panel/projects/1"])
    })
    }
console.log(this.project)
   }
  ngOnDestroy(): void {
    for(let subscreption of this.subscreptions){

        subscreption.unsubscribe()
    }
  }
}
