import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldSerivce } from 'src/app/Field/Field.Service';
import { Field } from 'src/app/Field/Field.model';

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})
export class EditFieldComponent {
  public editFieldForm:FormGroup;
    public field:Field
  constructor(private fieldService:FieldSerivce,private activatedRoute:ActivatedRoute,private router:Router){
  this.field=new Field(0,"")
  }
    ngOnInit(): void {
      this.editFieldForm=new FormGroup({
        FieldName:new FormControl(null,[Validators.required])
      })
      this.activatedRoute.params.subscribe(params=>{
        this.fieldService.getFieldById(+params["id"]).subscribe(param=>{
          this.field=param
          
          this.editFieldForm.patchValue({FieldName:this.field._fieldName})
        })
      })
    }
    editField(){
     if(this.editFieldForm.valid){//console.log()
      this.field._fieldName=this.editFieldForm.value['FieldName']
 
      this.fieldService.editField(this.field); 
       window.alert("Field edited successfully")
      this.router.navigate(["/admin-panel/fields/1"])    }
    }
}
