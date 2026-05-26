/**
 * Represents the full profile data of a Researcher.
 * Updated to align with the Postman PUT request body.
 */
export interface ResearcherProfile {
  researcherID: number;
  userid: number;
  
  // COMMENT: Updated keys to match the Postman body exactly
  name: string;
  contactInfo: string; // Added to match Postman field
  dob: string;         // Date of Birth (ISO string)
  gender: string;      
  
  institution: string;
  department: string;
  
  // COMMENT: 'status' is used for the Verification badge in the UI
  status: string; 
}

/**
 * Represents the document records associated with a Researcher.
 * Updated to match the specific JSON keys from your backend response.
 */
export interface ResearcherDocument {
  // COMMENT: Unique ID for the @for track loop
  documentID: number;
  researcherID: number;
  
  // COMMENT: Matches "docType" from your actual JSON response
  docType: string;       
  
  // COMMENT: Matches "fileURI" from your actual JSON response
  fileURI: string;       
  
  // COMMENT: Matches "uploadedDate" from your actual JSON response
  uploadedDate: string;  
  
  verificationStatus: string;
}