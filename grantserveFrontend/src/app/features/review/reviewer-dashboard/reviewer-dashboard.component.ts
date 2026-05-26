import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../service/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewer-dashboard',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './reviewer-dashboard.component.html',
  styleUrl: './reviewer-dashboard.component.css'
})
export class ReviewerDashboard implements OnInit {
  reviews = signal<any[]>([]);
  reviewerId: number | null = null;

  constructor(
    private reviewService: ReviewService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('userId');
    
    if (storedId) {
      this.reviewerId = Number(storedId);
      this.getReviews();
    } else {
      console.error("No user ID found in storage");
      this.router.navigate(['/login']);
    }
  }

  getReviews() {
    if (this.reviewerId) {
      this.reviewService.getReviewerDashboard(this.reviewerId).subscribe({
        next: (data) => {
          // Flattening the nested array structure found in the backend response
          const flattenedData = Array.isArray(data) ? data.flat(Infinity) : [data];
          this.reviews.set(flattenedData);
        },
        error: (err) => console.error("Error fetching reviews", err)
      });
    }
  }

  // Navigation to the detailed review page
  goToReview(review: any) {
  // Use an absolute path to ensure the router matches correctly
  this.router.navigate(['/review-form'], { state: { data: review } });
}

  logout() {
    localStorage.clear(); 
    this.router.navigate(['/']);
  }
}