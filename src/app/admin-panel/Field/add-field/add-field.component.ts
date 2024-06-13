import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldSerivce } from 'src/app/Field/Field.Service';
import { Field } from 'src/app/Field/Field.model';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit{
public addFieldForm:FormGroup;
constructor(private fieldService:FieldSerivce,private router:Router){

}
  ngOnInit(): void {
    this.addFieldForm=new FormGroup({
      FieldName:new FormControl(null,[Validators.required])
    })
  }
  addField(){
    if(this.fieldService.isAdmin()){
   if(this.addFieldForm.valid){//console.log()
    this.fieldService.addField(new Field(null,this.addFieldForm.value["FieldName"]))
    window.alert("Field add successfully")
    this.router.navigate(["/admin-panel/fields/1"])
    
   
   }
  }else{
    window.alert("You must be an admin to do this action")
  }
  }
}
