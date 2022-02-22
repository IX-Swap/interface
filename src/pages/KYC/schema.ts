import * as yup from 'yup'

export const errorsSchema = yup.object().shape({
  firstName: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  middleName: yup.string().max(50, 'Too Long!'),
  lastName: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  birthDate: yup.object().required('Required'),
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
  funds: yup.array().min(1, 'Choose one').required('Required'),
  otherFunds: yup.string().when('funds', {
    is: (funds: string[]) => funds.includes('Others'),
    then: yup.string().required('Required'),
    otherwise: yup.string(),
  }),
  isAccreditedInvestor: yup.boolean(),
  exceedsOneMillion: yup.boolean(),
  isUSTaxPayer: yup.boolean(),
  taxId: yup.string().when('isUSTaxPayer', {
    is: true,
    then: yup.string().required('Required'),
    otherwise: yup.string(),
  }),
  occupation: yup.string().required('Required'),
  employmentStatus: yup.object().nullable().required('Required'),
  employer: yup.string().required('Required'),
  income12Month: yup.object().nullable().required('Required'),
  // proofIdentityFile: yup.object().nullable().required(),
  // proofAddressFile: yup.object().nullable().required(),
  // proofAccreditationFile: yup.object().nullable().when('isAccreditedInvestor', {
  //   is: true,
  //   then: yup.object().nullable().required(),
  //   otherwise: yup.object().nullable(),
  // }),
})
