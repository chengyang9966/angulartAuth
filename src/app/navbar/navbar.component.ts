import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  navBarColorClass: string = environment.navBarColorClass;
  constructor(public auth: AuthService) {}
  test() {
    console.log(this.navBarColorClass);
  }
}
