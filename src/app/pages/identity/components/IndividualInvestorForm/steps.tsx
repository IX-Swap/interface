import React, { Fragment } from 'react'
import { VSpacer } from 'components/VSpacer'
import { Typography } from '@mui/material'

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
import { individualInvestorValidationSchema } from 'app/pages/identity/validation/individual'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import { IndividualUploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'

export const individualInvestorFormSteps = [
  {
    label: 'Personal Information',
    getFormValues: getPersonalInfoFormValues,
    getRequestPayload: getPersonalInfoRequestPayload,
    component: () => (
      <Fragment>
        <FormSectionHeader title={'Personal Information'} />
        <IndividualInfoFields />
        <VSpacer size='large' />
        <FormSectionHeader title={'Address'} />
        <Typography variant='subtitle2' color='textSecondary'>
          Please provide your current address
        </Typography>
        <VSpacer size='medium' />
        <AddressFields />
      </Fragment>
    )
  },
  {
    label: 'Financial Information',
    getFormValues: getFinancialInfoFormValues,
    getRequestPayload: getFinancialInfoRequestPayload,
    component: () => (
      <Fragment>
        <FinancialInformationForm />
      </Fragment>
    )
  },
  {
    label: 'Tax Declaration',
    getFormValues: getTaxDeclarationFormValues,
    getRequestPayload: getTaxDeclarationRequestPayload,
    component: () => (
      <Fragment>
        <TaxDeclarationForm />
      </Fragment>
    )
  },
  {
    label: 'Investor Status Declaration',
    getFormValues: getInvestorDeclarationFormValues,
    getRequestPayload: getInvestorDeclarationRequestPayload,
    component: () => (
      <Fragment>
        <InvestorDeclarationForm />
      </Fragment>
    )
  },
  {
    label: 'Upload Documents',
    getFormValues: getDocumentsFormValues,
    getRequestPayload: getDocumentsRequestPayload,
    component: () => (
      <Fragment>
        <FormSectionHeader title={'Upload Documents'} />
        <Typography
          variant='subtitle2'
          color='textSecondary'
          style={{ marginTop: -30, fontSize: 16 }}
        >
          Please upload the following documents. All account statements and
          documents should be dated within 3 months.
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          Notes: Type of document format supported is jpg, jpeg, png, gif, tiff,
          webp, svg, apng, avif, jfif, pjpeg, pjp, docx, xlsx, pdf, and odt.
        </Typography>
        <VSpacer size='medium' />
        <IndividualUploadDocumentsForm />
      </Fragment>
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
