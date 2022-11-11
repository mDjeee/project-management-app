import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  constructor(
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog,
  ) { }

  userSubs!: Subscription;
  isAuthenticated = false;
  username: any;

  ngOnInit(): void {
    this.userSubs = this.auth.user.subscribe((login: any) => {
      this.username = login;
      this.isAuthenticated = !!login;
    })

    this.auth.autoLogIn();
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
