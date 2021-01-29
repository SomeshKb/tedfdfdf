import { Injectable, Injector } from '@angular/core';
export let InjectorInstance: Injector;

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
    constructor(private injector: Injector) {
        InjectorInstance = this.injector;
    }
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any, controlName?: string) {
        const config = {
            'required': 'Please enter a valid value.',
            'email': 'Invalid email address.',
            'weakPassword': 'Please enter a strong Password'
        };
        return config[validatorName];
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value) {
            if (control.value.match(
                /^(?!\.)(?!.*\.$)(?!.*?\.\.)[^<>()[\]\\,|\%#^\s@\"$&!@+=_~`{}?'/\-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                return null;
            } else {
                return { 'invalidEmailAddress': true };
            }
        }
    }

    static passwordValidator(control) {
      if (control.value) {
          if (control.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!@#$%^&*_+=`|/\){}:[;"'<>,.?-]).{8,20}$/)) {
              // ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})
              return null;
          } else {
              return { 'invalidPassword': true };
          }
      }
  }


}


