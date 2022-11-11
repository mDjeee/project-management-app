import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import url from "../../constants/baseUrl";
import { catchError, pipe, Subject, take, tap, throwError } from "rxjs";
import { PostUser } from "../models/PostUser";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject();

  constructor(private http: HttpClient) { }

  signUp(form: PostUser) {
    return this.http.post<PostUser>(url + '/signup', form);
  }

  autoLogIn() {
    const login = localStorage.getItem('login')
    if(!!login) {
      this.user.next(login);
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.user.next('');
  }

  signIn(login: string, password: string) {
    return this.http.post<string>(url + '/signin', {
      login: login,
      password: password
    });
  }
}
