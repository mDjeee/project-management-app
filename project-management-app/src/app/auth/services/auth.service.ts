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
}
