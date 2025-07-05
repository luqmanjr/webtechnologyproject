import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegFormService {
  private apiUrl = 'http://localhost:8081/user/register';

  constructor(private http:HttpClient) { }

  add(body:any){
    return this.http.post(this.apiUrl,body);
  }
}

