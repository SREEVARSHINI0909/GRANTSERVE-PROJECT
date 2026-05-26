import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { switchMap } from 'rxjs';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // Import Viewer

import { ApplicationService } from '../Service/application.service';
import { ProposalService } from '../Service/proposal.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar, PdfViewerModule,RouterLink],
  templateUrl: './create-application.html',
  styleUrl: './create-application.css'
})
export class CreateApplication implements OnInit {
  programID: number;
  researcherID: number;

  applicationForm: FormGroup;
  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  isVerified = false;

  // PDF Preview State
  pdfSrc: Uint8Array | null = null;
  zoom: number = 0.8;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private app: ApplicationService, 
    private prop: ProposalService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {

    this.programID = Number(this.route.snapshot.paramMap.get('programID'));
    this.researcherID = Number(this.route.snapshot.paramMap.get('researcherID'));

    this.applicationForm = this.fb.group({
      title: ['', Validators.required],
      proposalUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

    // Clear preview if URL changes
    this.applicationForm.get('proposalUrl')?.valueChanges.subscribe(() => {
      this.isVerified = false;
      this.pdfSrc = null;
      if (this.status === 'success') this.status = 'idle';
    });
  }

  ngOnInit(): void { }

  verifyUrl() {
    const url = this.applicationForm.get('proposalUrl')?.value;
    
    if (this.applicationForm.get('proposalUrl')?.valid) {
      this.status = 'loading';
      
      // Fetch PDF as blob to verify access and convert to Uint8Array for viewer
      this.http.get(url, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            const arrayBuffer = fileReader.result as ArrayBuffer;
            this.pdfSrc = new Uint8Array(arrayBuffer);
            this.status = 'success';
            this.isVerified = true;
            this.currentPage = 1;
            this.cdr.detectChanges();
          };
          fileReader.readAsArrayBuffer(blob);
        },
        error: (err) => {
          console.error('PDF Fetch failed:', err);
          this.status = 'error';
          this.isVerified = false;
          this.pdfSrc = null;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.status = 'error';
      this.isVerified = false;
    }
  }

  // PDF Event Handlers
  onPdfLoadComplete(pdf: any): void {
    this.totalPages = pdf.numPages;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onPdfError(error: any): void {
    console.error('Viewer error:', error);
    this.isVerified = false;
    this.status = 'error';
  }

  // Navigation Methods
  incrementZoom(amount: number): void {
    this.zoom = Math.max(0.4, Math.min(2.0, this.zoom + amount));
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  submitApplication() {
    if (this.applicationForm.invalid || !this.isVerified) return;

    this.status = 'loading';

    const applicationPayload = {
      title: this.applicationForm.value.title,
      programID: this.programID,
      researcherID: this.researcherID
    };

    this.app.submitApplication(applicationPayload).pipe(
      switchMap((res: any) => {
        const appId = (typeof res === 'object') ? (res.applicationID || res.id || res) : res;
        const documentPayload = {
          applicationID: appId,
          fileURI: this.applicationForm.value.proposalUrl
        };
        return this.prop.SubmitDocument(documentPayload);
      })
    ).subscribe({
      next: () => {
        this.status = 'success';
        alert('Application submitted successfully!');
        this.resetForm();
      },
      error: (err) => {
        if (err.status === 201 || err.status === 200) {
          this.status = 'success';
          this.resetForm();
        } else {
          this.status = 'error';
          alert('Submission failed.');
        }
      }
    });
  }

  private resetForm() {
    this.applicationForm.reset();
    this.status = 'idle';
    this.isVerified = false;
    this.pdfSrc = null;
  }
}