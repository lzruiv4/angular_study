import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LOGIN_URL, REGISTER_URL } from '../constants/API-Setting';
import {
  LoginResponseDTO,
  RegisterResponseDTO,
} from '@/shared/models/ILoginAndRegister.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponseDTO> {
    return this.http
      .post<LoginResponseDTO>(LOGIN_URL, { username, password })
      .pipe(
        tap((response) => {
          // console.log('sdfa ', response);
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
  ): Observable<RegisterResponseDTO> {
    const roles = ['ROLE_USER'];
    return this.http
      .post<RegisterResponseDTO>(REGISTER_URL, {
        username,
        firstname,
        lastname,
        password,
        roles,
      })
      .pipe(tap((response) => console.log('Successful', response)));
  }

  private CURRENT_USER_ID: string | null = null;

  setUserId(userId: string) {
    this.CURRENT_USER_ID = userId;
  }

  isLoggedIn(): boolean {
    return !!this.getUserId();
  }

  getUserId(): string | null {
    return this.CURRENT_USER_ID ?? localStorage.getItem('userId');
  }
}
