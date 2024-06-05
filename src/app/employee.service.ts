import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, mergeMap, retryWhen, throwError, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://dummy.restapiexample.com/api/v1';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee/${id}`);
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, employee).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error: HttpErrorResponse, i) => {
            if (error.status === 429 && i < 3) {
              const delayMs = Math.pow(2, i) * 1000; // Exponential backoff
              return timer(delayMs);
            }
            return throwError(error);
          })
        )
      ),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 429) {
          console.error('Rate limit exceeded. Please try again later.');
        } else {
          console.error('Error creating employee:', error);
        }
        throw error;
      })
    );
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
