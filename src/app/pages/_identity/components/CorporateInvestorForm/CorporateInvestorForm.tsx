import React, { useEffect, Fragment } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useUpdateCorporateIdentity } from 'hooks/identity/useUpdateCorporateIdentity'
import { useAllCorporateIdentities } from 'hooks/identity/useAllCorporateIdentities'
import { CorporateInformationForm } from 'app/pages/_identity/components/CorporateInformationForm/CorporateInformationForm'
import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import {
  getCorporateInfoFormValues,
  getCorporateInvestorAgreementsAndDisclosuresFormValues,
  getCorporateInvestorDeclarationFormValues,
  getCorporateInvestorDocumentsFormValues,
  getCorporateInvestorTaxDeclarationFormValues,
  getDirectorsAndBeneficialOwnersFormValues
} from 'app/pages/_identity/utils/corporate/forms'
import {
  getCorporateInfoRequestPayload,
  getCorporateInvestorAgreementsRequestPayload,
  getCorporateInvestorDeclarationRequestPayload,
  getCorporateInvestorDocumentsRequestPayload,
  getDirectorsAndBeneficialOwnerRequestPayload
} from 'app/pages/_identity/utils/corporate/requests'
import { useCreateCorporate } from 'app/pages/_identity/hooks/useCreateCorporate'
import { useUpdateCorporate } from 'app/pages/_identity/hooks/useUpdateCorporate'
import { getTaxDeclarationRequestPayload } from '../../utils/individual/requests'
import { TaxDeclarationForm } from '../TaxDeclarationForm/TaxDeclarationForm'
import { InvestorDeclarationForm } from '../InvestorDeclarationForm/InvestorDeclarationForm'
import { CorporateUploadDocumentsForm } from '../UploadDocumentsForm/CorporateUploadDocumentsForm'
import { AgreementsAndDisclosuresFields } from '../AgreementsAndDisclosuresFields/AgreementsAndDisclosuresFields'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'

export const CorporateInvestorForm = () => {
  const { data, isLoading } = useAllCorporateIdentities()
  const identity = data.list[0]

  const createMutation = useCreateCorporate()
  const updateMutation = useUpdateCorporate()
  const submitMutation = useUpdateCorporateIdentity(identity?._id)
  const { showPreIdentityCreateDialog } = useOnboardingDialog()

  useEffect(() => {
    if (!isLoading && data === undefined) {
      showPreIdentityCreateDialog('corporate')
    }
    // eslint-disable-next-line
  }, [isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <FormStepper
      data={identity}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      steps={[
        {
          label: 'Corporate Information',
          getFormValues: getCorporateInfoFormValues,
          getRequestPayload: getCorporateInfoRequestPayload,
          validationSchema: {},
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
          validationSchema: {},
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
          validationSchema: {},
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
          validationSchema: {},
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
          validationSchema: {},
          component: () => (
            <Fragment>
              <CorporateUploadDocumentsForm />
            </Fragment>
          )
        },
        {
          label: 'Agreements and Declarations',
          getFormValues: getCorporateInvestorAgreementsAndDisclosuresFormValues,
          getRequestPayload: getCorporateInvestorAgreementsRequestPayload,
          validationSchema: {},
          component: () => (
            <Fragment>
              <AgreementsAndDisclosuresFields />
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
              <CorporateIdentityView data={identity} />
            </Fragment>
          )
        }
      ]}
    />
  )
}
