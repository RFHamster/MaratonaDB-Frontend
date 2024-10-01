import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserSignIn } from '../models/usersignin';
import { UserVo } from '../models/uservo';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelperService : JwtHelperService) {
  }

  private setAuth(authenticated: boolean): void {
    this.isAuthenticated.next(authenticated);
    localStorage.setItem('isAuthenticated', JSON.stringify(authenticated));
  }

  urlService() {
    return  environment.api + '/api/auth/v1'
  }

  cadastrar(dadosNovo: UserSignIn): Observable<any>{
    return this.http.post<any>(`${this.urlService()}/register`, dadosNovo).pipe(
      tap(response => {

      }), 
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        console.log('erro', error);          
        errorMessage = error.error.message || error.error.error || 'Ocorreu um erro desconhecido.';   
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.urlService()}/signin`, { username, password }).pipe(
      tap(response => {
        if (response && response.tokenResponse && response.usuario) {
          localStorage.setItem('token', response.tokenResponse.acessToken);
          localStorage.setItem('refrehToken', response.tokenResponse.refreshToken);
        
          const user: UserVo = JSON.parse(JSON.stringify(response.usuario));
          localStorage.setItem('user', JSON.stringify(user));
          this.setAuth(true);
          console.log('Estado de autenticação:', this.isAuthenticated.value);
        }
      }), 
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        if (error.status == 401) {
          errorMessage = 'Usuário ou senha inválido.';
        } else if(error.status == 409) {
          errorMessage = 'Usuário bloqueado.';
        }   else {
          console.log('erro', error);          
          errorMessage = error.error.message || error.error.error || 'Ocorreu um erro desconhecido.';
        }        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refrehToken');
    this.setAuth(false);
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getAuthStatus(): Observable<boolean> {
    if (this.getTokenExpired()) {
      this.setAuth(false);
    }else{
      this.setAuth(true);
    }
    return this.isAuthenticated.asObservable();
  }

  getTokenExpired() {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    return this.jwtHelperService.isTokenExpired(token);
  }
}
