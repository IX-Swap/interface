export interface VettingFormValues {
  applicantFullname: string
  email: string

  companyName: string
  companyWebsite: string

  description: string

  pitchDeck: File
  fundingDocuments: FundingDocument[]

  certificateOfIncorporation: File
  certificateOfIncumbency: File

  shareDirectorRegistry: File
  auditedFinancials: File

  memorandumArticle: File
  ownershipStructure: File

  resolutionAuthorizedSignatory: File

  beneficialOwners: DirectorInfo[]
  directors: DirectorInfo[]
}

export interface FundingDocument {
  id: number
  file: File
}

export interface DirectorInfo {
  fullName: string
  proofOfIdentity: File
  proofOfAddress: File
}