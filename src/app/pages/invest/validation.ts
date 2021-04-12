import * as yup from 'yup'
import { DataroomFile } from 'types/dataroomFile'
import {
  CommitmentFormValues,
  CommitmentIssuanceFormValues
} from 'types/commitment'

export const commitmentFormValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    pricePerUnit: yup.number().required('Required'),
    totalAmount: yup.number().required('Required'),
    numberOfUnits: yup.number().required('Required'),
    otp: yup.string().required('Required'),
    signedSubscriptionDocument: yup.object<DataroomFile>().required('Required'),
    withdrawalAddress: yup.string()
  })

export const commitmentIssuanceValidationSchema = yup
  .object()
  .shape<CommitmentIssuanceFormValues>({
    withdrawalAddress: yup.string().required('Required'),
    releaseDate: yup.date().nullable()
  })
