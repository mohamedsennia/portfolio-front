import { Injectable } from "@angular/core";
import { ConnectionService } from "../Connection.service";
import { Field } from "./Field.model";
import { Observable, Subscription, map } from "rxjs";
@Injectable({providedIn:"root"})
export class FieldSerivce{
  
    private fields:Field[]
     getFieldsSub:Subscription
constructor(private connectionService:ConnectionService){
    this.fields=null
   this.getFieldsSub=connectionService.getFields().subscribe(param=>{
    console.log(param)
    this.fields=param
   })
}
getFields():Field[]|Observable<Field[]>{
    if(this.fields!=null){return this.fields}
    this.getFieldsSub.unsubscribe()
    return this.connectionService.getFields().pipe(map(param=>{
        this.fields=param
        return param

    }))
}
getFieldById(id:number){
    return this.connectionService.getFieldById(id)
}
addField(field:Field){
    
   this.connectionService.addField(field).pipe(map(param=>this.fields.push(field))).subscribe()
}
editField(field:Field){
    this.connectionService.addField(field).pipe(map(param=>{this.fields[this.fields.findIndex(f=>f._field_id==field._field_id)]=field})).subscribe()
}
deleteField(field:Field){
  return  this.connectionService.deleteField(field).pipe(map(param=>{
        this.fields.splice(this.fields.indexOf(field),1)
        return this.fields
    }))
}
}