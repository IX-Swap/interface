import * as yup from 'yup'
import { DataroomFile } from 'types/dataroomFile'
import {
  CommitmentFormValues,
  CommitmentIssuanceFormValues
} from 'types/commitment'
import { validationMessages } from 'validation/shared'

export const commitmentFormValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    pricePerUnit: yup.number().required(validationMessages.required),
    totalAmount: yup.number().required(validationMessages.required),
    numberOfUnits: yup.number().required(validationMessages.required),
    otp: yup.string().required(validationMessages.required),
    signedSubscriptionDocument: yup
      .object<DataroomFile>()
      .required(validationMessages.required),
    withdrawalAddress: yup.string()
  })

export const commitmentIssuanceValidationSchema = yup
  .object()
  .shape<CommitmentIssuanceFormValues>({
    withdrawalAddress: yup.string().required(validationMessages.required),
    releaseDate: yup.date().nullable()
  })
