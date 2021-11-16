import { DataroomFile } from 'types/dataroomFile'
import { emailSchema, taxIdentificationNumberSchema } from 'validation/shared'
import * as yup from 'yup'
import 'yup-phone-lite'

export const issuerDetailsSchema = yup.object().shape<any>({
  fullName: yup.string().required('Required'),
  companyName: yup.string().required('Required'),
  companyRegistrationNumber: taxIdentificationNumberSchema.required(
    'This field is required'
  ),
  contactNumber: yup
    .string()
    .test('isValidPhone', 'Invalid phone number', value => {
      if (value !== undefined && value !== null && value.length > 0) {
        return yup.string().phone().isValidSync(value)
      }
      return true
    }),
  email: emailSchema.required('This field is required'),
  industry: yup.string().required('Required'),
  fundRaisingAmount: yup.number().required('Required'),
  detail: yup.string().required('Required')
})

export const issuerDocumentsSchema = yup.object().shape<any>({
  companyRelated: yup.array<DataroomFile>().required('Required'),
  issuanceRelated: yup.array<DataroomFile>().required('Required'),
  financial: yup.array<DataroomFile>().required('Required')
})
