import * as yup from 'yup'
import { CommitmentFormValues } from 'v2/types/commitment'
import { DataroomFile } from 'v2/types/dataroomFile'

export const commitmentFormValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    pricePerUnit: yup.number().required(),
    totalAmount: yup.number().required(),
    numberOfUnits: yup.number().required(),
    otp: yup.string().required(),
    signedSubscriptionDocument: yup.object<DataroomFile>().required(),
    walletAddress: yup.string().required()
  })
