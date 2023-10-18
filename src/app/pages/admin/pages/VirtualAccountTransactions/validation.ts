import * as yup from 'yup'
import { VirtualAccountTransactionFormValues } from 'types/virtualAccountTransaction'
import { validationMessages, emailSchema } from 'validation/shared'

export const WhitelistWalletAddressFormValidationSchema = yup
  .object()
  .shape<VirtualAccountTransactionFormValues>({
    accountId: yup.string().required(validationMessages.required),
    email: emailSchema.required(validationMessages.required),
    amount: yup.string().required(validationMessages.required),
    type: yup
      .string()
      .oneOf(['CREDIT', 'DEBIT'])
      .required(validationMessages.required),
    reference: yup.string().required(validationMessages.required),
    notes: yup.string()
  })
