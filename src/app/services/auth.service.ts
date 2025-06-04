import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LOGIN_URL, REGISTER_URL } from '../core/constants/API-Setting';
import {
  UserLoginResponseTokenDTO,
  UserRegisterRequestDTO,
  UserRegisterResponseDTO,
} from '@/models/ILoginAndRegister.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string,
  ): Observable<UserLoginResponseTokenDTO> {
    return this.http
      .post<UserLoginResponseTokenDTO>(LOGIN_URL, { username, password })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.setUserId(response.userId);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.clear();
    window.location.href = '/login';
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  register(
    userRegisterRequestDTO: UserRegisterRequestDTO,
  ): Observable<UserRegisterResponseDTO> {
    return this.http
      .post<UserRegisterResponseDTO>(REGISTER_URL, userRegisterRequestDTO)
      .pipe(
        tap((userRegisterResponseDTO) =>
          console.log('Successful', userRegisterResponseDTO),
        ),
      );
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
