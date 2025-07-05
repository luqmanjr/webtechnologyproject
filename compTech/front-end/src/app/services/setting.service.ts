import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private apiUrl = 'http://localhost:8081/user/editprof';

  constructor(private http:HttpClient) { }

  editProfile(firstName: string, lastName: string, address: string, pnum: string, email: string, username: string, token: string): Observable<any> {
    // Set up the headers including the Authorization header with the JWT token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // JWT token in Authorization header

    });

    // The payload with the profile data to be updated
    const body = {
      firstName,
      lastName,
      address,
      pnum,
      email,
      username
    };

    // Make a POST request to the backend to edit the profile
    return this.http.post(this.apiUrl, body, { headers });
  }
}
