import React from 'react'
import { Grid } from '@mui/material'
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
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { IndividualUploadDocumentsForm } from '../UploadDocumentsForm/IndividualUploadDocumentsForm'
import { IndividualAccreditationContainer } from '../../containers/IndividualAccreditationContainer'

export const getIndividualAccreditationFormSteps = () => [
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
        ...getInvestorDeclarationFormValues(data),
        ...getDocumentsFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      return {
        ...getInvestorDeclarationRequestPayload(data),
        ...getDocumentsRequestPayload(data)
      }
    },
    validationSchema: individualAccreditationSchema,
    component: () => <IndividualAccreditationContainer />
  }
]
