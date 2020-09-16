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
import { DocumentWithGuide } from 'v2/types/document'

export const individualIdentityFormValidationSchema = yup
  .object()
  .shape<IndividualIdentityFormValues>({
    firstName: yup.string().required(),
    middleName: yup.string().required(),
    lastName: yup.string().required(),
    nationality: yup.string().required(),
    maritalStatus: yup
      .mixed()
      .oneOf<IdentityProfile['maritalStatus']>(['Single', 'Married'])
      .required(),
    gender: yup
      .mixed()
      .oneOf<IdentityProfile['gender']>(['M', 'F'])
      .required(),
    dob: yup.string().required(),
    countryOfResidence: yup.string().required(),
    contactNumber: yup.string().required(),
    email: yup.string().required(),

    bankName: yup.string().required(),
    bankAccountName: yup.string().required(),
    bankAccountNumber: yup.string().required(),
    employmentStatus: yup.string().required(),
    occupation: yup.string().required(),
    sourceOfWealth: yup.string().required(),
    industryOfEmployment: yup.string().required(),
    houseHoldIncome: yup.string().required(),
    employer: yup.string().required(),
    annualIncome: yup.string().required(),
    toArrangeCustody: yup.boolean().required(),
    walletAddress: yup.string().required(),
    // politicallyExposed: yup.boolean().required(),

    documents: yup.array<DocumentWithGuide>().required(),
    declarations: yup.array<Declaration>().required(),

    address: yup
      .object()
      .shape<IdentityAddress>({
        city: yup.string().required('City is required'),
        country: yup.string().required('Country is required'),
        line1: yup.string().required('Address line 1 is required'),
        line2: yup.string().required(),
        postalCode: yup.string().required('Postal Code is required'),
        state: yup.string().required('State is required')
        // countryOfResidence: yup.string().required('Country is required')
      })
      .required()
  })

export const corporateIdentityFormValidationSchema = yup
  .object()
  .shape<CorporateIdentityFormValues>({
    representatives: yup.array<IdentityProfile>().required(),
    directors: yup.array<IdentityProfile>().required(),
    beneficialOwners: yup.array<IdentityProfile>().required(),
    documents: yup.array<DocumentWithGuide>().required(),
    declarations: yup.array<Declaration>().required(),
    companyAddress: yup
      .object()
      .shape<IdentityAddress>({
        city: yup.string().required('City is required'),
        country: yup.string().required('Country is required'),
        line1: yup.string().required('Address line 1 is required'),
        line2: yup.string().required(),
        postalCode: yup.string().required('Postal Code is required'),
        state: yup.string().required('State is required')
        // countryOfResidence: yup.string().required('Country is required')
      })
      .required(),
    registrationNumber: yup.string().required(),
    dateOfIncorporation: yup.string().required(),
    countryOfFormation: yup.string().required(),
    companyLegalName: yup.string().required(),
    walletAddress: yup.string().required(),
    toArrangeCustody: yup.boolean().required()
  })
