import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { FieldSerivce } from 'src/app/Field/Field.Service';
import { Field } from 'src/app/Field/Field.model';

@Component({
  selector: 'app-show-fields',
  templateUrl: './show-fields.component.html',
  styleUrls: ['./show-fields.component.css']
})
export class ShowFieldsComponent implements OnInit,OnDestroy{

  fields:Field[]
 private connectionSubsecribtions:Subscription[]
constructor( private fieldService:FieldSerivce,private router:Router){
this.fields=[]
this.connectionSubsecribtions=[]
}

ngOnInit(): void {

    if(this.fieldService.getFields()instanceof Observable){
      this.connectionSubsecribtions.push ( ( this.fieldService.getFields() as Observable<Field[]>).subscribe(param=>{
        
        this.fields=param
       
  
      }))
    }else{this.fields=this.fieldService.getFields() as Field[]}
}
edit(id:number){
this.router.navigate(["admin-panel/fields/editField/"+id])
}
delete(field: Field) {
  if(window.confirm("Are you sure you want to delete this field")){
  this.connectionSubsecribtions.push (this.fieldService.deleteField(field).subscribe((param)=>{
  this.fields=param
  }))}
  }
ngOnDestroy(): void {
 for (let subscription of this.connectionSubsecribtions){subscription.unsubscribe()}
}
}
