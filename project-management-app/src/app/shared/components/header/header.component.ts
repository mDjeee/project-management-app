import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { DialogComponent } from "../dialog/dialog.component";

import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>,
  ) { }

  userSubs!: Subscription;
  isAuthenticated = false;
  username!: string | null;

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').subscribe(authState => {
      this.username = authState.login;
      this.isAuthenticated = !!authState.login;
    })

    this.store.dispatch(
      new AuthActions.AutoLogin()
    );
    // this.userSubs = this.auth.user.subscribe((login: any) => {
    //   this.username = login;
    //   this.isAuthenticated = !!login;
    // })

    // this.auth.autoLogIn();
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  openLogIn() {
    this.router.navigate(['login']);
  }

  toMain() {
    this.router.navigate(['/']);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { name: 'Name' },
    });
  }

}
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
