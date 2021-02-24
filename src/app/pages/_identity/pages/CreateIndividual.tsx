import React, { Fragment } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { useCreateIndividual } from 'app/pages/_identity/hooks/useCreateIndividual'
import {
  getFinancialInfoFormValues,
  getPersonalInfoFormValues,
  getTaxDeclarationFormValues
} from 'app/pages/_identity/utils/individual/forms'
import {
  getFinancialInfoRequestPayload,
  getPersonalInfoRequestPayload,
  getTaxDeclarationRequestPayload
} from 'app/pages/_identity/utils/individual/requests'
import { personalInfoSchema } from 'app/pages/_identity/validation/individual'
import { FundSource } from 'app/pages/identity/components/FinancialInformationForm/FundSource'
import { FinancialInformationForm } from 'app/pages/identity/components/FinancialInformationForm/FinancialInformationForm'
import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import { UploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentsForm'
import { AgreementsAndDisclosuresFields } from 'app/pages/_identity/components/AgreementsAndDisclosuresFields/AgreementsAndDisclosuresFields'
import { IndividualIdentityView } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityView'
import { individual } from '__fixtures__/identity'

export interface CreateIndividualProps {}

export const CreateIndividual = (props: CreateIndividualProps) => {
  const { data, isLoading, isFetching } = useIndividualIdentity()
  const mutation = useCreateIndividual()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormStepper
      defaultActiveStep={0}
      data={data}
      createMutation={mutation}
      editMutation={mutation}
      submitMutation={mutation}
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
          validationSchema: null,
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
          validationSchema: null,
          component: () => (
            <Fragment>
              <TaxDeclarationForm />
            </Fragment>
          )
        },
        {
          label: 'Documents Upload',
          getFormValues: () => {},
          getRequestPayload: () => {},
          validationSchema: null,
          component: () => (
            <Fragment>
              <UploadDocumentsForm />
            </Fragment>
          )
        },
        {
          label: 'Agreements and Disclosures',
          getFormValues: () => {},
          getRequestPayload: () => {},
          validationSchema: null,
          component: () => (
            <Fragment>
              <AgreementsAndDisclosuresFields />
            </Fragment>
          )
        },
        {
          label: 'Agreements and Disclosures',
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
}
