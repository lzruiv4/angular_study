import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserDTO, mapDtoToModel } from '../models/IUser.model';
import { USER_API } from '@/core/constants/API-Setting';
import { AuthService } from '@/services/auth.service';

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
    return this.userHttp
      .get<IUserDTO>(USER_API + '/' + this.authService.getUserId())
      .pipe(
        tap((userDTO) => this.userSubject.next(mapDtoToModel(userDTO))),
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
      .put<IUserDTO>(`${USER_API}/${this.authService.getUserId()}`, newUserDTO)
      .pipe(
        tap((updatedUserDTO) => {
          this.userSubject.next(updatedUserDTO);
          console.log('Update successful: ', updatedUserDTO);
        }),
        catchError((error) => {
          console.error('Error occurred during update:', error);
          throw error;
        }),
      );
  }
}
