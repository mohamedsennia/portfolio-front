import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Education } from 'src/app/Education/Education.model';
import { EducationService } from 'src/app/Education/Education.service';


@Component({
  selector: 'app-educations-list',
  templateUrl: './educations-list.component.html',
  styleUrls: ['./educations-list.component.css']
})
export class EducationsListComponent implements OnInit{
  educations:Education[]
  subscreptions: Subscription[];
  ngOnInit(): void {
    if(this.educationSerivce.getEducations() instanceof Observable){
      this.subscreptions.push((this.educationSerivce.getEducations() as Observable<Education[]>).subscribe(param=>{
        this.educations=param
      }) )
    }else{
      this.educations=this.educationSerivce.getEducations() as Education[]
    }
  }
  constructor (private educationSerivce:EducationService){
    this.educations=[]
  this.subscreptions=[]
  }

}
