import { Injectable,inject } from "@angular/core";
import { ActivatedRouteSnapshot , CanActivateFn, Router, RouterStateSnapshot  } from "@angular/router";
import { Observable } from "rxjs";
import { ConnectionService } from "./Connection.service";
@Injectable({"providedIn":'root'})
class PermissionsService {

    constructor(private router: Router,private connectionService:ConnectionService) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean> | Promise<boolean>  {
        if(this.connectionService.isLoged()){
            return true;
        }else{
            this.router.navigate(['login']);
        }
        return false;
        //your logic goes here
    }
} 
export const authGuard:CanActivateFn =(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean  | Observable<boolean> | Promise<boolean> =>{ return inject(PermissionsService).canActivate(next, state);}
