import * as yup from 'yup'
import { DataroomFile } from 'v2/types/dataroomFile'
import {
  CommitmentFormValues,
  CommitmentIssuanceFormValues
} from 'v2/types/commitment'
import { addressValidator } from 'v2/validation/validators'

export const commitmentFormValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    pricePerUnit: yup.number().required('Required'),
    totalAmount: yup.number().required('Required'),
    numberOfUnits: yup.number().required('Required'),
    otp: yup.string().required('Required'),
    signedSubscriptionDocument: yup.object<DataroomFile>().required('Required'),
    walletAddress: yup.string()
  })

export const commitmentIssuanceValidationSchema = yup
  .object()
  .shape<CommitmentIssuanceFormValues>({
    withdrawalAddress: yup
      .string()
      .test('address validity', 'Enter Valid Address', addressValidator)
      .required('Required'),
    releaseDate: yup.date().nullable().required('Required')
  })
