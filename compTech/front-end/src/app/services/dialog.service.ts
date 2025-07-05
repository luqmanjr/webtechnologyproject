import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from 'src/app/components/mat-dialog/mat-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(title: string, message: string): void {
    this.dialog.open(MatDialogComponent, {
      data: {
        title: title,
        message: message
      }
    });
  }
}
