import React from 'react'
import { Grid } from '@mui/material'
import {
  getPersonalInfoFormValues,
  getFinancialInfoFormValues
} from 'app/pages/identity/utils/individual/forms'
import {
  getPersonalInfoRequestPayload,
  getFinancialAndTaxDeclarationRequestPayload
} from 'app/pages/identity/utils/individual/requests'
import {
  personalInfoSchema,
  financialAndTaxDeclarationSchema,
  individualInvestorValidationSchema
} from 'app/pages/identity/validation/individual'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { IndividualAddressFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualAddressFields'
import { FinancialInformationForm } from '../FinancialInformationForm/FinancialInformationForm'
import { TaxDeclarationForm } from '../TaxDeclarationForm/TaxDeclarationForm'
import { UsCitizenshipConfirmation } from '../TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'

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
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      const allData = {
        ...getPersonalInfoFormValues(data),
        ...getFinancialInfoFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      return {
        ...getPersonalInfoRequestPayload(data),
        ...getFinancialAndTaxDeclarationRequestPayload(data)
      }
    },
    validationSchema: individualInvestorValidationSchema,
    component: () => <IndividualIdentityContainer />
  }
]
