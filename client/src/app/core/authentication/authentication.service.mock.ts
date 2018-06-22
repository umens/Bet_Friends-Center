import { Observable, of } from 'rxjs';

import { Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {

  credentials: Credentials | null = {
    firstname: 'test',
    lastname: 'test',
    email: 'test',
    picture: 'test',
    scope: 'test',
    token: '123'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      firstname: 'test',
      lastname: 'test',
      email: 'test',
      picture: 'test',
      scope: 'test',
      token: '123456'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}
