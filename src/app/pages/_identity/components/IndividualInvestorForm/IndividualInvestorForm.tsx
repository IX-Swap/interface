import React, { useEffect, Fragment, memo } from 'react'
import { VSpacer } from 'components/VSpacer'
import { Typography } from '@material-ui/core'
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
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'

export const IndividualInvestorForm = memo(() => {
  const { data, isLoading } = useIndividualIdentity()
  const mutation = useCreateIndividual()
  const submitMutation = useSubmitIndividual()
  const { showPreIdentityCreateDialog } = useOnboardingDialog()

  useEffect(() => {
    if (!isLoading && data === undefined) {
      showPreIdentityCreateDialog('individual')
    }
    // eslint-disable-next-line
  }, [isLoading])

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
              <FormSectionHeader title={'Upload Documents'} />
              <Typography
                variant='subtitle2'
                color='textSecondary'
                style={{ marginTop: -30, fontSize: 16 }}
              >
                Please upload the following documents. All account statements
                and documents should be date within 3 months.
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                Notes: Type of document format supported is jpg, jpeg, png, gif,
                tiff, webp, svg, apng, avif, jfif, pjpeg, pjp, docx, xlsx, pdf,
                and odt.
              </Typography>
              <VSpacer size='medium' />
              <IndividualUploadDocumentsForm />
            </Fragment>
          )
        },

        // TODO Added content for documents when it is ready
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
