import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  userId: string;
  token: string;
}

interface RegisterResponseDTO {
  userID: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:9090/api/auth/login';
  private registerUrl = 'http://localhost:9090/api/auth/register';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.loginUrl, { username, password })
      .pipe(
        tap((response) => {
          console.log('sdfa ', response);
          this.saveToken(response.token);
          this.setUserId(response.userId);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
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
      .post<RegisterResponseDTO>(this.registerUrl, {
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
    return this.CURRENT_USER_ID ?? localStorage.getItem('userId'); // 从内存或localStorage中获取
  }
}
