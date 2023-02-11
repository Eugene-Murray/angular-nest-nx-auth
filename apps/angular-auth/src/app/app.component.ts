import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'nest-nx-auth-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-auth';
  user$ = this.authService.currentUser;

  constructor(private authService: AuthService) { 
    this.authService.currentUser.subscribe((user) => {	
			console.log('user', user);
		});
  }

  logout() {
    this.authService.logout();
  }
}
