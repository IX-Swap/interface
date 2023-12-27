export enum KYCStatuses {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CHANGES_REQUESTED = 'changes-requested',
  NOT_SUBMITTED = 'not submitted',
  DRAFT = 'draft',
  FAILED = 'failed',
  IN_PROGRESS = 'in-progress',
}

export enum IdentityDocumentType {
  INTERNATIONAL_PASSPORT = 'Passport',
  NATIONAL_ID = 'National ID',
  DRIVING_LICENCE = 'Driving Licence',
  // OTHERS = 'Others',
}

export enum SecondaryContactType {
  PROOF_OF_ADDRESS = 'Proof of Address',
  BUSINESS_EMAIL_ADDRESS = 'Business Email Address',
  SOCIAL_MEDIA_HANDLE = 'Social Media Handle',
}