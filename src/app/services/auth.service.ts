import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Credential {
  // define the object (singular)
  id: number;
  token: string;
  user: Object;
}
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: any;
  private jwt: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
    let token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.currentUser = this.jwt.decodeToken(token);
    }
  }
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  login(credentials: any) {
    return this.http.post<Credential>('/api/login', credentials).pipe(
      map((response) => {
        let result = response;

        if (result && result.token) {
          this.saveToken(result.token);

          let token = result.token;
          this.currentUser = this.jwt.decodeToken(token);

          return true;
        } else return false;
      })
    );
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser = null;
  }
  isAdmin(): boolean {
    return this.currentUser.admin;
  }

  isLoggedIn(): boolean {
    let Token = this.getToken();
    return Token ? !this.jwt.isTokenExpired(Token) : false;
  }
}
