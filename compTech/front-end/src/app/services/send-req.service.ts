import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendReqService {

  private apiUrl = 'http://localhost:8081/user/sendRequest';

  constructor(private http:HttpClient) { }

  add(body: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post(this.apiUrl, body, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError(error);  // Propagate the error
      })
    );
  }
  
}


