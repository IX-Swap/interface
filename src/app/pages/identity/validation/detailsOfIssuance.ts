import { DataroomFile } from 'types/dataroomFile'
import {
  emailSchema,
  taxIdentificationNumberSchema,
  validationMessages
} from 'validation/shared'
import * as yup from 'yup'
import 'yup-phone-lite'

export const issuerDetailsSchema = yup.object().shape<any>({
  fullName: yup.string().required(validationMessages.required),
  companyName: yup.string().required(validationMessages.required),
  companyRegistrationNumber: taxIdentificationNumberSchema.required(
    validationMessages.required
  ),
  contactNumber: yup
    .string()
    .test('isValidPhone', 'Invalid phone number', value => {
      if (value !== undefined && value !== null && value.length > 0) {
        return yup.string().phone().isValidSync(value)
      }
      return true
    }),
  email: emailSchema.required(validationMessages.required),
  industry: yup.string().required(validationMessages.required),
  fundRaisingAmount: yup.number().required(validationMessages.required),
  detail: yup.string().required(validationMessages.required)
})

export const issuerDocumentsSchema = yup.object().shape<any>({
  companyRelated: yup
    .array<DataroomFile>()
    .required(validationMessages.required),
  issuanceRelated: yup
    .array<DataroomFile>()
    .required(validationMessages.required),
  financial: yup.array<DataroomFile>().required(validationMessages.required)
})
