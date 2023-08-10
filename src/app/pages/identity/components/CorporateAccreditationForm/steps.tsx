import React from 'react'
import { getCorporateInvestorDeclarationFormValues } from 'app/pages/identity/utils/corporate/forms'
import { getCorporateInvestorDeclarationRequestPayload } from 'app/pages/identity/utils/corporate/requests'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import {
  //   corporateAccreditationSchema,
  corporateInvestorStatusDeclarationSchema
} from 'app/pages/identity/validation/corporate'
import { CorporateAccreditationContainer } from 'app/pages/identity/containers/CorporateAccreditationContainer'

export const getCorporateAccreditationFormSteps = () => [
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
    )
  },
  {
    label: 'Review & Submit',
    getFormValues: getCorporateInvestorDeclarationFormValues,
    getRequestPayload: getCorporateInvestorDeclarationRequestPayload,
    validationSchema: corporateInvestorStatusDeclarationSchema,
    // validationSchema: corporateAccreditationSchema,
    component: () => <CorporateAccreditationContainer />
  }
]
