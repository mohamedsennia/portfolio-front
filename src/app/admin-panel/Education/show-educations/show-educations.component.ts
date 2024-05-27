import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Education } from 'src/app/Education/Education.model';
import { EducationService } from 'src/app/Education/Education.service';

@Component({
  selector: 'app-show-educations',
  templateUrl: './show-educations.component.html',
  styleUrls: ['./show-educations.component.css']
})
export class ShowEducationsComponent implements OnInit,OnDestroy{

  educations:Education[]
 private connectionSubsecribtions:Subscription[]
constructor( private educationService:EducationService,private router:Router){
this.educations=[]
this.connectionSubsecribtions=[]
}

ngOnInit(): void {

    if(this.educationService.getEducations() instanceof Observable){
      this.connectionSubsecribtions.push ( ( this.educationService.getEducations() as Observable<any[]>).subscribe(param=>{
        this.educations=param
       
  
      }))
    }else{this.educations=this.educationService.getEducations() as Education[]}
}
edit(id:number){
this.router.navigate(["admin-panel/educations/editEducation/"+id])
}
delete(education: Education) {
  if(window.confirm("Are you sure you want to delete this education")){
  this.connectionSubsecribtions.push (this.educationService.deleteEducation(education).subscribe((param)=>{
  this.educations=param
  }))}
  }
ngOnDestroy(): void {
 for (let subscription of this.connectionSubsecribtions){subscription.unsubscribe()}
}
}
