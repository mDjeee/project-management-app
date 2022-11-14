import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import url from "../../constants/baseUrl";
import { PostUser } from "../models/PostUser";

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { getCookie } from "src/app/core/services/cookie.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }

  signUp(form: PostUser) {
    return this.http.post<PostUser>(url + '/signup', form);
  }

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
