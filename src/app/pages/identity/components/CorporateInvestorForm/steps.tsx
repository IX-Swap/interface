import React from 'react'
import { CorporateInformationForm } from 'app/pages/identity/components/CorporateInformationForm/CorporateInformationForm'
import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import {
  getCorporateInfoFormValues,
  getDirectorsAndBeneficialOwnersFormValues,
  getCorporateInvestorTaxDeclarationFormValues
} from 'app/pages/identity/utils/corporate/forms'
import {
  getCorporateInfoRequestPayload,
  getDirectorsAndBeneficialOwnerRequestPayload
} from 'app/pages/identity/utils/corporate/requests'
import { getTaxDeclarationRequestPayload } from '../../utils/individual/requests'
import { TaxDeclarationForm } from '../TaxDeclarationForm/TaxDeclarationForm'
import {
  corporateInvestorInfoSchema,
  corporateInvestorSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema,
  initialCorporateInvestorInfoSchema
} from 'app/pages/identity/validation/corporate'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export const getCorporateInvestorFormSteps = (type: CorporateType) => [
  {
    label:
      type === 'corporate' ? 'Corporate Information' : 'Company Information',
    getFormValues: getCorporateInfoFormValues,
    getRequestPayload: getCorporateInfoRequestPayload,
    validationSchema: corporateInvestorInfoSchema,
    initialValidationSchema: initialCorporateInvestorInfoSchema,
    component: () => <CorporateInformationForm type={type} />,
    formId: 'information'
  },
  {
    label: 'Tax Declaration',
    getFormValues: getCorporateInvestorTaxDeclarationFormValues,
    getRequestPayload: getTaxDeclarationRequestPayload,
    validationSchema: corporateTaxDeclarationSchema,
    component: () => <TaxDeclarationForm identityType='corporate' />,
    formId: 'tax-declaration'
  },
  {
    label: 'Directors and Beneficial Owner Details',
    getFormValues: getDirectorsAndBeneficialOwnersFormValues,
    getRequestPayload: getDirectorsAndBeneficialOwnerRequestPayload,
    validationSchema: directorsAndBeneficialOwnersSchema,
    component: () => <DirectorsAndBeneficialOwnerDetails />,
    formId: 'owner-details'
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      return {
        ...getCorporateInfoFormValues(data),
        ...getDirectorsAndBeneficialOwnersFormValues(data),
        ...getCorporateInvestorTaxDeclarationFormValues(data)
      }
    },
    getRequestPayload: (data: any) => {
      return {
        ...getCorporateInfoRequestPayload(data),
        ...getDirectorsAndBeneficialOwnerRequestPayload(data),
        ...getTaxDeclarationRequestPayload(data)
      }
    },
    validationSchema: corporateInvestorSchema,
    component: () => <CorporateIdentityContainer />,
    formId: 'submit'
  }
]
