import { Component, inject, OnInit, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogComponent } from 'src/app/components/mat-dialog/mat-dialog.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{

  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }


  username: string | null = '';

  constructor(public dialog:MatDialog,private dialogService:DialogService){}
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    console.log('Retrieved username:', this.username);
  }
  private breakpointObserver = inject(BreakpointObserver);
 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    openProfileDialog(){

      this.dialogService.openDialog('Error','hey');
    }


    // readonly dialog = inject(MatDialog);

  // openDialog() {
    // const dialogRef = this.dialog.open(SettingsComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    openDialog() {
      const dialogRef = this.dialog.open(SettingsComponent, {
        width: '900px',  // Set the width
        height: 'auto',   // Set the height, or leave it to auto
        maxHeight: '90vh', // Limit the max height to viewport height
        disableClose: true,
        data: {
          // Pass any data if needed
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // Handle the result if needed
      });
    }
  // }
}
