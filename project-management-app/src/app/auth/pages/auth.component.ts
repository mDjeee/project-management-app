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
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

    this.loginUser = new FormGroup({
      loginName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      loginPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
      // this.isLoading = true;
      // this.auth.signUp(this.user.value).subscribe({
      //   next:(response) => {
      //     localStorage.setItem('user', JSON.stringify(response));
      //     this.signInAfterSignUp(this.user.value.login, this.user.value.password);
      //   },
      //   error: error => {
      //     this.error = error.error.message;
      //   },
      //   complete: () => {
      //     this.isLoading = false;
      //   }
      // });
    }
  }

  // signInAfterSignUp(login: string, password: string) {
  //   this.isLoading = true;
  //   this.auth.signIn(login, password).subscribe({
  //     next: (response) => {
  //       this.auth.user.next(login);
  //       localStorage.setItem('token', JSON.stringify(response));
  //       localStorage.setItem('login', login);
  //       this.router.navigate(['/']);
  //     },
  //     error: (error) => {
  //       this.error = error;
  //     },
  //     complete: () => {
  //       this.isLoading = false;
  //     }
  //   });
  // }

  signIn() {
    if(this.loginUser.valid) {
      this.store.dispatch(
        new AuthActions.LoginStart({
          login: this.loginUser.value.loginName,
          password: this.loginUser.value.loginPassword,
        })
      );
      // this.isLoading = true;
      // this.auth.signIn(this.loginUser.value.loginName, this.loginUser.value.loginPassword).subscribe({
      //   next: (response) => {
      //     this.auth.user.next(this.loginUser.value.loginName);
      //     localStorage.setItem('token', JSON.stringify(response));
      //     localStorage.setItem('login', this.loginUser.value.loginName);
      //     this.router.navigate(['/']);
      //   },
      //   error: (error) => {
      //     this.error = error;
      //   },
      //   complete: () => {
      //     this.isLoading = false;
      //   }
      // });
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
