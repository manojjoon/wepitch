import { MatDialog, MatDialogRef, MatDialogState } from "@angular/material";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoaderComponent } from "./loader.component";

@Injectable()
export class LoaderService {
  dialogRef: MatDialogRef<LoaderComponent>;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  showLoader() {
    if ((!this.dialogRef) || this.dialogRef.getState() != MatDialogState.OPEN) {
      this.dialogRef = this.dialog.open(LoaderComponent, {
        panelClass: 'transparent',
        disableClose: true
      });
    }
  }

  hideLoader() {
    if ((this.dialogRef) && this.dialogRef.getState() != MatDialogState.CLOSED) {
      this.dialogRef.close();
    }
  }
}
