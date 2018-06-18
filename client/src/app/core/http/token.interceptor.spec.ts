import { TestBed, inject } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse } from '@angular/common/http';

import { AuthenticationService } from '../authentication/authentication.service';

describe('TokenInterceptorService', () => {

  let tokenInterceptor: TokenInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authenticationService: AuthenticationService;

  function createInterceptor(_authenticationService: AuthenticationService) {
    tokenInterceptor = new TokenInterceptor(_authenticationService);
    return tokenInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        TokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: createInterceptor,
          deps: [AuthenticationService],
          multi: true
        }
      ]
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  beforeEach(inject([
    HttpClient,
    HttpTestingController,
    AuthenticationService
  ], (_http: HttpClient,
      _httpMock: HttpTestingController,
      _authenticationService: AuthenticationService) => {

    http = _http;
    httpMock = _httpMock;
    authenticationService = _authenticationService;
  }));

  it('should be created', inject([TokenInterceptor], (service: TokenInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
