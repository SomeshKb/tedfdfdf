import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogged: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());

  constructor() { }

  isAuthenticated(): boolean {
    return localStorage.getItem('userData') ? true : false;
  }
}
