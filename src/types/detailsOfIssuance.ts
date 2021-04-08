import { DataroomFile } from 'types/dataroomFile'

export interface DetailsOfIssuance {
  _id: string
  fullName: string
  companyName: string
  companyRegistrationNumber: string
  contactNumber?: string
  email: string
  industry: string
  fundRaisingAmount: number
  detail: string
  documents: DataroomFile[]
  status: 'Draft' | 'Submitted' | 'Approved'
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
