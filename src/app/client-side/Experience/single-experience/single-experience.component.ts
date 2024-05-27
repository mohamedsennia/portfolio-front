import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/Experience/Experience.model';

@Component({
  selector: 'app-single-experience',
  templateUrl: './single-experience.component.html',
  styleUrls: ['./single-experience.component.css']
})
export class SingleExperienceComponent implements OnInit{
@Input("experience") experience:Experience;
constructor(){
  
}
  ngOnInit(): void {
    
  }
getDate(){
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  if(this.experience._endDate!=null){
    return month[this.experience._startDate.getMonth()] +" "+ this.experience._startDate.getFullYear()+
  ' -   '+
  month[this.experience._endDate.getMonth()] +" "+ this.experience._endDate.getFullYear()
  }else{
    return month[this.experience._startDate.getMonth()] +" "+ this.experience._startDate.getFullYear()+
  ' -   '+
  "present"
  }
   
}

}
