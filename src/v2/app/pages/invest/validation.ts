import * as yup from 'yup'
import { CommitmentFormValues } from 'v2/types/commitment'
import { DataroomFile } from 'v2/types/dataroomFile'

export const commitmentFormValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    pricePerUnit: yup.number().required('Required'),
    totalAmount: yup.number().required('Required'),
    numberOfUnits: yup.number().required('Required'),
    otp: yup.string().required('Required'),
    signedSubscriptionDocument: yup.object<DataroomFile>().required('Required'),
    walletAddress: yup.string().required('Required')
  })
