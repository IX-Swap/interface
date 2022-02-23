import * as yup from 'yup'

export const errorsSchema = yup.object().shape({
  firstName: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  middleName: yup.string().max(50, 'Too Long!'),
  lastName: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  dateOfBirth: yup.object().required('Required'),
  gender: yup.object().nullable().required('Required'),
  nationality: yup.object().nullable().required('Required'),
  citizenship: yup.object().nullable().required('Required'),
  phoneNumber: yup
    .string()
    .min(11, 'Must be valid phone number')
    .max(11, 'Must be valid phone number')
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  line1: yup.string().required('Required'),
  line2: yup.string().required('Required'),
  country: yup.object().nullable().required('Required'),
  city: yup.string().required('Required'),
  sourceOfFunds: yup.array().min(1, 'Choose one').required('Required'),
  otherFunds: yup.string().when('sourceOfFunds', {
    is: (sourceOfFunds: string[]) => sourceOfFunds.includes('Others'),
    then: yup.string().required('Required'),
    otherwise: yup.string(),
  }),
  accredited: yup.number(),
  isUSTaxPayer: yup.boolean(),
  usTin: yup.string().when('isUSTaxPayer', {
    is: true,
    then: yup.string().required('Required'),
    otherwise: yup.string(),
  }),
  occupation: yup.string().required('Required'),
  employmentStatus: yup.object().nullable().required('Required'),
  employer: yup.string().required('Required'),
  income: yup.object().nullable().required('Required'),
  proofOfIdentity: yup.mixed().nullable().required('Required'),
  proofOfAddress: yup.mixed().nullable().required('Required'),
  evidenceOfAccreditation: yup
    .mixed()
    .nullable()
    .when('accredited', {
      is: 1,
      then: yup.mixed().nullable().required('Required'),
      otherwise: yup.mixed().nullable(),
    }),
})
