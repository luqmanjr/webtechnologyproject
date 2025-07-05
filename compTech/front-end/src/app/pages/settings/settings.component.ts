import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';
import { SettingService } from 'src/app/services/setting.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userInfo: any;
  editForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    private homeService: HomeService,
    private settingService: SettingService,
    private snackBar: MatSnackBar

    
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.configureEditForm();

    this.homeService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data;

        //Update the form with data from API
        this.editForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          pnum: data.pnum,
          email: data.email,
          username: data.username
        });
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );

  }

  configureEditForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      pnum: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required])
    });
  }

  editProfile(): void {
    const { firstName, lastName, username, pnum, email, address } = this.editForm.value;

    const token = localStorage.getItem('token') || '';
    console.log("Token being sent:", token);

    this.settingService.editProfile(firstName, lastName, address, pnum, email, username, token).subscribe(
      (response) => {
        // Show success message in Snackbar
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000,  // Snackbar will disappear after 3 seconds
          verticalPosition: 'top',  // Position at the top of the screen
          horizontalPosition: 'center'  // Position in the center
        });

        // Optionally, close the dialog after successful update
        this.dialogRef.close();
        setTimeout(() => {
          window.location.reload();
        }, 500);

         localStorage.setItem('username', username);
         this.dialogRef.close(true);
      },

      
      (error) => {
        // Handle error and show failure message in Snackbar
        this.snackBar.open('Failed to update profile. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        console.error('Error updating profile:', error);
      }
    );
  }
}
