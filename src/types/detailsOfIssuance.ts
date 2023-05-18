import { DataroomFile } from 'types/dataroomFile'
import { Authorizable } from 'types/authorizer'

export interface DetailsOfIssuance extends Authorizable {
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
  skipped?: boolean
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
  skipped?: boolean
}