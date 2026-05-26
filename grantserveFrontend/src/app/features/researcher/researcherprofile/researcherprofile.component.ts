import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ResearcherService } from '../service/researcher.service';
import { ResearcherProfile, ResearcherDocument } from '../model/researcher.model';

@Component({
  selector: 'app-researcherprofile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './researcherprofile.component.html',
  styleUrls: ['./researcherprofile.component.css']
})
export class ResearcherprofileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  profile!: ResearcherProfile;
  documents: ResearcherDocument[] = [];
  searchTerm: string = '';
  isEditing = false; 
  userId = localStorage.getItem('userId');

  constructor(
    private researcherService: ResearcherService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.userId) {
      this.researcherService.getProfile(this.userId).subscribe({
        next: (data) => {
          this.profile = data;
          if (data.researcherID) {
            this.loadDocs(data.researcherID);
          }
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Error fetching profile:', err)
      });
    }
  }

  loadDocs(id: number) {
    this.researcherService.getDocumentsByResearcherId(id).subscribe({
      next: (docs) => {
        this.documents = docs;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading documents:', err)
    });
  }

  get filteredDocuments() {
    if (!this.searchTerm) return this.documents;
    return this.documents.filter(doc => 
      doc.docType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      doc.fileURI.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /**
   * OPEN DOCUMENT LOGIC
   * Note: Browsers block C:/ access. For this to work on your local machine,
   * your backend should serve the file via an HTTP URL.
   */
  viewDocument(fileUri: string) {
    if (!fileUri) {
      alert("File path is missing.");
      return;
    }

    // Try to open. If blocked by browser security (C:/), an alert triggers.
    const newWindow = window.open(fileUri, '_blank');
    
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      alert("Browser blocked the file access. Please ensure your backend is serving the file via a URL (http://) or check browser popup settings.");
    }
  }

  triggerUpload() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && this.profile) {
      const uploadData = {
        researcherID: this.profile.researcherID,
        docType: this.guessDocType(file.name),
        fileURI: `C:/GrantServe/uploads/${file.name}` 
      };

      this.researcherService.uploadDocument(uploadData).subscribe({
        next: () => {
          alert("Document uploaded successfully!");
          this.loadDocs(this.profile.researcherID); 
        },
        error: (err) => alert("Upload failed: " + err.message)
      });
    }
  }

  private guessDocType(fileName: string): string {
    const name = fileName.toUpperCase();
    if (name.includes('BIRTH') || name.includes('DOB')) return 'BIRTHCERTIFICATE';
    if (name.includes('ID') || name.includes('AADHAAR')) return 'IDPROOF';
    return 'PUBLICATION';
  }

  onSave() {
    if (this.userId && this.profile) {
      this.researcherService.updateProfile(this.userId, this.profile).subscribe({
        next: () => {
          alert("Profile updated successfully!"); 
          this.isEditing = false; 
          this.loadData(); 
        },
        error: (err) => alert("Failed to update profile: " + err.message)
      });
    }
  }
}