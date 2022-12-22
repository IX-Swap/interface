export interface VettingFormValues {
  applicantFullname: string
  applicantEmail: string

  companyName: string
  companyWebsite: string

  companyPitchDeck: File
  companyAdditionalFiles: File[]

  description: string

  certificateIncorporation: File
  certificateIncumbency: File

  shareDirectorRegistry: File
  copyOfAuditedFinancials: File

  memorandumAndAssociacion: File
  ownershipStructure: File

  authorizedSignatoryList: File

  beneficialOwners: DirectorInfo[]
  directors: DirectorInfo[]
}

export interface DirectorInfo {
  name: string
  proofOfIdentity: File
  proofOfAddress: File
}