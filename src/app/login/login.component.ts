import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../Connection.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { User } from '../User/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
   loginForm:FormGroup;
   error:string=null;
constructor(private connectionService:ConnectionService,private router:Router){}
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl(null,[Validators.email,Validators.required]),
      password:new FormControl(null,[Validators.required])
    })
  }

login(){
  if(this.loginForm.valid){
   let email=this.loginForm.value["email"];
   let password=this.loginForm.value["password"]
  this.connectionService.logIn(email,password).subscribe((param:boolean)=>{
    if(param){
      this.router.navigate(["admin-panel/projects/1"])
    }
  },error=>{
    this.error="Wrong email or password please try again"
  })}
}
}
