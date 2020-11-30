import * as yup from 'yup'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'app/pages/identity/components/types'
import {
  addressSchema,
  dateSchema,
  documentsArraySchema,
  emailSchema,
  genderSchema,
  maritalStatusSchema,
  personalProfileArraySchema
} from 'validation/shared'
import {
  corporateDeclarationsSchema,
  individualDeclarationsSchema
} from 'validation/declarations'

export const individualIdentityFormValidationSchema = yup
  .object()
  .shape<IndividualIdentityFormValues>({
    photo: yup.string(),
    firstName: yup.string().required('Required'),
    middleName: yup.string(),
    lastName: yup.string().required('Required'),
    nationality: yup.string().required('Required'),
    maritalStatus: maritalStatusSchema.required('Required'),
    gender: genderSchema.required('Required'),
    dob: dateSchema.required('Required'),
    countryOfResidence: yup.string().required('Required'),
    contactNumber: yup.string().required('Required'),
    email: emailSchema.required('Required'),
    bankName: yup.string().required('Required'),
    bankAccountName: yup.string().required('Required'),
    bankAccountNumber: yup.string().required('Required'),
    employmentStatus: yup.string().required('Required'),
    occupation: yup.string().required('Required'),
    sourceOfWealth: yup.string().required('Required'),
    industryOfEmployment: yup.string().required('Required'),
    houseHoldIncome: yup.string().required('Required'),
    employer: yup.string().required('Required'),
    annualIncome: yup.string().required('Required'),
    documents: documentsArraySchema.required('Required'),
    declarations: individualDeclarationsSchema.required('Required'),
    address: addressSchema.required('Required')
  })

export const corporateIdentityFormValidationSchema = yup
  .object()
  .shape<CorporateIdentityFormValues>({
    logo: yup.string(),
    contactNumber: yup.string().required('Required'),
    registrationNumber: yup.string().required('Required'),
    dateOfIncorporation: dateSchema.required('Required'),
    countryOfFormation: yup.string().required('Required'),
    companyLegalName: yup.string().required('Required'),
    representatives: personalProfileArraySchema.required('Required'),
    directors: personalProfileArraySchema.required('Required'),
    beneficialOwners: personalProfileArraySchema.required('Required'),
    documents: documentsArraySchema.required('Required'),
    declarations: corporateDeclarationsSchema.required('Required'),
    companyAddress: addressSchema.required('Required'),
    email: emailSchema.required('Required')
  })
