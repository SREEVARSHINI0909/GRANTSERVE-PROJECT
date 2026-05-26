import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8081/review-service/review'; 
  // Assuming your Auth/User service is on a different port, e.g., 9090
  private authUrl = 'http://localhost:8081/auth-service/auth'; 

  constructor(private http: HttpClient) { }

  // POST: Assign a new reviewer
  assignReview(reviewData: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/assign`, reviewData, { responseType: 'text' });
  }

  // GET: Reviewer Dashboard
  getReviewerDashboard(reviewerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/dashboard/${reviewerId}`);
  }

  // PUT: Update an existing review
  updateReview(reviewId: number, updateData: any): Observable<string> {
    return this.http.put(`${this.baseUrl}/update/${reviewId}`, updateData, { responseType: 'text' });
  }

  // NEW: Fetch all users with the role 'REVIEWER'
  // If this endpoint doesn't exist yet, you'll need to create it in your Auth/User service
  getAllReviewers(): Observable<any[]> {
  // This calls the new endpoint you just created in the backend
  return this.http.get<any[]>(`${this.authUrl}/role/REVIEWER`);
}
}