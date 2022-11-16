import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { DialogComponent } from "../dialog/dialog.component";

import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';
import { animate, state, style, transition, trigger } from "@angular/animations";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toRight', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)',
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(500)
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy{
  isChecked = true;
  lang: string = "EN";
  userSubs!: Subscription;
  isAuthenticated = false;
  username!: string | null;


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>,
    private translateService: TranslateService
  ) { }


  public switchLang() {
    if (this.isChecked === true) {
      this.translateService.use("ru");
      this.lang = "РУ"
    } else {
      this.translateService.use("en")
      this.lang = "EN"
    };
  }
  ngOnInit(): void {
    this.userSubs = this.store.select('auth').subscribe(authState => {
      this.username = authState.login;
      this.isAuthenticated = !!authState.login;
    })

    this.store.dispatch(
      new AuthActions.AutoLogin()
    );
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
