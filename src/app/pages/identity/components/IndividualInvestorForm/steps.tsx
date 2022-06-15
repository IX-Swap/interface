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
import {
  financialInfoSchema,
  individualInvestorDocumentsSchema,
  individualInvestorStatusDeclarationSchema,
  personalInfoSchema,
  taxDeclarationSchema
} from 'app/pages/identity/validation/individual'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import { IndividualUploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { IndividualAddressFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualAddressFields'

export const individualInvestorFormSteps = [
  {
    label: 'Personal Information',
    getFormValues: getPersonalInfoFormValues,
    getRequestPayload: getPersonalInfoRequestPayload,
    validationSchema: personalInfoSchema,
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
        <IndividualAddressFields />
      </Fragment>
    )
  },
  {
    label: 'Financial Information',
    getFormValues: getFinancialInfoFormValues,
    getRequestPayload: getFinancialInfoRequestPayload,
    validationSchema: financialInfoSchema,
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
    validationSchema: taxDeclarationSchema,
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
    validationSchema: individualInvestorStatusDeclarationSchema,
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
    validationSchema: individualInvestorDocumentsSchema,
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
    getFormValues: () => {},
    getRequestPayload: () => {},
    validationSchema: null,
    component: () => <IndividualIdentityContainer />
  }
]
