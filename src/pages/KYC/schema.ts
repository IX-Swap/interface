import * as yup from 'yup'
import { legalEntityTypes } from './mock'

export const individualErrorsSchema = yup.object().shape({
  firstName: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  middleName: yup.string().max(50, 'Too Long!'),
  lastName: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  dateOfBirth: yup.object().nullable().required('Required'),
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
  accredited: yup.number().min(0).max(1),
  isUSTaxPayer: yup.number().min(0).max(1),
  usTin: yup.string().when('isUSTaxPayer', {
    is: 1,
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

export const corporateErrorsSchema = yup.object().shape({
  corporateName: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  typeOfLegalEntity: yup.object().nullable().required('Required'),
  registrationNumber: yup.string().min(1, 'Too short').max(50, 'Too Long!').required('Required'),
  countryOfIncorporation: yup.object().nullable().required('Required'),
  otherEntity: yup.string().when('typeOfLegalEntity', {
    is: (typeOfLegalEntity: any) => typeOfLegalEntity?.id === legalEntityTypes.length,
    then: yup.string().required('Required'),
    otherwise: yup.string(),
  }),
  businessActivity: yup.string().required('Required'),
  entityType: yup.object().nullable().required('Required'),
  incorporated: yup.boolean(),
  personnelName: yup.string().required('Required'),
  designation: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  phoneNumber: yup
    .string()
    .min(11, 'Must be valid phone number')
    .max(11, 'Must be valid phone number')
    .required('Required'),
  authorizationDocuments: yup.mixed().nullable().required('Required'),
  line1: yup.string().required('Required'),
  line2: yup.string().required('Required'),
  country: yup.object().nullable().required('Required'),
  city: yup.string().required('Required'),
  residentialAddressLine1: yup.string().required('Required'),
  residentialAddressLine2: yup.string().required('Required'),
  residentialAddressCountry: yup.object().nullable().required('Required'),
  residentialAddressCity: yup.string().required('Required'),
  sourceOfFunds: yup.array().min(1, 'Choose one').required('Required'),
  otherFunds: yup.string().when('sourceOfFunds', {
    is: (sourceOfFunds: string[]) => sourceOfFunds.includes('Others'),
    then: yup.string().required('Required'),
    otherwise: yup.string(),
  }),
  accredited: yup.number().min(0).max(1),
  isUSTaxPayer: yup.number().min(0).max(1),
  usTin: yup.string().when('isUSTaxPayer', {
    is: 1,
    then: yup.string().required('Required'),
    otherwise: yup.string(),
  }),
  taxCountry: yup.object().nullable().required('Required'),
  taxNumber: yup.string().required('Required'),
  beneficialOwners: yup
    .array()
    .of(
      yup.object().shape({
        fullName: yup.string().required('Required'),
        shareholding: yup.number().min(1, 'Min 1').max(100, 'Max 10').required('Required'),
        proofOfIdentity: yup.mixed().nullable().required('Required'),
        proofOfAddress: yup.mixed().nullable().required('Required'),
      })
    )
    .min(1, 'At least one beneficial owner')
    .required('Required'),
  corporateDocuments: yup.mixed().nullable().required('Required'),
  financialDocuments: yup.mixed().nullable().required('Required'),
  evidenceOfAccreditation: yup
    .mixed()
    .nullable()
    .when('accredited', {
      is: 1,
      then: yup.mixed().nullable().required('Required'),
      otherwise: yup.mixed().nullable(),
    }),
})
