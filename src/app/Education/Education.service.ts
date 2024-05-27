import { Injectable } from "@angular/core";
import { Education } from "./Education.model";
import { Observable, Subscription, map } from "rxjs";
import { ConnectionService } from "../Connection.service";

@Injectable({providedIn:"root"})
export class EducationService{
private educations:Education[]
getEducationsSub:Subscription
constructor(private connectionService:ConnectionService){
    this.educations=null
    this.getEducationsSub=connectionService.getEducations().subscribe(param=>{
        this.educations=param
    })
}
getEducations():Education[]|Observable<Education[]>{
    if(this.educations==null){
        this.getEducationsSub.unsubscribe()
        return this.connectionService.getEducations().pipe(map(param=>{
            this.educations=param;
            
            return param
        }))
    }else{
        return this.educations
    }
}
getEducationById(id:number){
    return this.connectionService.getEducationById(id).pipe(map(param=>{
        param._startDate=new Date(param._startDate)
        param._endDate=new Date(param._endDate)
       
        return param
    }));
}
addEducation(education:Education){
   
    return this.connectionService.addEducation(education).pipe(map(param=>{
        education.id=param
        this.educations.push(education)
    }))
  
}
editEducation(education:Education){
   return this.connectionService.addEducation(education).pipe(map(param=>{
        this.educations[this.educations.findIndex(E=>E.id==education.id)]=education
        return param
    }))
}
deleteEducation(education:Education){
    return this.connectionService.deleteEducation(education).pipe(map(param=>{
        this.educations.splice(this.educations.indexOf(education),1)
        return this.educations
    }))
}
}