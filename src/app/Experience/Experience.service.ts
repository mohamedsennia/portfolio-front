import { Injectable } from "@angular/core";
import { Experience } from "./Experience.model";
import { Observable, Subscription, map } from "rxjs";
import { ConnectionService } from "../Connection.service";
import { Project } from "../Project/Project.model";

@Injectable({providedIn:"root"})
export class ExperienceService{
private experiences:Experience[]
private getExperiencesSubscription:Subscription
constructor(private connectionService:ConnectionService){
   this.experiences=null
   this.getExperiencesSubscription=connectionService.getExperiences().subscribe(param=>{
    this.experiences=param
   })
}
getExperiences():Experience[]|Observable<Experience[]>{
if(this.experiences!=null){
return this.experiences.slice()
}else{
    this.getExperiencesSubscription.unsubscribe()
    return this.connectionService.getExperiences().pipe(map(param=>{
       for(let experience of param){
        if(experience._startDate!=null){
           experience._startDate= new Date(experience._startDate)
        }
        if(experience._endDate!=null){
            experience._endDate= new Date(experience._endDate)
        }
      
       }
       
        this.experiences=param;
        return param.slice()
    }))
}
}
getExperienceById(id:number){
    return this.connectionService.getExperienceById(id).pipe(map(param=>{
        
        param._startDate=new Date(param._startDate)
        if(param._endDate!=null){
            param._endDate=new Date(param._endDate)
        }
      
        return param
    }))
}
addExperience(experience:Experience){
   return this.connectionService.addExperience(experience).pipe(map(param=>{
        experience._experience_id=param
       
        this.experiences.push(experience)
    }))
}
editExperience(experience:Experience){

    return this.connectionService.addExperience(experience).pipe(map(param=>{
        this.experiences[this.experiences.findIndex(E=>E._experience_id==experience._experience_id)]=experience
        return param
    }))
}
deleteExperience(experience:Experience){
    return this.connectionService.deleteExperience(experience).pipe(map(param=>{
        
        this.experiences.slice(this.experiences.indexOf(experience),1)
        return this.experiences
    }))
}
}