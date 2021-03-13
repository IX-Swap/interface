import React, { useEffect, Fragment } from 'react'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
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
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import {
  corporateInvestorAgreementsSchema,
  corporateInvestorDocumentsSchema,
  corporateInvestorInfoSchema,
  corporateInvestorStatusDeclarationSchema,
  corporateTaxDeclarationSchema,
  directorsAndBeneficialOwnersSchema
} from 'app/pages/_identity/validation/corporate'
import { useSubmitCorporate } from 'app/pages/_identity/hooks/useSubmitCorporate'

export const CorporateInvestorForm = () => {
  const { data, isLoading } = useAllCorporates({ type: 'investor' })
  const { params, current, paths } = useIdentitiesRouter()
  const isNew = current.path === paths.createCorporate
  const identity = isNew ? undefined : data.map[params.identityId as string]

  const createMutation = useCreateCorporate('investor')
  const updateMutation = useUpdateCorporate('investor')
  const submitMutation = useSubmitCorporate()
  const { showPreIdentityCreateDialog } = useOnboardingDialog()

  useEffect(() => {
    if (!isLoading && data.list.length === 0) {
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
          label: 'Agreements and Declarations',
          getFormValues: getCorporateInvestorAgreementsAndDisclosuresFormValues,
          getRequestPayload: getCorporateInvestorAgreementsRequestPayload,
          validationSchema: corporateInvestorAgreementsSchema,
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
              <CorporateIdentityView />
            </Fragment>
          )
        }
      ]}
    />
  )
}
