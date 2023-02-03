import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as dotenv from 'dotenv';
import path from 'path';
import {JWTAuthenticationStrategy, KEY} from './authentication-strategies';
import {JWTServiceProvider} from './authentication-strategies/jwt-service';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class ApiMoneyApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    dotenv.config();

    this.component(AuthenticationComponent);
    this.service(JWTServiceProvider);

    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);
    this.configure(KEY).to({
      jwksUri: process.env.AUTH_JWKS_URI,
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_ISSUER,
      algorithms: ['RS256'],
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
