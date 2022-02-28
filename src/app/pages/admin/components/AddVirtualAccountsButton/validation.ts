import { AddVirtualAccountsFormValues } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsForm'
import { validationMessages } from 'validation/shared'
import * as yup from 'yup'

const accountNumberValidation = yup
  .string()
  .length(12, 'Must be 12 characters long')
  .required(validationMessages.required)

export const addVirtualAccountsValidationSchema = yup
  .object()
  .shape<AddVirtualAccountsFormValues>({
    from: accountNumberValidation,
    to: accountNumberValidation,
    currency: yup
      .string()
      .oneOf(['SGD', 'USD'])
      .required(validationMessages.required)
  })
