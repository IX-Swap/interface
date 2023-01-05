export interface VettingFormValues {
  applicantFullname: string
  email: string

  companyName: string
  companyWebsite: string

  description: string

  pitchDeck: File
  fundingDocuments: File[]

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

export interface DirectorInfo {
  fullName: string
  proofOfIdentity: File
  proofOfAddress: File
}