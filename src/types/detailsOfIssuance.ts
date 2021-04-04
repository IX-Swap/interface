import { DataroomFile } from 'types/dataroomFile'

export interface DetailsOfIssuance {
  fullName: string
  companyName: string
  companyRegistrationNumber: string
  contactNumber?: string
  email: string
  industry: string
  fundRaisingAmount: number
  detail: string
  documents: DataroomFile[]
}

export interface DetailsOfIssuanceFormValues {
  fullName: string
  companyName: string
  companyRegistrationNumber: string
  contactNumber?: string
  email: string
  industry: string
  fundRaisingAmount: number
  detail: string
  companyRelated: DataroomFile[]
  issuanceRelated: DataroomFile[]
  financial: DataroomFile[]
}
