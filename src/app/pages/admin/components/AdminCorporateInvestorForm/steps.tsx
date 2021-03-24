import React, { Fragment } from 'react'
import { CorporateInformationForm } from 'app/pages/_identity/components/CorporateInformationForm/CorporateInformationForm'
import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import {
  getCorporateInfoFormValues,
  getCorporateInvestorDeclarationFormValues,
  getCorporateInvestorDocumentsFormValues,
  getCorporateInvestorTaxDeclarationFormValues,
  getDirectorsAndBeneficialOwnersFormValues
} from 'app/pages/_identity/utils/corporate/forms'
import {
  getCorporateInfoRequestPayload,
  getCorporateInvestorDeclarationRequestPayload,
  getCorporateInvestorDocumentsRequestPayload,
  getDirectorsAndBeneficialOwnerRequestPayload
} from 'app/pages/_identity/utils/corporate/requests'
import { getTaxDeclarationRequestPayload } from 'app/pages/_identity/utils/individual/requests'
import { TaxDeclarationForm } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationForm'
import { InvestorDeclarationForm } from 'app/pages/_identity/components/InvestorDeclarationForm/InvestorDeclarationForm'
import { CorporateUploadDocumentsForm } from 'app/pages/_identity/components/UploadDocumentsForm/CorporateUploadDocumentsForm'
import {
  corporateInvestorDocumentsSchema,
  corporateInvestorInfoSchema,
  corporateInvestorStatusDeclarationSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema
} from 'app/pages/_identity/validation/corporate'
import { AdminCorporateIdentityView } from 'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateIdentityView'

export const adminCorporateInvestorFormSteps = [
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
    label: 'Investor Status Declaration',
    getFormValues: getCorporateInvestorDeclarationFormValues,
    getRequestPayload: getCorporateInvestorDeclarationRequestPayload,
    validationSchema: corporateInvestorStatusDeclarationSchema,
    component: () => (
      <Fragment>
        <InvestorDeclarationForm identityType='corporate' />
      </Fragment>
    )
  },
  {
    label: 'Upload Documents',
    getFormValues: getCorporateInvestorDocumentsFormValues,
    getRequestPayload: getCorporateInvestorDocumentsRequestPayload,
    validationSchema: corporateInvestorDocumentsSchema,
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
        <AdminCorporateIdentityView />
      </Fragment>
    )
  }
]
