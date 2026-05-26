import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearcherService } from '../service/researcher.service';
import { ResearcherProfile, ResearcherDocument } from '../model/researcher.model';

@Component({
  selector: 'app-researcherdashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './researcherdashboard.component.html',
  styleUrls: ['./researcherdashboard.component.css']
})
export class ResearcherDashboardComponent implements OnInit {
  today: Date = new Date();
  profile!: ResearcherProfile;
  documents: ResearcherDocument[] = [];
  grantCount: number = 0; // Set to 0 by default
  userId = localStorage.getItem('userId');

  constructor(
    private researcherService: ResearcherService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    if (this.userId) {
      this.researcherService.getProfile(this.userId).subscribe({
        next: (data) => {
          this.profile = data;
          if (data.researcherID) {
            this.loadStats(data.researcherID);
          }
        }
      });
    }
  }

  loadStats(id: number) {
    this.researcherService.getDocumentsByResearcherId(id).subscribe({
      next: (docs) => {
        this.documents = docs;
        
        // FIX: Remove the simulation that was setting grantCount to 1
        // Only update this when you fetch actual applications from your API
        this.grantCount = 0; 
        
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * UPDATED LOGIC: 
   * Switches to VERIFIED (Green) only if EVERY document is "Approved"
   */
  get statusUI() {
    if (this.documents.length === 0) {
      return { label: 'PENDING', class: 'status-red', icon: 'bi-clock-fill' };
    }

    // CHECK: Using 'Approved' to match your screenshot exactly
    const allApproved = this.documents.every(d => d.verificationStatus === 'Approved');

    if (allApproved) {
      return { label: 'VERIFIED', class: 'status-green', icon: 'bi-patch-check-fill' };
    } else {
      // If even one is still "Pending", keep the whole profile status as PENDING
      return { label: 'PENDING', class: 'status-red', icon: 'bi-clock-fill' };
    }
  }
}