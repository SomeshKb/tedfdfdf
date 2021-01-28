import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LoaderService } from './core/services/loader.service';
import { MessageService } from './core/services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Moment';
  userLoggedIn = false;
  showLoader = false;
  message;
  constructor(private authService: AuthService, private messageService: MessageService, private loader: LoaderService,) {
    this.authService.userLogged.subscribe((res) => {
      this.userLoggedIn = res;
    });

    this.messageService.getMessage().subscribe(message => {
      this.message = message;
    });
    this.loader.status.subscribe(res => {
      this.showLoader = res;
      console.log(this.showLoader,'load')
    });
  }
}
