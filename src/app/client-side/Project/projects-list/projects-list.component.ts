import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  constructor(private projectService:ProjectService){
    this.projects=[];
  this.subscreptions=[]
  }
  ngOnDestroy(): void {
    for(let subscreption of this.subscreptions){
      subscreption.unsubscribe()
    }
  }
  ngOnInit(): void {
    
      this.subscreptions.push( (this.projectService.getPersonalProjects() as Observable<Project[]>).subscribe(param=>{
         this.projects=param;
       }))
    
  }
  getBackgroundImage(project:Project){
    return "background-image: url('"+project._images[0]+"');"
  }
}
