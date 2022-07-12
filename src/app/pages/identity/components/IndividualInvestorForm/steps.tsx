import React from 'react'
import { Grid } from '@mui/material'
import {
  getDocumentsFormValues,
  getInvestorDeclarationFormValues,
  getPersonalInfoFormValues,
  getFinancialInfoFormValues
} from 'app/pages/identity/utils/individual/forms'
import {
  getDocumentsRequestPayload,
  getInvestorDeclarationRequestPayload,
  getPersonalInfoRequestPayload,
  getFinancialAndTaxDeclarationRequestPayload
} from 'app/pages/identity/utils/individual/requests'
import {
  individualInvestorValidationSchema,
  individualInvestorStatusDeclarationSchema,
  personalInfoSchema,
  financialAndTaxDeclarationSchema
} from 'app/pages/identity/validation/individual'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import { IndividualUploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { IndividualAddressFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualAddressFields'
import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'

export const individualInvestorFormSteps = [
  {
    label: 'Personal Information',
    getFormValues: getPersonalInfoFormValues,
    getRequestPayload: getPersonalInfoRequestPayload,
    validationSchema: personalInfoSchema,
    component: () => (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FieldContainer>
              <Grid container spacing={5} direction={'column'}>
                <Grid item>
                  <FormSectionHeader title={'Personal Information'} />
                </Grid>
                <Grid item>
                  <IndividualInfoFields />
                </Grid>
              </Grid>
            </FieldContainer>
          </Grid>
          <Grid item xs={12}>
            <FieldContainer>
              <Grid container spacing={5} direction={'column'}>
                <Grid item>
                  <FormSectionHeader title={'Address'} />
                </Grid>
                <Grid item>
                  <IndividualAddressFields />
                </Grid>
              </Grid>
            </FieldContainer>
          </Grid>
        </Grid>
        <ValidateOnMount />
      </>
    )
  },
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
        ...getPersonalInfoFormValues(data),
        ...getFinancialInfoFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      return {
        ...getDocumentsRequestPayload(data),
        ...getInvestorDeclarationRequestPayload(data),
        ...getPersonalInfoRequestPayload(data),
        ...getFinancialAndTaxDeclarationRequestPayload(data)
      }
    },
    validationSchema: individualInvestorValidationSchema,
    component: () => <IndividualIdentityContainer />
  }
]
