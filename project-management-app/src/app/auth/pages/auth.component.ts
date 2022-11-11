import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  hide = true;

  isLoading = false;

  error = '';

  isLoginMode = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

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
      this.isLoading = true;
      this.auth.signUp(this.user.value).subscribe({
        next:(response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.signInAfterSignUp(this.user.value.login, this.user.value.password);
        },
        error: error => {
          this.error = error.error.message;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  signInAfterSignUp(login: string, password: string) {
    this.isLoading = true;
    this.auth.signIn(login, password).subscribe({
      next: (response) => {
        this.auth.user.next(login);
        localStorage.setItem('token', JSON.stringify(response));
        localStorage.setItem('login', login);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  signIn() {
    if(this.loginUser.valid) {
      this.isLoading = true;
      this.auth.signIn(this.loginUser.value.loginName, this.loginUser.value.loginPassword).subscribe({
        next: (response) => {
          this.auth.user.next(this.loginUser.value.loginName);
          localStorage.setItem('token', JSON.stringify(response));
          localStorage.setItem('login', this.loginUser.value.loginName);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
