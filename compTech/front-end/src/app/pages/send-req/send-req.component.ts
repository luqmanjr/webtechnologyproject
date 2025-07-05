import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';
import { SendReqService } from 'src/app/services/send-req.service';


@Component({
  selector: 'app-send-req',
  templateUrl: './send-req.component.html',
  styleUrls: ['./send-req.component.scss']
})
export class SendReqComponent implements OnInit{
  
  sendReqForm!:FormGroup;
  viewProblems:any;
  loading: boolean = false; // Loading state

  constructor(private viewProblem: HomeService,private sendReq: SendReqService,private snackBar:MatSnackBar){}
  ngOnInit(): void {
    this.congigureSubmitForm();

    this.viewProblem.getAll().subscribe(
      (data) => {
        this.viewProblems = data;
      },
      (error) => {
        console.error('Error', error);
      }
    );

  }
  congigureSubmitForm(){
    this.sendReqForm= new FormGroup({
      problem_id: new FormControl(null,[Validators.required ]),
      problem_description: new FormControl(null,[Validators.required ]),
      computer_model: new FormControl(null,[Validators.required ])


    });
  }
  
  submit() {
    if (this.sendReqForm.valid) {
      this.loading = true; // Set loading to true
      const values = this.sendReqForm.value;

      this.sendReq.add(values).subscribe(
        (response: any) => {
          console.log('Response:', response);
          setTimeout(() => {
            this.loading = false; // Hide spinner after a second
            this.sendReqForm.reset(); // Clear the form
            this.snackBar.open('Request sent successfully!', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['bg-primary', 'text-white','custom-snackbar']
            });
          }, 1000); // Wait for 1 second before showing the snackbar
        },
        (error) => {
          this.loading = false; // Hide spinner on error
          console.error('Error:', error);
          this.snackBar.open('An error occurred, please try again.', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['bg-warning', 'text-white']

          });
        }
      );
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['bg-warning', 'text-white']
      });
    }
  }

}
