import { DataroomFile } from 'types/dataroomFile'

export interface UploadReportFormValues {
  nav: number
  dateFrom: string
  dateTo: string
  reportDocuments: DataroomFile[]
}
