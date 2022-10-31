import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ForgotPassword } from '../tweetapp-models/forgot-password';
import { UserLoginRequest } from '../tweetapp-models/user-login-request';
import { UserRegistrationRequest } from '../tweetapp-models/user-registration-request';
import { UsersAll } from '../tweetapp-models/users-all';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl: string = "http://tweetapp-env-1.eba-abudzswx.ap-south-1.elasticbeanstalk.com/"+"api/v1.0/tweets";

  constructor(private http: HttpClient) {

  }

  public generateToken(userLoginRequest: UserLoginRequest): Observable<any> {
    return this.http.post(this.baseUrl + "/login"
      , userLoginRequest, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));

  }

  public register(userRegistrationRequest: UserRegistrationRequest) {
    return this.http.post(this.baseUrl + "/register"
      , userRegistrationRequest, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));;
  }

  public resetPassword(userName: string, forgotPassword: ForgotPassword) {
    return this.http.post(this.baseUrl + "/forgot/" + userName
      , forgotPassword, { responseType: 'text' as 'json' }).pipe(catchError(this.errorHandler));;
  }

  public getUserWithUserName(userName: string): Observable<UsersAll[]> {
    return this.http.get<UsersAll[]>(this.baseUrl + "/user/search/" + userName).pipe(catchError(this.errorHandler));;
  }

  public getAllTheUsers(): Observable<UsersAll[]> {
    return this.http.get<UsersAll[]>(this.baseUrl + "/users/all").pipe(catchError(this.errorHandler));;
  }

  public loggedUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  public isUserLoggedIn() {
    let tokenString = localStorage.getItem('token');
    if (tokenString == undefined || tokenString == '' || tokenString == null) {
      return false;
    }
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error || "server error");
  }
}
