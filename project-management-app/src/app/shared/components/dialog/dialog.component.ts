import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { MatDialogRef } from "@angular/material/dialog";

import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.scss'],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private store: Store<fromApp.AppState>,
  ) { }

  onClose() {
    this.dialogRef.close();
  }

  logOut() {
    this.dialogRef.close();
    this.store.dispatch(
      new AuthActions.Logout()
    );
  }
}
