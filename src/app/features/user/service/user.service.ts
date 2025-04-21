import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  IUser,
  IUserDTO,
  mapDtoToModel,
  mapModelToDto,
} from '../../../shared/models/IUser.model';
import { HttpClient } from '@angular/common/http';
import { testUserId, UserAPI } from '../../../core/constants/User-API';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser | null>(null);
  userId: string = testUserId;
  user$ = this.userSubject.asObservable();

  constructor(private userHttp: HttpClient) {}

  getUserInfo(): Observable<IUser> {
    // TODO: By login feature can this testUser be changed
    return this.userHttp.get<IUserDTO>(UserAPI + '/' + this.userId).pipe(
      map((dto) => mapDtoToModel(dto)),
      tap((user) => this.userSubject.next(user))
    );
  }

  updateUser(newUser: IUser): Observable<IUser> {
    const newUserDTO: IUserDTO = mapModelToDto(newUser);
    return this.userHttp
      .put<IUserDTO>(UserAPI + '/' + this.userId, newUserDTO)
      .pipe(
        map((dto) => mapDtoToModel(dto)),
        tap((user) => this.userSubject.next(user))
      );
  }
}
