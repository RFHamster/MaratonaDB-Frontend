import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url == "http://localhost:8080/api/auth/v1/register"){
      return next.handle(request);
    }
    
    if (typeof window !== 'undefined') {
      const token = this.authService.getToken();
      if (token) {
        this.authService.getAuthStatus().pipe(take(1)).subscribe(authStatus =>{
          if(!authStatus){
            this.authService.logout();
          }else{
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }
        })
      } else {
        this.authService.logout();
      }
    }
    return next.handle(request);
  }
}