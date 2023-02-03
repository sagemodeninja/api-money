import {
  AuthenticationStrategy
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {
  ExpressRequestHandler,
  Request,
  Response,
  RestBindings
} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {JWT_SERVICE} from './types';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'auth0-jwt';

  constructor(
    @inject(RestBindings.Http.RESPONSE)
    private response: Response,
    @inject(JWT_SERVICE)
    private jwtCheck: ExpressRequestHandler,
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    return new Promise<UserProfile | undefined>((resolve, reject) => {
      this.jwtCheck(request, this.response, (err: unknown) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolve((request as any).auth);
      });
    });
  }
}
