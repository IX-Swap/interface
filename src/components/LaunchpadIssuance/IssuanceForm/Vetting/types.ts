import { IssuanceFile } from "../types"

export interface VettingFormValues {
  applicantFullName: string
  email: string

  companyName: string
  companyWebsite: string

  description: string

  changesRequested?: string

  fundingDocuments: FundingDocument[]

  document: {
    pitchDeck: IssuanceFile
    
    certificateOfIncorporation: IssuanceFile
    certificateOfIncumbency: IssuanceFile

    shareDirectorRegistry: IssuanceFile
    auditedFinancials: IssuanceFile

    memorandumArticle: IssuanceFile
    ownershipStructure: IssuanceFile

    resolutionAuthorizedSignatory: IssuanceFile
  }

  beneficialOwners: DirectorInfo[]
  directors: DirectorInfo[]
}

export interface FundingDocument {
  id: number
  file: IssuanceFile
}

export interface DirectorInfo {
  id?: number
  fullName: string
  proofOfIdentity: IssuanceFile
  proofOfAddress: IssuanceFile
}