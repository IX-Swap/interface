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
  corporateInvestorSchema,
  corporateInvestorStatusDeclarationSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema
} from 'app/pages/identity/validation/corporate'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateType } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'

export const getCorporateInvestorFormSteps = (type: CorporateType) => [
  {
    label:
      type === 'investor' ? 'Corporate Information' : 'Company Information',
    getFormValues: getCorporateInfoFormValues,
    getRequestPayload: getCorporateInfoRequestPayload,
    validationSchema: corporateInvestorInfoSchema,
    component: () => <CorporateInformationForm type={type} />,
    formId: 'information'
  },
  {
    label: 'Directors and Beneficial Owner Details',
    getFormValues: getDirectorsAndBeneficialOwnersFormValues,
    getRequestPayload: getDirectorsAndBeneficialOwnerRequestPayload,
    validationSchema: directorsAndBeneficialOwnersSchema,
    component: () => <DirectorsAndBeneficialOwnerDetails />,
    formId: 'ownder-details'
  },
  {
    label: 'Tax Declaration',
    getFormValues: getCorporateInvestorTaxDeclarationFormValues,
    getRequestPayload: getTaxDeclarationRequestPayload,
    validationSchema: corporateTaxDeclarationSchema,
    component: () => <TaxDeclarationForm identityType='corporate' />,
    formId: 'tax-declaration'
  },
  {
    label: 'Investor Status Declaration',
    getFormValues: getCorporateInvestorDeclarationFormValues,
    getRequestPayload: getCorporateInvestorDeclarationRequestPayload,
    validationSchema: corporateInvestorStatusDeclarationSchema,
    component: () => <InvestorDeclarationForm identityType='corporate' />,
    formId: 'status-declaration'
  },
  {
    label: 'Upload Documents',
    getFormValues: getCorporateInvestorDocumentsFormValues,
    getRequestPayload: getCorporateInvestorDocumentsRequestPayload,
    validationSchema: corporateInvestorDocumentsSchema,
    component: () => <CorporateUploadDocumentsForm corporateType='investor' />,
    formId: 'documents'
  },
  {
    label: 'Review & Submit',
    getFormValues: (data: any) => {
      const allData = {
        ...getCorporateInfoFormValues(data),
        ...getCorporateInvestorDocumentsFormValues(data),
        ...getCorporateInvestorTaxDeclarationFormValues(data),
        ...getDirectorsAndBeneficialOwnersFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      const allData = {
        ...getCorporateInfoRequestPayload(data),
        ...getCorporateInvestorDocumentsRequestPayload(data),
        ...getDirectorsAndBeneficialOwnerRequestPayload(data),
        ...getTaxDeclarationRequestPayload(data)
      }
      return allData
    },
    validationSchema: corporateInvestorSchema,
    component: () => <CorporateIdentityContainer />,
    formId: 'submit'
  }
]
