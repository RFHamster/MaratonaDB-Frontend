import {
    HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

import { routes } from './app.routes';
import { AuthTokenInterceptor } from './interceptor/auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes), 
      provideClientHydration(),
      importProvidersFrom([BrowserAnimationsModule]),
      provideHttpClient(withInterceptorsFromDi(),withFetch()),
      { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true},
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService
      ]
};
