import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LOGIN_URL, REGISTER_URL } from '../core/constants/API-Setting';
import {
  UserLoginDTO,
  UserRegisterDTO,
} from '@/models/ILoginAndRegister.model';
import { RoleType } from '@/models/enums/RoleType.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<UserLoginDTO> {
    return this.http.post<UserLoginDTO>(LOGIN_URL, { username, password }).pipe(
      tap((response) => {
        // console.log(response.userId);
        this.saveToken(response.token);
        this.setUserId(response.userId);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.clear();
    window.location.href = '/login';
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  register(
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    roles: RoleType[],
  ): Observable<UserRegisterDTO> {
    return this.http
      .post<UserRegisterDTO>(REGISTER_URL, {
        username,
        firstname,
        lastname,
        password,
        roles,
      })
      .pipe(tap((response) => console.log('Successful', response)));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
