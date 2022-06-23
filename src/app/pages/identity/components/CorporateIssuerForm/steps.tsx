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
import {
  corporateInvestorInfoSchema,
  corporateInvestorSchema,
  corporateInvestorStatusDeclarationSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema
} from 'app/pages/identity/validation/corporate'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { InvestorDeclarationForm } from 'app/pages/identity/components/InvestorDeclarationForm/InvestorDeclarationForm'

export const corporateIssuerFormSteps = [
  {
    label: 'Corporate Information',
    getFormValues: getCorporateInfoFormValues,
    getRequestPayload: getCorporateInfoRequestPayload,
    validationSchema: corporateInvestorInfoSchema,
    component: () => <CorporateInformationForm />
  },
  {
    label: 'Directors and Beneficial Owner Details',
    getFormValues: getDirectorsAndBeneficialOwnersFormValues,
    getRequestPayload: getDirectorsAndBeneficialOwnerRequestPayload,
    validationSchema: directorsAndBeneficialOwnersSchema,
    component: () => <DirectorsAndBeneficialOwnerDetails />
  },
  {
    label: 'Tax Declaration',
    getFormValues: getCorporateInvestorTaxDeclarationFormValues,
    getRequestPayload: getTaxDeclarationRequestPayload,
    validationSchema: corporateTaxDeclarationSchema,
    component: () => <TaxDeclarationForm identityType='corporate' />
  },
  {
    label: 'Investor Declaration',
    getFormValues: getCorporateInvestorDeclarationFormValues,
    getRequestPayload: getCorporateInvestorDeclarationRequestPayload,
    validationSchema: corporateInvestorStatusDeclarationSchema,
    component: () => (
      <InvestorDeclarationForm
        identityType='corporate'
        corporateType='issuer'
      />
    ),
    formId: 'investor-declaration'
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      const allData = {
        ...getCorporateInfoFormValues(data),
        ...getCorporateInvestorTaxDeclarationFormValues(data),
        ...getDirectorsAndBeneficialOwnersFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      const allData = {
        ...getCorporateInfoRequestPayload(data),
        ...getDirectorsAndBeneficialOwnerRequestPayload(data),
        ...getTaxDeclarationRequestPayload(data)
      }
      return allData
    },
    validationSchema: corporateInvestorSchema,
    component: () => <CorporateIdentityContainer />
  }
]
