import * as yup from 'yup'
import { DataroomFile } from 'types/dataroomFile'
import {
  CommitmentFormValues,
  CommitmentIssuanceFormValues
} from 'types/commitment'
import { validationMessages } from 'validation/shared'
import { CreateOTCOrderArgs } from 'types/otcOrder'

export const commitmentFormValidationSchema = {
  pricePerUnit: yup.number().required(validationMessages.required),
  totalAmount: yup.number(),
  numberOfUnits: yup.number().required(validationMessages.required),
  otp: yup.string().required(validationMessages.required),
  withdrawalAddress: yup.string().required('Withdrawal address is required')
}

export const commitmentCampaignValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    tnc: yup.boolean().oneOf([true], 'Please agree to the terms'),
    ...commitmentFormValidationSchema
  })

export const commitmentNonCampaignValidationSchema = yup
  .object()
  .shape<CommitmentFormValues>({
    signedSubscriptionDocument: yup.object<DataroomFile>(),
    ...commitmentFormValidationSchema
  })

export const commitmentIssuanceValidationSchema = yup
  .object()
  .shape<CommitmentIssuanceFormValues>({
    withdrawalAddress: yup.string().required(validationMessages.required),
    releaseDate: yup.date().nullable()
  })

export const validateOTCOrder = (values: CreateOTCOrderArgs) => {
  let message = ''

  // * Uncomment to disallow decimals in quanity
  //   if (!Number.isInteger(values.amount)) {
  //     message = 'Floating point quantity is not allowed'
  //   }

  if (values.amount <= 0 || values.price <= 0) {
    message = 'Quantity and price must be greater than 0'
  }
  return message
}
