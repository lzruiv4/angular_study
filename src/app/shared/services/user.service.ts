import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserDTO } from '../models/IUser.model';
import { USER_API } from '@/core/constants/User-API';
import { AuthService } from '@/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$ = this.userSubject.asObservable();

  private isLoad = false;

  constructor(
    private userHttp: HttpClient,
    private authService: AuthService,
  ) {}

  private getUserInfo(): Observable<IUser> {
    // TODO: By login feature can this testUser be changed
    return this.userHttp
      .get<IUser>(USER_API + '/' + this.authService.getUserId())
      .pipe(
        tap((user) => this.userSubject.next(user)),
        catchError((err) => {
          console.error('Get user info failed: ', err);
          return of(null as unknown as IUser);
        }),
      );
  }

  loadUserInfo() {
    if (!this.isLoad) {
      this.isLoad = true;
      this.getUserInfo().subscribe(console.log);
    }
  }

  updateUser(newUserDTO: IUserDTO): Observable<IUser> {
    return this.userHttp
      .put<IUser>(`${USER_API}/${this.authService.getUserId()}`, newUserDTO)
      .pipe(
        map((res) => {
          return {
            id: res.userId,
            username: res.username,
            createdAt: res.createdAt,
            firstname: res.firstname,
            lastname: res.lastname,
            pokemonCoin: res.pokemonCoin,
          } as IUser;
        }),
        tap((response) => {
          this.userSubject.next(response);
          console.log('Update successful: ', response);
        }),
        catchError((error) => {
          console.error('Error occurred during update:', error);
          throw error;
        }),
      );
  }
}
