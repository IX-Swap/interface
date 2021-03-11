import React, { Fragment, memo } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { useCreateIndividual } from 'app/pages/_identity/hooks/useCreateIndividual'
import {
  getAgreementsAndDisclosuresFormValues,
  getDocumentsFormValues,
  getFinancialInfoFormValues,
  getInvestorDeclarationFormValues,
  getPersonalInfoFormValues,
  getTaxDeclarationFormValues
} from 'app/pages/_identity/utils/individual/forms'
import {
  getAgreementsRequestPayload,
  getDocumentsRequestPayload,
  getFinancialInfoRequestPayload,
  getInvestorDeclarationRequestPayload,
  getPersonalInfoRequestPayload,
  getTaxDeclarationRequestPayload
} from 'app/pages/_identity/utils/individual/requests'
import {
  financialInfoSchema,
  individualInvestorAgreementsSchema,
  individualInvestorDocumentsSchema,
  individualInvestorStatusDeclarationSchema,
  personalInfoSchema,
  taxDeclarationSchema
} from 'app/pages/_identity/validation/individual'
import { AgreementsAndDisclosuresFields } from 'app/pages/_identity/components/AgreementsAndDisclosuresFields/AgreementsAndDisclosuresFields'
import { IndividualIdentityView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityView'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { useSubmitIndividual } from '../../hooks/useSubmitIndividual'
import { FinancialInformationForm } from 'app/pages/_identity/components/FinancialInformationForm/FinancialInformationForm'
import { TaxDeclarationForm } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationForm'
import { IndividualUploadDocumentsForm } from 'app/pages/_identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'

export const IndividualInvestorForm = memo(() => {
  const { data, isLoading } = useIndividualIdentity()
  const mutation = useCreateIndividual()
  const submitMutation = useSubmitIndividual()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormStepper
      data={data}
      createMutation={mutation}
      editMutation={mutation}
      submitMutation={submitMutation}
      steps={[
        {
          label: 'Personal Information',
          getFormValues: getPersonalInfoFormValues,
          getRequestPayload: getPersonalInfoRequestPayload,
          validationSchema: personalInfoSchema,
          component: () => (
            <Fragment>
              <IndividualInfoFields />
              <AddressFields />
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
          label: 'Documents Upload',
          getFormValues: getDocumentsFormValues,
          getRequestPayload: getDocumentsRequestPayload,
          validationSchema: individualInvestorDocumentsSchema,
          component: () => (
            <Fragment>
              <IndividualUploadDocumentsForm />
            </Fragment>
          )
        },
        {
          label: 'Agreements and Disclosures',
          getFormValues: getAgreementsAndDisclosuresFormValues,
          getRequestPayload: getAgreementsRequestPayload,
          validationSchema: individualInvestorAgreementsSchema,
          component: () => (
            <Fragment>
              <AgreementsAndDisclosuresFields />
            </Fragment>
          )
        },
        {
          label: 'Review & Submit',
          getFormValues: () => {},
          getRequestPayload: () => {},
          validationSchema: null,
          component: () => (
            <Fragment>
              <IndividualIdentityView data={data} />
            </Fragment>
          )
        }
      ]}
    />
  )
})
