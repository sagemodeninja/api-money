import {
  bind,
  BindingScope,
  config,
  ContextTags,
  Provider
} from '@loopback/core';
import {ExpressRequestHandler} from '@loopback/rest';
import {expressjwt as jwt} from 'express-jwt';
import {Auth0Config, JWT_SERVICE, KEY} from './types';

const jwks = require('jwks-rsa');

@bind({tags: {[ContextTags.KEY]: JWT_SERVICE}, scope: BindingScope.SINGLETON})
export class JWTServiceProvider implements Provider<ExpressRequestHandler> {
  constructor(
    @config({fromBinding: KEY})
    private options: Auth0Config,
  ) { }

  value() {
    const auth0Config = this.options || {};
    // Use `express-jwt` to verify the Auth0 JWT token
    return jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: auth0Config.jwksUri,
      }),
      audience: auth0Config.audience,
      issuer: auth0Config.issuer,
      algorithms: auth0Config.algorithms || ['RS256']
    });
  }
}
