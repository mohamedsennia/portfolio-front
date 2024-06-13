import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Project } from 'src/app/Project/Project.model';
import { ProjectService } from 'src/app/Project/Project.service';

@Component({
  selector: 'app-show-projects',
  templateUrl: './show-projects.component.html',
  styleUrls: ['./show-projects.component.css']
})
export class ShowProjectsComponent implements OnInit, OnDestroy {
projects:Project[]
subscreptions:Subscription[]
constructor(private projectService:ProjectService,private router:Router){
this.projects=[];
  this.subscreptions=[]
}
ngOnInit(): void {
  if(this.projectService.getProjects() instanceof Observable){
   this.subscreptions.push( (this.projectService.getProjects() as Observable<Project[]>).subscribe(param=>{
      this.projects=param;
    }))
  }else{
    this.projects=(this.projectService.getProjects() as Project[])
  }
}
  ngOnDestroy(): void {
  for(let subscreption of this.subscreptions){
    subscreption.unsubscribe();
  }
  }
  edit(id:number){
    this.router.navigate(["admin-panel/projects/editProject/"+id])
    }
    delete(project: Project) {
      if(this.projectService.isAdmin()){
      if(window.confirm("Are you sure you want to delete this field")){
        
      this.subscreptions.push (this.projectService.deleteProject(project).subscribe((param)=>{
        
        this.projects=param
      }))}}else{
        window.alert("You must be an admin to do this action")
      }
      }
}
