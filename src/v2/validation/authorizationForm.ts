import * as yup from 'yup'
import { AuthorizerFormValues } from 'v2/app/pages/authorizer/components/AuthorizerForm'

export const authorizationFormSchema = yup
  .object()
  .shape<AuthorizerFormValues>({
    sharedWithUser: yup.boolean(),
    comment: yup.string()
  })
