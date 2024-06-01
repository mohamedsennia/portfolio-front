import { Injectable } from "@angular/core";
import { Project } from "./Project.model";
import { Observable, Subscription, filter, map } from "rxjs";
import { ConnectionService } from "../Connection.service";
import { Field } from "../Field/Field.model";
import { Technologie } from "../Technologie/Technologie.model";
@Injectable({providedIn:"root"})
export class ProjectService{
private projects:Project[]
getProjectsSubscription:Subscription
constructor(private connectionService:ConnectionService){
this.projects=null;

this.getProjectsSubscription=this.connectionService.getProjects().subscribe(param=>{
    this.projects=param
    
})
}
getProjects():Observable<Project[]>|Project[]{
    if(this.projects!=null){
        return this.projects;
    }else{
        this.getProjectsSubscription.unsubscribe();
        return this.connectionService.getProjects().pipe(map(param=>{
            this.projects=param;
            return param;
        }))
    }
}
getPersonalProjects():Observable<Project[]>{
  
        
        return this.connectionService.getPersonalProjects().pipe(map(param=>{
            this.projects=param;
            return param;
        }))
    
}
filterProjects(filters):Observable<Project[]>{
  
        
    return this.connectionService.filterProjects(filters).pipe(map(param=>{
        
        return param;
    }))

}
getProjectById(id:number){
    return this.connectionService.getProjectById(id).pipe(map((param:any)=>{
      let  fields=[]
      let techs=[]
    
        for(let field of param.fields){
        fields.push(new Field(field.field_id,field.fieldName))   
        }
        for(let tech of param.technologies){
            techs.push(new Technologie(tech.id_technologie,tech.name,tech.icon))
        }
       
        param.technologies=techs
        param.fields=fields
        return param
    }));
   
}
addProject(project:Project){
    return this.connectionService.addProject(project).pipe(map(param=>{
       
        project._id=param
        this.projects.push(project)
    }))
}
editProject(project:Project){
    return this.connectionService.addProject(project).pipe(map(param=>{
        this.projects[this.projects.findIndex(P=>P._id==project._id)]=project
        return param
    }))
}
deleteProject(project:Project){
    return this.connectionService.deleteProject(project).pipe(map(param=>{
       
        this.projects.splice(this.projects.indexOf(project))
        return this.projects
    }))
}
}