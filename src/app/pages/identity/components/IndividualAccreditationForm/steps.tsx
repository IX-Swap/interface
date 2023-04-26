import React from 'react'
import { Grid } from '@mui/material'
import {
  getDocumentsFormValues,
  getFinancialInfoFormValues,
  getInvestorDeclarationFormValues
} from 'app/pages/identity/utils/individual/forms'
import {
  getDocumentsRequestPayload,
  getFinancialAndTaxDeclarationRequestPayload,
  getInvestorDeclarationRequestPayload
} from 'app/pages/identity/utils/individual/requests'
import {
  financialAndTaxDeclarationSchema,
  individualAccreditationSchema,
  individualInvestorStatusDeclarationSchema
} from 'app/pages/identity/validation/individual'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { FinancialInformationForm } from '../FinancialInformationForm/FinancialInformationForm'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { TaxDeclarationForm } from '../TaxDeclarationForm/TaxDeclarationForm'
import { UsCitizenshipConfirmation } from '../TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { IndividualUploadDocumentsForm } from '../UploadDocumentsForm/IndividualUploadDocumentsForm'
import { IndividualAccreditationContainer } from '../../containers/IndividualAccreditationContainer'

export const getIndividualAccreditationFormSteps = () => [
  {
    label: 'Financial and Tax Information',
    getFormValues: getFinancialInfoFormValues,
    getRequestPayload: getFinancialAndTaxDeclarationRequestPayload,
    validationSchema: financialAndTaxDeclarationSchema,
    component: () => (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FinancialInformationForm />
          </Grid>
          <Grid item xs={12}>
            <TaxDeclarationForm />
          </Grid>
          <Grid item xs={12}>
            <FieldContainer>
              <UsCitizenshipConfirmation />
            </FieldContainer>
          </Grid>
        </Grid>
        <ValidateOnMount />
      </>
    )
  },
  {
    label: 'Investor Declaration',
    getFormValues: getInvestorDeclarationFormValues,
    getRequestPayload: getInvestorDeclarationRequestPayload,
    validationSchema: individualInvestorStatusDeclarationSchema,
    component: () => (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InvestorDeclarationForm />
          </Grid>
          <Grid item xs={12}>
            <FieldContainer>
              <IndividualUploadDocumentsForm />
            </FieldContainer>
          </Grid>
        </Grid>
        <ValidateOnMount />
      </>
    )
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      const allData = {
        ...getDocumentsFormValues(data),
        ...getInvestorDeclarationFormValues(data),
        // ...getPersonalInfoFormValues(data),
        ...getFinancialInfoFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      return {
        ...getDocumentsRequestPayload(data),
        ...getInvestorDeclarationRequestPayload(data),
        // ...getPersonalInfoRequestPayload(data),
        ...getFinancialAndTaxDeclarationRequestPayload(data)
      }
    },
    validationSchema: individualAccreditationSchema,
    component: () => <IndividualAccreditationContainer />
  }
]
