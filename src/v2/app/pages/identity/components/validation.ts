import * as yup from 'yup'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'v2/app/pages/identity/components/types'
import {
  Declaration,
  IdentityAddress,
  IdentityProfile
} from 'v2/types/identity'
import { DataroomFile, FormArrayElement } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'

export const individualIdentityFormValidationSchema = yup
  .object()
  .shape<IndividualIdentityFormValues>({
    photo: yup.string().required('Required'),
    firstName: yup.string().required('Required'),
    middleName: yup.string(),
    lastName: yup.string().required('Required'),
    nationality: yup.string().required('Required'),
    maritalStatus: yup
      .mixed()
      .oneOf<IdentityProfile['maritalStatus']>(['Single', 'Married'])
      .required('Required'),
    gender: yup
      .mixed()
      .oneOf<IdentityProfile['gender']>(['M', 'F'])
      .required('Required'),
    dob: yup.string().required('Required'),
    countryOfResidence: yup.string().required('Required'),
    contactNumber: yup.string().required('Required'),
    email: yup.string().required('Required'),

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
    toArrangeCustody: yup.boolean().required('Required'),
    walletAddress: yup.string().required('Required'),
    documents: yup
      .array<FormArrayElement<Maybe<DataroomFile>>>()
      .required('Required'),
    declarations: yup
      .array<FormArrayElement<Declaration>>()
      .required('Required'),
    address: yup
      .object()
      .shape<IdentityAddress>({
        city: yup.string().required('Required'),
        country: yup.string().required('Required'),
        line1: yup.string().required('Required'),
        line2: yup.string(),
        postalCode: yup.string().required('Required'),
        state: yup.string()
      })
      .required('Required')
  })

export const corporateIdentityFormValidationSchema = yup
  .object()
  .shape<CorporateIdentityFormValues>({
    logo: yup.string().required('Required'),
    representatives: yup.array<IdentityProfile>().required('Required'),
    directors: yup.array<IdentityProfile>().required('Required'),
    beneficialOwners: yup.array<IdentityProfile>().required('Required'),
    documents: yup
      .array<FormArrayElement<Maybe<DataroomFile>>>()
      .required('Required'),
    declarations: yup
      .array<FormArrayElement<Declaration>>()
      .required('Required'),
    companyAddress: yup
      .object()
      .shape<IdentityAddress>({
        city: yup.string().required('City is required'),
        country: yup.string().required('Country is required'),
        line1: yup.string().required('Address line 1 is required'),
        line2: yup.string().required('Required'),
        postalCode: yup.string().required('Postal Code is required'),
        state: yup.string().required('State is required')
      })
      .required('Required'),
    registrationNumber: yup.string().required('Required'),
    dateOfIncorporation: yup.string().required('Required'),
    countryOfFormation: yup.string().required('Required'),
    companyLegalName: yup.string().required('Required'),
    walletAddress: yup.string().required('Required'),
    toArrangeCustody: yup.boolean().required('Required'),
    email: yup.string().email().required('Required'),
    contactNumber: yup.string().required('Required')
  })
