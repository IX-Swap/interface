import React from 'react'
import { getCorporateInvestorDeclarationFormValues } from 'app/pages/identity/utils/corporate/forms'
import { getCorporateInvestorDeclarationRequestPayload } from 'app/pages/identity/utils/corporate/requests'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import {
  corporateAccreditationSchema,
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
    ),
    formId: 'investor-declaration'
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      return {
        ...getCorporateInvestorDeclarationFormValues(data)
      }
    },
    getRequestPayload: (data: any) => {
      return {
        ...getCorporateInvestorDeclarationRequestPayload(data)
      }
    },
    validationSchema: corporateAccreditationSchema,
    component: () => <CorporateAccreditationContainer />,
    // formId: 'submit'
    formId: 'submit-accreditation'
  }
]
