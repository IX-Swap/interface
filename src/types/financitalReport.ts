import { DataroomFile } from 'types/dataroomFile'
import { DigitalSecurityOffering } from 'types/dso'
export interface FinancialReport {
  _id: string
  createdAt: string
  dateFrom: string
  dateTo: string
  reportDocuments: DataroomFile[]
  dso: DigitalSecurityOffering
  nav: number
}
