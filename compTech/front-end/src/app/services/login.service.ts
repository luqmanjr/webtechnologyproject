import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/user/login';

  constructor(private http:HttpClient) { }

  login(body:any){
    return this.http.post(this.apiUrl,body);
  }
}
