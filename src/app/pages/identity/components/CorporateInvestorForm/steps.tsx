import React from 'react'
import { CorporateInformationForm } from 'app/pages/identity/components/CorporateInformationForm/CorporateInformationForm'
import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import {
  getCorporateInfoFormValues,
  getCorporateInvestorDeclarationFormValues,
  getCorporateInvestorDocumentsFormValues,
  getCorporateInvestorTaxDeclarationFormValues,
  getDirectorsAndBeneficialOwnersFormValues
} from 'app/pages/identity/utils/corporate/forms'
import {
  getCorporateInfoRequestPayload,
  getCorporateInvestorDeclarationRequestPayload,
  getCorporateInvestorDocumentsRequestPayload,
  getDirectorsAndBeneficialOwnerRequestPayload
} from 'app/pages/identity/utils/corporate/requests'
import { getTaxDeclarationRequestPayload } from '../../utils/individual/requests'
import { TaxDeclarationForm } from '../TaxDeclarationForm/TaxDeclarationForm'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { CorporateUploadDocumentsForm } from '../UploadDocumentsForm/CorporateUploadDocumentsForm'
import {
  corporateInvestorDocumentsSchema,
  corporateInvestorInfoSchema,
  corporateInvestorStatusDeclarationSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema
} from 'app/pages/identity/validation/corporate'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'

export const corporateInvestorFormSteps = [
  {
    label: 'Corporate Information',
    getFormValues: getCorporateInfoFormValues,
    getRequestPayload: getCorporateInfoRequestPayload,
    validationSchema: corporateInvestorInfoSchema,
    component: () => <CorporateInformationForm />
  },
  {
    label: 'Directors and Beneficial Owner Details',
    getFormValues: getDirectorsAndBeneficialOwnersFormValues,
    getRequestPayload: getDirectorsAndBeneficialOwnerRequestPayload,
    validationSchema: directorsAndBeneficialOwnersSchema,
    component: () => <DirectorsAndBeneficialOwnerDetails />
  },
  {
    label: 'Tax Declaration',
    getFormValues: getCorporateInvestorTaxDeclarationFormValues,
    getRequestPayload: getTaxDeclarationRequestPayload,
    validationSchema: corporateTaxDeclarationSchema,
    component: () => <TaxDeclarationForm identityType='corporate' />
  },
  {
    label: 'Investor Status Declaration',
    getFormValues: getCorporateInvestorDeclarationFormValues,
    getRequestPayload: getCorporateInvestorDeclarationRequestPayload,
    validationSchema: corporateInvestorStatusDeclarationSchema,
    component: () => <InvestorDeclarationForm identityType='corporate' />
  },
  {
    label: 'Upload Documents',
    getFormValues: getCorporateInvestorDocumentsFormValues,
    getRequestPayload: getCorporateInvestorDocumentsRequestPayload,
    validationSchema: corporateInvestorDocumentsSchema,
    component: () => <CorporateUploadDocumentsForm corporateType='investor' />
  },
  {
    label: 'Review & Submit',
    getFormValues: () => null,
    getRequestPayload: {},
    validationSchema: {},
    component: () => <CorporateIdentityContainer />
  }
]
