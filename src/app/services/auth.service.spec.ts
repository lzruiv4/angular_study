import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserRegisterRequestDTO } from '@/models/ILoginAndRegister.model';
import { RoleType } from '@/models/enums/RoleType.enum';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        RouterModule,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    httpMock.verify(); // check for not verify request
  });

  it('should return userId and token in login, and then saved in localStorage', () => {
    const mockResponse = { userId: 'userId', token: 'token-from-backend' };

    authService.login('username', 'password').subscribe((response) => {
      expect(response.userId).toEqual('userId');
      expect(response.token).toEqual('token-from-backend');
      expect(localStorage.getItem('authToken')).toEqual('token-from-backend');
      expect(localStorage.getItem('userId')).toEqual('userId');
    });

    const req = httpMock.expectOne('http://localhost:9090/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should create a new user', () => {
    const mockResponse: UserRegisterRequestDTO = {
      // userId: 'userId',
      username: 'username',
      firstname: 'firstname',
      lastname: 'lastname',
      password: 'password',
      roles: [RoleType.ROLE_USER],
    };

    authService
      .register({
        username: 'username',
        firstname: 'firstname',
        lastname: 'lastname',
        password: 'password',
        roles: [RoleType.ROLE_USER],
      } as UserRegisterRequestDTO)
      .subscribe((response) => {
        expect(response.userId).not.toBeNull;
        expect(response.username).toEqual('username');
        expect(response.firstname).toEqual('firstname');
        expect(response.lastname).toEqual('lastname');
      });

    const req = httpMock.expectOne('http://localhost:9090/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // it('should clean token and navigate to /login in logout', () => {
  //   // const mockResponse = { userId: 'userId', token: 'token-from-backend' };
  //   // expect(authService.isLoggedIn()).toBeFalse();
  //   localStorage.setItem('authToken', 'token');
  //   localStorage.setItem('userId', 'userId');
  //   // authService.login('username', 'password').subscribe();
  //   console.log(authService.isLoggedIn());
  //   expect(authService.isLoggedIn()).toBeTrue();

  //   // const req = httpMock.expectOne('http://localhost:9090/api/auth/login');
  //   // expect(req.request.method).toBe('POST');
  //   // req.flush(mockResponse);
  //   // authService.logout();
  //   // expect(localStorage.getItem('authToken')).toBeNull;
  //   // expect(localStorage.getItem('userId')).toEqual('userId');
  // });
});
