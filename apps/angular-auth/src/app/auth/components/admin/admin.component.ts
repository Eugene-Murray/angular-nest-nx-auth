import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'nest-nx-auth-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProfile().subscribe((response) => {
      console.log('response', response);
      this.user = response;
    });
  }
}
