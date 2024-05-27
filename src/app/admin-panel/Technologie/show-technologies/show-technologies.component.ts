import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConnectionService } from 'src/app/Connection.service';
import { FieldSerivce } from 'src/app/Field/Field.Service';

import { Technologie } from 'src/app/Technologie/Technologie.model';
import { TechnologieService } from 'src/app/Technologie/Technologie.service';

@Component({
  selector: 'app-show-technologies',
  templateUrl: './show-technologies.component.html',
  styleUrls: ['./show-technologies.component.css']
})
export class ShowTechnologiesComponent implements OnInit,OnDestroy{

  technologies:Technologie[]
 private connectionSubsecribtions:Subscription[]
constructor(private router:Router,private technologieService:TechnologieService){
this.technologies=[]
this.connectionSubsecribtions=[]
}

ngOnInit(): void {
 

    if(this.technologieService.getTechnologies() instanceof Observable){
      this.connectionSubsecribtions.push (  (this.technologieService.getTechnologies() as Observable<any []>).subscribe(param=>{
        this.technologies=param
       
     
  
      }))
    }else{
      this.technologies=this.technologieService.getTechnologies() as Technologie[]
    }
}
edit(id:number){
this.router.navigate(["admin-panel/technologies/editTechnologie/"+id])
}
delete(technologie: Technologie) {
  if(window.confirm("Are you sure you want to delete this field")){
  this.connectionSubsecribtions.push (this.technologieService.deleteTechnologie(technologie).subscribe((param)=>{
    
    this.technologies=param
  }))}
  }
ngOnDestroy(): void {
 for (let subscription of this.connectionSubsecribtions){subscription.unsubscribe()}
}

}
