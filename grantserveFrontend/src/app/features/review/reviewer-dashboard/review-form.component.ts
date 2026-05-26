import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewService } from '../service/review.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent implements OnInit {
  reviewData: any;
  score: number | null = null;
  comments: string = '';

  constructor(
    public router: Router, 
    public reviewService: ReviewService,
    private sanitizer: DomSanitizer
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.reviewData = navigation?.extras.state?.['data'];
  }

  ngOnInit(): void {
    if (!this.reviewData) {
      this.router.navigate(['/reviewer-dashboard']);
    }
  }

  /**
   * Sanitizes the URL to prevent Angular from 
   * security-blocking the external backend link.
   */
  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  submitReview() {
  if (!this.reviewData?.reviewID) return;

  // Validation check for comment length before sending
  if (this.comments.length < 10) {
    alert('Comments must be at least 10 characters long.');
    return;
  }

  const updatePayload = {
    // 1. Match the exact casing expected by ReviewDto (proposalId and reviewerId)
    proposalId: this.reviewData.proposalId || this.reviewData.proposalID,
    reviewerId: this.reviewData.reviewerId || this.reviewData.reviewerID,
    
    // 2. Other required fields
    score: Number(this.score),
    comments: this.comments,
    status: 'REVIEWED',
    date: new Date().toISOString().split('T')[0] 
  };

  console.log("Sending Update Payload:", updatePayload);

  this.reviewService.updateReview(this.reviewData.reviewID, updatePayload).subscribe({
    next: (response) => {
      alert('Review Submitted successfully!');
      this.router.navigate(['/reviewer-dashboard']);
    },
    error: (err) => {
      console.error("Update failed", err);
      // Log the specific validation errors from the backend if available
      alert('Failed to submit review: ' + (err.error || 'Validation Error'));
    }
  });
}
}