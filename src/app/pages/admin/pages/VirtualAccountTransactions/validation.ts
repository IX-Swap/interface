import * as yup from 'yup'
import { VirtualAccountTransactionFormValues } from 'types/virtualAccountTransaction'
import { validationMessages, emailSchema } from 'validation/shared'

export const VirtualAccountTransactionFormValidationSchema = yup
  .object()
  .shape<VirtualAccountTransactionFormValues>({
    user: yup.string().required(validationMessages.required),
    accountId: yup.string().required(validationMessages.required),
    email: emailSchema.required(validationMessages.required),
    amount: yup.number().required(validationMessages.required),
    type: yup
      .string()
      .oneOf(['Credit', 'Debit'])
      .required(validationMessages.required),
    reference: yup.string().required(validationMessages.required)
  })
