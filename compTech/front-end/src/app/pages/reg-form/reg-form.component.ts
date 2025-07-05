import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { RegFormService } from 'src/app/services/reg-form.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss']
})
export class RegFormComponent implements OnInit{
  regForm!:FormGroup;

  constructor(private RegFormService: RegFormService,private router:Router,private snackBar:MatSnackBar){}
  ngOnInit(): void {
    this.configureRegForm();
  }
  configureRegForm(){
    this.regForm=new FormGroup({
      firstName:new FormControl(null,[Validators.required]),
      username:new FormControl(null,[Validators.required]),
      pnum:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required]),
      lastName:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required]),
      address:new FormControl(null,[Validators.required])
    });
  }

  submitForm(){
    const values=this.regForm.value;
    console.log("registration form =>",values);
    this.RegFormService.add(values).subscribe(
      (response:any)=>{
        if(response){
          console.log("create registration form =>",response);
          this.snackBar.open('Registered successfully!', 'Close', {
            duration: 3000, // Show snackbar for 3 seconds
             verticalPosition: 'top', // 'top' or 'bottom'
              horizontalPosition: 'center'
            
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); 
        }
    },
    (error:HttpErrorResponse)=>{
      if (error.status === 400 && error.error.message === "Username already exists") {
        this.snackBar.open('Username already exists. Please choose another one.', 'Close', {
          duration: 3000,
        });
      }else{
        console.log(error);
      }

    })

  }
}
