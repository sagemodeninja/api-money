import {
  AuthenticationBindings,
  AuthenticationStrategy
} from '@loopback/authentication';
import {BindingKey} from '@loopback/core';
import {ExpressRequestHandler} from '@loopback/rest';
import {Algorithm} from 'jsonwebtoken';

export interface Auth0Config {
  jwksUri: string;
  audience: string;
  issuer: string;
  algorithms: Algorithm[];
}

export const JWT_SERVICE = BindingKey.create<ExpressRequestHandler>(
  'services.JWTService',
);

export const KEY = BindingKey.create<AuthenticationStrategy>(
  `${AuthenticationBindings.AUTHENTICATION_STRATEGY_EXTENSION_POINT_NAME}.JWTAuthenticationStrategy`,
);
