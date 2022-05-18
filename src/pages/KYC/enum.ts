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
  INTERNATIONAL_PASSPORT = 'International Passport',
  NATIONAL_ID = 'National ID',
  DRIVING_LICENCE = 'Driving Licence',
  OTHERS = 'Others',
}
