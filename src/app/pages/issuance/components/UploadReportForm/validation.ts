import { DataroomFile, FormArrayElement } from 'types/dataroomFile'
import { UploadReportFormValues } from 'types/financialReports'
import * as yup from 'yup'

export const uploadReportFormValidationSchema = yup
  .object()
  .shape<UploadReportFormValues>({
    netAssetValue: yup
      .number()
      .typeError('Must be a number')
      .required('Net Asset Value required'),
    from: yup.string().required(' From is required'),
    to: yup.string().required('To is required'),
    documents: yup
      .array<FormArrayElement<DataroomFile>>()
      .ensure()
      .required('Documents are required')
  })
