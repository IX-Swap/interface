import { DataroomFile, FormArray } from 'types/dataroomFile'

export interface UploadReportFormValues {
  netAssetValue: number
  from: string
  to: string
  documents: FormArray<DataroomFile>
}
