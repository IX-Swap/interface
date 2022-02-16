import * as yup from 'yup'
import { DataroomFile } from 'types/dataroomFile'
import {
  CommitmentFormValues,
  CommitmentIssuanceFormValues
} from 'types/commitment'

export const commitmentFormValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    pricePerUnit: yup.number().required('This field is required'),
    totalAmount: yup.number().required('This field is required'),
    numberOfUnits: yup.number().required('This field is required'),
    otp: yup.string().required('This field is required'),
    signedSubscriptionDocument: yup
      .object<DataroomFile>()
      .required('This field is required'),
    withdrawalAddress: yup.string()
  })

export const commitmentIssuanceValidationSchema = yup
  .object()
  .shape<CommitmentIssuanceFormValues>({
    withdrawalAddress: yup.string().required('This field is required'),
    releaseDate: yup.date().nullable()
  })
