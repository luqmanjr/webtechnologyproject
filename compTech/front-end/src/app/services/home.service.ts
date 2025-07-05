import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://localhost:8081/user/home';

  constructor(private http:HttpClient) { }

   // Retrieve the token directly in the service
   private getToken(): string | null {
    return localStorage.getItem('token'); // Assuming token is stored in localStorage
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken(); // Get the token from localStorage
    if (!token) {
      throw new Error('No token found'); // Handle the case where token is missing
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Include the token in the headers
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  private apiUrlView = 'http://localhost:8081/problem/viewproblems';
  getAll():Observable<any>{
    return this.http.get<any>(this.apiUrlView);
  }

}
