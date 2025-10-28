export interface CertificateType {
    _id?: string;
    title: string;                // e.g. "React Developer Certificate"
    organization: string;         // e.g. "Meta / Coursera"
    issueDate: string;            // e.g. "2024-06-01"
    certificateImages?: string[]; // ✅ multiple certificate image URLs
    description?: string;         // optional details
    verifyLink?: string;          // optional verification link
    createdAt?: string;
    updatedAt?: string;
  }
  