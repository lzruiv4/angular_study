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
import { UserRegisterDTO } from '@/models/ILoginAndRegister.model';
import { RoleType } from '@/models/enums/RoleType.enum';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
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
    const mockResponse: UserRegisterDTO = {
      userId: 'userId',
      username: 'username',
      firstname: 'firstname',
      lastname: 'lastname',
      password: 'password',
      roles: [RoleType.ROLE_USER],
    };

    authService
      .register('username', 'firstname', 'lastname', 'password', [
        RoleType.ROLE_USER,
      ])
      .subscribe((response) => {
        expect(response.userId).not.toBeNull;
        expect(response.username).toEqual('username');
        expect(response.firstname).toEqual('firstname');
        expect(response.lastname).toEqual('lastname');
        expect(response.password).toEqual('password');
      });

    const req = httpMock.expectOne('http://localhost:9090/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
