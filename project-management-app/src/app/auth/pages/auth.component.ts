import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  hide = true;

  isLoading = false;

  storeSub!: Subscription;

  error: string | null = '';

  isLoginMode = false;

  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnDestroy(): void {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  user!: FormGroup;

  loginUser!: FormGroup;

  ngOnInit(): void {
    this.error = '';

    this.user = new FormGroup({
      name: new FormControl(
        {value: '', disabled: this.isLoading},
        [Validators.required, Validators.minLength(3)]
      ),
      login: new FormControl(
        {value: '', disabled: this.isLoading},
        [Validators.required, Validators.minLength(3)]
      ),
      password: new FormControl(
        {value: '', disabled: this.isLoading},
        [Validators.required, Validators.minLength(8)]
      ),
    })

    this.loginUser = new FormGroup({
      loginName: new FormControl(
        {value: '', disabled: this.isLoading},
        [Validators.required, Validators.minLength(3)]
      ),
      loginPassword: new FormControl(
        {value: '', disabled: this.isLoading},
        [Validators.required, Validators.minLength(8)]
      ),
    })

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    })
  }

  get loginName() {
    return this.loginUser.get('loginName')
  }

  get loginPassword() {
    return this.loginUser.get('loginPassword')
  }

  get name() {
    return this.user.get('name');
  }

  get login() {
    return this.user.get('login');
  }

  get password() {
    return this.user.get('password');
  }

  signUp() {
    if(this.user.valid) {
      this.store.dispatch(
        new AuthActions.SignupStart(this.user.value)
      );
    }
  }

  signIn() {
    if(this.loginUser.valid) {
      this.store.dispatch(
        new AuthActions.LoginStart({
          login: this.loginUser.value.loginName,
          password: this.loginUser.value.loginPassword,
        })
      );
    }
  }

  switchForm() {
    this.isLoginMode = !this.isLoginMode;
    this.store.dispatch(
      new AuthActions.ClearError()
    );
    this.user.reset();
    this.loginUser.reset();
  }
}
