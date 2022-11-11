import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: 'app-dialog',
  styleUrls: ['./dialog.component.scss'],
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private auth: AuthService,
  ) { }

  onClose() {
    this.dialogRef.close();
  }

  logOut() {
    this.dialogRef.close();
    this.auth.logOut();
  }
}
