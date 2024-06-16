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
  // OTHERS = 'Others',
}

export enum SecondaryContactType {
  PROOF_OF_ADDRESS = 'Proof of Address',
  BUSINESS_EMAIL_ADDRESS = 'Business Email Address',
  SOCIAL_MEDIA_HANDLE = 'Social Media Handle',
}

export enum EmailType {
  PRIMARY = 'primary_email',
  SECONDARY = 'secondary_email',
  SOCIAL_ACCOUNT = 'social_account',
  PROOF_OF_ADDRESS = 'proof_of_address'
}

export enum SuccessType {
  PERSONAL = 'personal',
  BUSINESS = 'businessEmail',

}

export enum SecondaryContactTypeV2 {
  BUSINESS_EMAIL = 'BusinessEmail',
  TELEGRAM = 'Telegram',
  PROOF_OF_ADDRESS = 'ProofOfAddress'
}

export enum KYCV2RequestButtonText {
  GET_CODE = 'Get Code',
  VERIFY_CODE = 'Verify Code',
  SEND_CODE = 'Send Code'
}
