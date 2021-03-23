import React, { Fragment } from 'react'
import { CorporateInformationForm } from 'app/pages/_identity/components/CorporateInformationForm/CorporateInformationForm'
import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import {
  getCorporateInfoFormValues,
  getCorporateInvestorDocumentsFormValues,
  getCorporateInvestorTaxDeclarationFormValues,
  getDirectorsAndBeneficialOwnersFormValues
} from 'app/pages/_identity/utils/corporate/forms'
import {
  getCorporateInfoRequestPayload,
  getCorporateInvestorDocumentsRequestPayload,
  getDirectorsAndBeneficialOwnerRequestPayload
} from 'app/pages/_identity/utils/corporate/requests'
import { getTaxDeclarationRequestPayload } from '../../utils/individual/requests'
import { TaxDeclarationForm } from '../TaxDeclarationForm/TaxDeclarationForm'
import { CorporateUploadDocumentsForm } from '../UploadDocumentsForm/CorporateUploadDocumentsForm'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import {
  corporateInvestorInfoSchema,
  corporateIssuerDocumentsSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema
} from 'app/pages/_identity/validation/corporate'

export const corporateIssuerFormSteps = [
  {
    label: 'Corporate Information',
    getFormValues: getCorporateInfoFormValues,
    getRequestPayload: getCorporateInfoRequestPayload,
    validationSchema: corporateInvestorInfoSchema,
    component: () => (
      <Fragment>
        <CorporateInformationForm />
      </Fragment>
    )
  },
  {
    label: 'Directors and Beneficial Owner Details',
    getFormValues: getDirectorsAndBeneficialOwnersFormValues,
    getRequestPayload: getDirectorsAndBeneficialOwnerRequestPayload,
    validationSchema: directorsAndBeneficialOwnersSchema,
    component: () => (
      <Fragment>
        <DirectorsAndBeneficialOwnerDetails />
      </Fragment>
    )
  },
  {
    label: 'Tax Declaration',
    getFormValues: getCorporateInvestorTaxDeclarationFormValues,
    getRequestPayload: getTaxDeclarationRequestPayload,
    validationSchema: corporateTaxDeclarationSchema,
    component: () => (
      <Fragment>
        <TaxDeclarationForm identityType='corporate' />
      </Fragment>
    )
  },
  {
    label: 'Upload Documents',
    getFormValues: getCorporateInvestorDocumentsFormValues,
    getRequestPayload: getCorporateInvestorDocumentsRequestPayload,
    validationSchema: corporateIssuerDocumentsSchema,
    component: () => (
      <Fragment>
        <CorporateUploadDocumentsForm />
      </Fragment>
    )
  },
  {
    label: 'Review & Submit',
    getFormValues: () => null,
    getRequestPayload: {},
    validationSchema: {},
    component: () => (
      <Fragment>
        <CorporateIdentityView isCorporateIssuerForm />
      </Fragment>
    )
  }
]
