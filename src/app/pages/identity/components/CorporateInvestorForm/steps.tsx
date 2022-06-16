import React from 'react'
import { CorporateInformationForm } from 'app/pages/identity/components/CorporateInformationForm/CorporateInformationForm'
import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import {
  getCorporateInfoFormValues,
  getCorporateInvestorDeclarationFormValues,
  getCorporateInvestorTaxDeclarationFormValues,
  getDirectorsAndBeneficialOwnersFormValues
} from 'app/pages/identity/utils/corporate/forms'
import {
  getCorporateInfoRequestPayload,
  getCorporateInvestorDeclarationRequestPayload,
  getDirectorsAndBeneficialOwnerRequestPayload
} from 'app/pages/identity/utils/corporate/requests'
import { getTaxDeclarationRequestPayload } from '../../utils/individual/requests'
import { TaxDeclarationForm } from '../TaxDeclarationForm/TaxDeclarationForm'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import {
  corporateInvestorInfoSchema,
  corporateInvestorSchema,
  corporateInvestorStatusDeclarationSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema
} from 'app/pages/identity/validation/corporate'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export const getCorporateInvestorFormSteps = (type: CorporateType) => [
  {
    label:
      type === 'investor' ? 'Corporate Information' : 'Company Information',
    getFormValues: getCorporateInfoFormValues,
    getRequestPayload: getCorporateInfoRequestPayload,
    validationSchema: corporateInvestorInfoSchema,
    component: () => <CorporateInformationForm type={type} />,
    formId: 'information'
  },
  {
    label: 'Directors and Beneficial Owner Details',
    getFormValues: getDirectorsAndBeneficialOwnersFormValues,
    getRequestPayload: getDirectorsAndBeneficialOwnerRequestPayload,
    validationSchema: directorsAndBeneficialOwnersSchema,
    component: () => <DirectorsAndBeneficialOwnerDetails />,
    formId: 'ownder-details'
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
    label: 'Investor Declaration',
    getFormValues: getCorporateInvestorDeclarationFormValues,
    getRequestPayload: getCorporateInvestorDeclarationRequestPayload,
    validationSchema: corporateInvestorStatusDeclarationSchema,
    component: () => (
      <InvestorDeclarationForm
        identityType='corporate'
        corporateType='investor'
      />
    ),
    formId: 'investor-declaration'
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      return {
        ...getCorporateInfoFormValues(data),
        ...getCorporateInvestorTaxDeclarationFormValues(data),
        ...getDirectorsAndBeneficialOwnersFormValues(data)
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
