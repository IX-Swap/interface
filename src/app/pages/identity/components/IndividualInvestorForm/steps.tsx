import React from 'react'
import { Grid, Paper } from '@mui/material'
import {
  getDocumentsFormValues,
  getFinancialInfoFormValues,
  getInvestorDeclarationFormValues,
  getPersonalInfoFormValues,
  getTaxDeclarationFormValues
} from 'app/pages/identity/utils/individual/forms'
import {
  getDocumentsRequestPayload,
  getFinancialInfoRequestPayload,
  getInvestorDeclarationRequestPayload,
  getPersonalInfoRequestPayload,
  getTaxDeclarationRequestPayload
} from 'app/pages/identity/utils/individual/requests'
import {
  individualInvestorValidationSchema,
  financialInfoSchema,
  individualInvestorStatusDeclarationSchema,
  personalInfoSchema
} from 'app/pages/identity/validation/individual'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import { IndividualUploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'

export const individualInvestorFormSteps = [
  {
    label: 'Personal Information',
    getFormValues: getPersonalInfoFormValues,
    getRequestPayload: getPersonalInfoRequestPayload,
    validationSchema: personalInfoSchema,
    component: () => (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2, p: 4 }}>
            <FormSectionHeader title={'Personal Information'} />
            <IndividualInfoFields />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2, p: 4 }}>
            <FormSectionHeader title={'Address'} />
            <AddressFields />
          </Paper>
        </Grid>
      </Grid>
    )
  },
  {
    label: 'Financial and Tax Information',
    getFormValues: getFinancialInfoFormValues,
    getRequestPayload: getFinancialInfoRequestPayload,
    validationSchema: financialInfoSchema,
    component: () => (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2, p: 5 }}>
            <FinancialInformationForm />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TaxDeclarationForm />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2, p: 5 }}>
            <UsCitizenshipConfirmation />
          </Paper>
        </Grid>
      </Grid>
    )
  },
  {
    label: 'Investor Declaration',
    getFormValues: getInvestorDeclarationFormValues,
    getRequestPayload: getInvestorDeclarationRequestPayload,
    validationSchema: individualInvestorStatusDeclarationSchema,
    component: () => (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InvestorDeclarationForm />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ borderRadius: 2, p: 5 }}>
            <IndividualUploadDocumentsForm />
          </Paper>
        </Grid>
      </Grid>
    )
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      const allData = {
        ...getDocumentsFormValues(data),
        ...getFinancialInfoFormValues(data),
        ...getInvestorDeclarationFormValues(data),
        ...getPersonalInfoFormValues(data),
        ...getTaxDeclarationFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      return {
        ...getDocumentsRequestPayload(data),
        ...getFinancialInfoRequestPayload(data),
        ...getInvestorDeclarationRequestPayload(data),
        ...getPersonalInfoRequestPayload(data),
        ...getTaxDeclarationRequestPayload(data)
      }
    },
    validationSchema: individualInvestorValidationSchema,
    component: () => <IndividualIdentityContainer />
  }
]
