import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewReqService {

  private apiUrl = 'http://localhost:8081/problem/viewrequest';

  constructor(private http:HttpClient) { }


  getCustomerProblems(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }; 
    return this.http.get<any>(this.apiUrl, { headers });
  }
  
}
