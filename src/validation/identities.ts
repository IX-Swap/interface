import * as yup from 'yup'
import 'yup-phone'
import {
  CorporateIdentityFormValues,
  IndividualIdentityFormValues
} from 'app/pages/identity/components/types'
import {
  addressSchema,
  dateSchema,
  documentsArraySchema,
  emailSchema,
  personnelArraySchema,
  taxResidenciesArraySchema
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
    dob: dateSchema.required('Required'),
    // TODO Remove this after complete all phase2 in PersonalIdentity page
    countryOfResidence: yup.string().required('Required'),
    contactNumber: yup.string().phone().required('Required'),
    email: emailSchema.required('Required'),
    employmentStatus: yup.string().required('Required'),
    occupation: yup.string().required('Required'),
    sourceOfWealth: yup.string().required('Required'),
    employer: yup.string().required('Required'),
    annualIncome: yup.string().required('Required'),
    documents: documentsArraySchema.required('Required'),
    declarations: individualDeclarationsSchema.required('Required'),
    address: addressSchema.required('Required'),
    investorAgreement: yup.boolean().required('Required'),
    custodyAgreement: yup.boolean().required('Required'),
    disclosures: yup.boolean().required('Required')
  })

export const corporateIdentityFormValidationSchema = yup
  .object()
  .shape<CorporateIdentityFormValues>({
    logo: yup.string(),
    legalEntityStatus: yup.string().required('Required'),
    contactNumber: yup.string().required('Required'),
    registrationNumber: yup.string().required('Required'),
    companyLegalName: yup.string().required('Required'),
    countryOfFormation: yup.string().required(),
    representatives: personnelArraySchema.required('Required'),
    directors: personnelArraySchema.required('Required'),
    beneficialOwners: personnelArraySchema.required('Required'),
    documents: documentsArraySchema.required('Required'),
    declarations: corporateDeclarationsSchema.required('Required'),
    companyAddress: addressSchema.required('Required'),
    email: emailSchema.required('Required'),
    taxResidencies: taxResidenciesArraySchema.required('Required'),
    mailingAddress: addressSchema.required('Required')
  })
