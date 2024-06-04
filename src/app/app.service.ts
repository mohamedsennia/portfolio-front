import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class applicationService{
    private isHidden:boolean
    constructor(){
        this.isHidden=true
    }
    toggleHidden(){
        this.isHidden=!this.isHidden
    }
    isHiden(){
        return this.isHidden
    }
}