import React from 'react'
import {
  getInvestorDeclarationFormValues,
  getDocumentsFormValues
} from 'app/pages/identity/utils/individual/forms'
import {
  getInvestorDeclarationRequestPayload,
  getDocumentsRequestPayload
} from 'app/pages/identity/utils/individual/requests'
import {
  individualInvestorStatusDeclarationSchema,
  individualAccreditationSchema
} from 'app/pages/identity/validation/individual'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { IndividualAccreditationContainer } from '../../containers/IndividualAccreditationContainer'

export const getIndividualAccreditationFormSteps = () => [
  {
    label: 'Investor Declaration',
    getFormValues: getInvestorDeclarationFormValues,
    getRequestPayload: getInvestorDeclarationRequestPayload,
    validationSchema: individualInvestorStatusDeclarationSchema,
    component: () => <InvestorDeclarationForm />
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => ({
      ...getInvestorDeclarationFormValues(data),
      ...getDocumentsFormValues(data)
    }),
    getRequestPayload: (data: any) => ({
      ...getInvestorDeclarationRequestPayload(data),
      ...getDocumentsRequestPayload(data)
    }),
    validationSchema: individualAccreditationSchema,
    component: () => <IndividualAccreditationContainer />
  }
]
