import { DataroomFile } from 'types/dataroomFile'
import { UploadReportFormValues } from 'types/financialReports'
import * as yup from 'yup'

export const uploadReportFormValidationSchema = yup
  .object()
  .shape<UploadReportFormValues>({
    nav: yup
      .number()
      .typeError('Must be a number')
      .required('Net Asset Value required'),
    dateFrom: yup.string().required(' From is required'),
    dateTo: yup.string().required('To is required'),
    reportDocuments: yup
      .array<DataroomFile>()
      .ensure()
      .required('Documents are required')
  })
