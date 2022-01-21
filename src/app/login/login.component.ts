import {
  Component,
  Inject,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  invalidLogin: boolean = false;
  isView: boolean = false;
  private timer: any;
  private time: number = 5000;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  signIn(credentials: { email: string; password: string }) {
    if (!credentials.email || !credentials.password) {
      this.setInValidLogIn();
    } else {
      this.authService.login(credentials).subscribe({
        next: (result) => {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          if (result) this.router.navigate([returnUrl || '/']);
          else {
            this.setInValidLogIn();
          }
        },
        error: () => this.setInValidLogIn(),
      });
    }
  }
  private setInValidLogIn() {
    clearTimeout(this.timer);

    this.invalidLogin = true;
    this.timer = setTimeout(() => {
      this.invalidLogin = false;
    }, this.time);
  }

  isviewUpdate(value: boolean) {
    this.isView = value;
  }
  ngOnInit(): void {}
}
