import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/Education/Education.model';

@Component({
  selector: 'app-single-education',
  templateUrl: './single-education.component.html',
  styleUrls: ['./single-education.component.css']
})
export class SingleEducationComponent implements OnInit{
@Input("education") education:Education

@Input("index") index:number
constructor(){}
  ngOnInit(): void {
    
  }
  getDate(){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
    if(this.education._endDate!=null){
      return month[this.education._startDate.getMonth()] +" "+ this.education._startDate.getFullYear()+
    ' -   '+
    month[this.education._endDate.getMonth()] +" "+ this.education._endDate.getFullYear()
    }else{
      return month[this.education._startDate.getMonth()] +" "+ this.education._startDate.getFullYear()+
    ' -   '+
    "present"
    }
     
  }
  getTop(){
   
let a="top: calc((100vh * "+(this.index-1)+") + (15% ));"
console.log(a)
    return a 
  }
}
