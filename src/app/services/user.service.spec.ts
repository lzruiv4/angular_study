import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { AuthService } from '@/services/auth.service';
import { IUser, IUserDTO } from '../models/IUser.model';
import { USER_API } from '@/core/constants/API-Setting';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RoleType } from '@/models/enums/RoleType.enum';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  // simulating user info
  const mockUser: IUser = {
    userId: '123',
    username: 'testuser',
    firstname: 'firstname',
    lastname: 'lastname',
    pokemonCoin: 100,
    createdAt: new Date(),
    roles: [RoleType.ROLE_USER],
  };

  const mockUserDTO: IUserDTO = {
    userId: '123',
    username: 'updatedUsername',
    firstname: 'updatedFirstname',
    lastname: 'updatedLastname',
    pokemonCoin: 1,
    createdAt: new Date(),
    roles: [RoleType.ROLE_USER],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AuthService, useValue: { getUserId: () => '123' } },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // make sure all request are done
  });

  // test loadUserInfo() 和 getUserInfo()
  describe('loadUserInfo()', () => {
    it('should load user info once and cache it', () => {
      userService.loadUserInfo();

      const req = httpMock.expectOne(`${USER_API}/123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);

      // check BehaviorSubject
      userService.user$.subscribe((user) => {
        expect(user).toEqual(mockUser);
      });
    });

    it('should handle getUserInfo() error', () => {
      spyOn(console, 'error');
      userService.loadUserInfo();

      const req = httpMock.expectOne(`${USER_API}/123`);
      req.error(new ErrorEvent('Network error')); // simulate network error

      userService.user$.subscribe((user) => {
        expect(user).toBeNull();
      });
      expect(console.error).toHaveBeenCalled();
    });
  });

  // test updateUser()
  describe('updateUser()', () => {
    it('should send PUT request and update user data', () => {
      const mockUpdatedUser: IUser = {
        userId: mockUserDTO.userId,
        username: 'updatedUsername',
        firstname: 'updatedFirstname',
        lastname: 'updatedLastname',
        pokemonCoin: 1,
        createdAt: mockUser.createdAt,
        roles: [RoleType.ROLE_USER],
      };
      // console.log('sdfadsf: ', updatedUser);

      userService.updateUser(mockUserDTO).subscribe((res) => {
        expect(res).toEqual(mockUpdatedUser);
      });

      const req = httpMock.expectOne(`${USER_API}/123`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockUserDTO);

      userService.user$.subscribe((user) => {
        expect(user).toEqual(mockUpdatedUser);
      });
    });

    it('should handle update error', () => {
      spyOn(console, 'error');
      userService.updateUser(mockUserDTO).subscribe({
        error: (err) => expect(err).toBeDefined(),
      });

      const req = httpMock.expectOne(`${USER_API}/123`);
      req.error(new ErrorEvent('Update failed'));
      expect(console.error).toHaveBeenCalled();
    });
  });
});
