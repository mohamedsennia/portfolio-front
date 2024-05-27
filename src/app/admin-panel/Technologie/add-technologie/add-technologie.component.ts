import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConnectionService } from 'src/app/Connection.service';
import { FieldSerivce } from 'src/app/Field/Field.Service';
import { Field } from 'src/app/Field/Field.model';
import { Technologie } from 'src/app/Technologie/Technologie.model';
import { TechnologieService } from 'src/app/Technologie/Technologie.service';

@Component({
  selector: 'app-add-technologie',
  templateUrl: './add-technologie.component.html',
  styleUrls: ['./add-technologie.component.css']
})
export class AddTechnologieComponent implements OnInit, OnDestroy{
  public addTechnologieForm:FormGroup;
  private subscriptions:Subscription[];
  constructor(private technologieService:TechnologieService,private router:Router){
  this.subscriptions=[];
  }
 
    ngOnInit(): void {
      this.addTechnologieForm=new FormGroup({
        TechName:new FormControl(null,[Validators.required]),
        TechIcon:new FormControl(null,[Validators.required])
      })
    }
    addField(){
     if(this.addTechnologieForm.valid){//console.log()
      this.technologieService.addTechnologie(new Technologie(null,this.addTechnologieForm.value["TechName"],this.addTechnologieForm.value["TechIcon"]))
      window.alert("Technologie add successfully")
        this.router.navigate(["/admin-panel/technologies/1"])


     }
    }
    ngOnDestroy(): void {
      for (let subscription of this.subscriptions){
        subscription.unsubscribe()
      }
    }
}
