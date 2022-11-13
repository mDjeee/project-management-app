import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import url from "../../constants/baseUrl";
import { catchError, pipe, Subject, take, tap, throwError } from "rxjs";
import { PostUser } from "../models/PostUser";

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;

  user = new Subject();

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }

  signUp(form: PostUser) {
    return this.http.post<PostUser>(url + '/signup', form);
  }

  autoLogIn() {
    const login = localStorage.getItem('login')
    if(!!login) {
      this.user.next(login);
    }
  }

  // logOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('login');
  //   this.user.next('');
  // }

  signIn(login: string, password: string) {
    return this.http.post<string>(url + '/signin', {
      login: login,
      password: password
    });
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout())
    }, expirationDuration);
  }
}
