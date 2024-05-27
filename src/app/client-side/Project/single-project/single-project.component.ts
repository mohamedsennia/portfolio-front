import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/Connection.service';
import { Project } from 'src/app/Project/Project.model';
import { ProjectService } from 'src/app/Project/Project.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css'],
  animations:[
    trigger('carouselAnimation', [
     state("current",style({
      transform: 'translateX(0%)',
      
     
     })),
     state("prev",style({
      transform: 'translateX(-100%)',
      
     })),
     state("next",style({
      transform: 'translateX(100%)',
    
     })),
     transition("current<=>*",animate(1000))
     
   
     

    ])
  ]
})
export class SingleProjectComponent implements OnInit{
  project:Project
  index:number;
  init:boolean;
  constructor(private activatedRoute:ActivatedRoute,private projectSevice:ProjectService){
    this.index=0
    this.init=true
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.projectSevice.getProjectById(params['id']).subscribe((param)=>{
        this.project=param
       
      })
    })
  }
  getImage(){
    return this.project._images[this.index]
  }
  nextImage(){
    this.index++
    this.init=false
  }
  prevImage(){
    this.index--
    this.init=false
  }
  getState(i:number){
    if(this.index==i){
      
      return "current";
    }else{
      if(this.index>i){
        return "next"
      }
    }
    return "prev"
  }
  getActive(i:number){
    if(i==this.index){
      return "indecator active"
    }
    return "indecator"
  }
}
