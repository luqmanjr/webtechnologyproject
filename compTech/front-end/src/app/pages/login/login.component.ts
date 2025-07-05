import { Component, OnInit,signal } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {MatDialog} from '@angular/material/dialog'
import {MatDialogContent} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  images=[
    {name:'computerrepair1.webp'},
    {name:'repair2.jpg'},
  ]

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginForm!:FormGroup;
  responseMessage:string='';

  constructor(
    private logInServices:LoginService,
    private router:Router,
    private snackBar:MatSnackBar,
    private dialogService:DialogService
  ){}

  ngOnInit(): void {
    this.configureRegForm();
  }
  configureRegForm(){
    this.loginForm=new FormGroup({
      username:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required])
    });
  }


  logIn() {
    if (this.loginForm.invalid) {
      this.responseMessage = 'Please fill in all fields';
      return;
    }
    const values = this.loginForm.value;
    console.log('form values=>', values);
  
    const data = {
      username: values.username,
      password: values.password
    };
  
    this.logInServices.login(data).subscribe(
      (response: any) => {
       
        
          // this.openDialog('Success', '' );
          this.snackBar.open('Login successful!', '', {
            duration: 2000, // Show snackbar for 3 seconds
             verticalPosition: 'top', // 'top' or 'bottom'
            horizontalPosition: 'center'
          });
          console.log('Login successful', response);
          console.log('Username from response:', response.username);
  
          localStorage.setItem('token', response.token);
  
  
          localStorage.setItem('username', response.username);
          console.log('Stored username:', localStorage.getItem('username'));
        


      
        
  
        
        // Redirect based on role_id
        if (response.role=== 1) {
          this.router.navigate(['/admin']);
        } else if (response.role === 2) {
          this.router.navigate(['/main-layout']);
        } else {
          this.router.navigate(['']); // Redirect to a default page
        }
      },
      (error) => {
          this.responseMessage = error.error?.message || 'Incorrect username or password';
          this.dialogService.openDialog('Login Failed!', this.responseMessage);
          // this.loginForm.reset()
      }
    );

    
  }
  
    
}
