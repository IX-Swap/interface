import * as yup from 'yup'
import { WhitelistWalletAddressFormValues } from 'types/whitelistWalletAddress'
import { validationMessages } from 'validation/shared'

export const WhitelistWalletAddressFormValidationSchema = yup
  .object()
  .shape<WhitelistWalletAddressFormValues>({
    address: yup.string().required(validationMessages.required),
    // userId: yup.string().required(validationMessages.required),
    assetId: yup.string().required(validationMessages.required),
    label: yup.string()
  })
