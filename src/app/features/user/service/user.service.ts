import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import {
  IUser,
  IUserDTO,
  mapDtoToModel,
  mapModelToDto,
} from '../../../shared/models/IUser.model';
import { HttpClient } from '@angular/common/http';
import { currentUserId, UserAPI } from '../../../core/constants/User-API';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  user$: Observable<IUser | null> = this.userSubject.asObservable();

  constructor(private userHttp: HttpClient) {}

  getUserInfo(): Observable<IUser> {
    // TODO: By login feature can this testUser be changed
    return this.userHttp.get<IUserDTO>(UserAPI + '/' + currentUserId).pipe(
      tap((response) => console.log('获取到的响应内容:', response)),
      map((dto) => mapDtoToModel(dto)),
      tap((user) => this.userSubject.next(user))
    );
  }

  updateUser(newUser: IUser): Observable<IUser> {
    const oldUser = this.userSubject.value;
    if (!oldUser) {
      console.error('System want to update user information, but user is null');
    }
    const newUserDTO: IUserDTO = mapModelToDto({ ...oldUser, ...newUser });
    return this.userHttp
      .put<IUserDTO>(UserAPI + '/' + newUser.userId, newUserDTO)
      .pipe(
        tap((response) => {
          console.log('Response from update:', response);
          this.userSubject.next(response);
        }),
        catchError((error) => {
          console.error('Error occurred during update:', error);
          throw error;
        })
      );
  }
}
