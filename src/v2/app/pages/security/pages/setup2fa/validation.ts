import * as yup from 'yup'
import { Enable2faFormValues } from 'v2/app/pages/security/pages/setup2fa/types'

export const enable2faFormValuesSchema = yup
  .object()
  .shape<Enable2faFormValues>({
    otp: yup.string().length(6).required('Required')
  })
