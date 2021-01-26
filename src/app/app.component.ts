import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Moment';
  userLoggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.userLogged.subscribe((res) => {
      this.userLoggedIn = res;
    });
  }
}
