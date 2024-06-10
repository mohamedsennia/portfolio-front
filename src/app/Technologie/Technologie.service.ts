import { Injectable } from "@angular/core";
import { ConnectionService } from "../Connection.service";
import { Technologie } from "./Technologie.model";
import { Observable, Subscription, map } from "rxjs";

@Injectable({providedIn:"root"})
export class TechnologieService{
    private technologies:Technologie[]|null
  private  getTechs:Subscription
constructor(private connectionService:ConnectionService){
this.technologies=null
    this.getTechs=this.connectionService.getTechnologies().subscribe((param)=>{
    this.technologies=param;
})

}

getTechnologies():Technologie[] | Observable<any []>{
if(this.technologies!=null){
    return this.technologies.slice()
}

this.getTechs.unsubscribe()
return this.connectionService.getTechnologies().pipe(map((param)=>
{
  
    this.technologies=param
    return param.slice()
}))
}
deleteTechnologie(technologie:Technologie){
  return  this.connectionService.deleteTechnologie(technologie).pipe(map((param)=>{
    if(this.technologies==null){
        this.technologies=[]
    }
        this.technologies.splice(this.technologies.indexOf(technologie),1)
        return this.technologies
      }))

}
getTechnologieById(id:number){console.log(this.technologies)
 return this.connectionService.getTechnologieById(id);   
}
addTechnologie(technologie:Technologie){
    
return this.connectionService.addTechnologie(technologie).pipe(map((param)=>{
    technologie.id=param
    if(this.technologies==null){
        this.technologies=[]
    }
    this.technologies.push(technologie)
   
})).subscribe();
        
}
editTechnologie(technologie:Technologie){
    
    return this.connectionService.addTechnologie(technologie).pipe(map((param)=>{
        if(this.technologies==null){
            this.technologies=[]
        }
        this.technologies[this.technologies.findIndex(tech=> tech.id==technologie.id)]=technologie
       
       
    })).subscribe();
            
    }
}