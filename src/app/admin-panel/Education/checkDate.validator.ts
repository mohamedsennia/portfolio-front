import { AbstractControl, FormControl, ValidationErrors, Validator } from "@angular/forms";
import { Observable } from "rxjs";
export class dateValidator implements Validator {
    validate(control: AbstractControl<any, any>):  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return null;
    }
   
  


    }