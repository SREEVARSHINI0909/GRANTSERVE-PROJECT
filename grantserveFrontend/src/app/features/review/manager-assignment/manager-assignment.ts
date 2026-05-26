import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-assignment.html',
  styleUrls: ['./manager-assignment.css']
})
export class ManagerAssignmentComponent implements OnInit {
  applications = signal<any[]>([]);
  proposals = signal<any[]>([]);
  reviewers = signal<any[]>([]);

  selectedApplicationId: number | null = null;
  selectedProposalId: number | null = null;
  selectedReviewerId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchApplications();
    this.fetchReviewers();
  }

  fetchApplications() {
    this.http.get<any[]>('http://localhost:8081/application-service/GrantApplication/all').subscribe({
      next: (data) => this.applications.set(data),
      error: (err) => console.error("Connection Error in Applications:", err)
    });
  }

  fetchReviewers() {
    this.http.get<any[]>('http://localhost:8081/auth-service/auth/role/REVIEWER').subscribe({
      next: (data) => this.reviewers.set(data),
      error: (err) => console.error("Connection Error in Reviewers:", err)
    });
  }

  selectApplication(id: number) {
    this.selectedApplicationId = id;
    this.selectedProposalId = null; 
    this.http.get<any[]>(`http://localhost:8081/application-service/proposal/getProposal/${id}`).subscribe({
      next: (data) => this.proposals.set(data),
      error: (err) => console.error("Failed to load proposals", err)
    });
  }

  submitAssignment() {
  const payload = {
    proposalId: Number(this.selectedProposalId),
    reviewerId: Number(this.selectedReviewerId),
    score: 0,
    comments: "Initial assignment for technical review.",
    date: new Date().toISOString().split('T')[0],
    status: 'UNDER_REVIEW'
  };

  this.http.post('http://localhost:8081/review-service/review/assign', payload, { 
    responseType: 'text' // <--- ADD THIS LINE
  }).subscribe({
    next: (response) => {
      console.log("Success message:", response);
      alert('Proposal assigned successfully!');
      this.selectedProposalId = null;
      this.selectedReviewerId = null;
    },
    error: (err) => {
      console.error("Assignment Error:", err);
      alert('Error assigning proposal. Check console for details.');
    }
  });
}
}