import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FieldSerivce } from 'src/app/Field/Field.Service';
import { Field } from 'src/app/Field/Field.model';
import { Project } from 'src/app/Project/Project.model';
import { ProjectService } from 'src/app/Project/Project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit,OnDestroy{
  
  projects:Project[]
  subscreptions:Subscription[]
  fields:Field[]
  selected:number[]
  constructor(private projectService:ProjectService,private fieldService:FieldSerivce){
  
    this.projects=[];
  this.subscreptions=[]
  this.selected=[]
  }
  ngOnDestroy(): void {
    for(let subscreption of this.subscreptions){
      subscreption.unsubscribe()
    }
  }
  ngOnInit(): void {
    if(this.fieldService.getFields()instanceof Observable){
      this.subscreptions.push ( ( this.fieldService.getFields() as Observable<Field[]>).subscribe(param=>{
        
        this.fields=param
       
  
      }))
    }else{this.fields=this.fieldService.getFields() as Field[]}
      this.subscreptions.push( (this.projectService.getPersonalProjects() as Observable<Project[]>).subscribe(param=>{
         this.projects=param;
       }))
    
  }
  getBackgroundImage(project:Project){
    return "background-image: url('"+project._images[0]+"');"
  }
  select(i:number){
    if(i==-1){
      this.selected=[]
      this.subscreptions.push( (this.projectService.getPersonalProjects() as Observable<Project[]>).subscribe(param=>{
        this.projects=param;
      }))
    }else{
      let index=this.selected.indexOf(i)
      if(index!=-1){
     this.selected.splice(index,1)
      let fieldsString="";
      for(let f of this.selected){
        fieldsString=fieldsString+ this.fields[f]._fieldName+";";
      }
      fieldsString = fieldsString.slice(0, -1);
      this.subscreptions.push( (this.projectService.filterProjects({
        "fields":fieldsString,
        "type":"personal",
        "techs":""
      }) as Observable<Project[]>).subscribe(param=>{
        this.projects=param;
      }))
      
      }else{
        this.selected.push(i)
        let fieldsString="";
        for(let f of this.selected){
          fieldsString=fieldsString+ this.fields[f]._fieldName+";";
        }
        fieldsString = fieldsString.slice(0, -1);
        this.subscreptions.push( (this.projectService.filterProjects({
          "fields":fieldsString,
          "type":"personal",
          "techs":""
        }) as Observable<Project[]>).subscribe(param=>{
          this.projects=param;
        }))
      }
     
    }
  }
  checkSelected(i:number){
    if(i==-1){
      if(this.selected.length==0 || this.selected.length==this.fields.length){
        return "field-button selected"
      }
      return "field-button"
    }else{
      return this.selected.indexOf(i)!=-1 ?"field-button selected" :"field-button"
    }
  }
}
