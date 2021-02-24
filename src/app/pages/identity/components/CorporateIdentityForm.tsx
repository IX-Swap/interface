import React, { Fragment } from 'react'
import { CorporateIdentity } from 'types/identity'
import { Box, Grid } from '@material-ui/core'
import { AddressFields } from 'app/pages/identity/components/AddressFields/AddressFields'
import { Section } from 'app/pages/identity/components/Section'
import { DeclarationFields } from 'app/pages/identity/components/DeclarationFields'
import { CompanyInfoFields } from 'app/pages/identity/components/CompanyInfoFields'
import { CorporateIdentityFormValues } from 'app/pages/identity/components/types'
import { CorporateProfilesFields } from 'app/pages/identity/components/CorporateProfilesFields'
import { getIdentityFormDefaultValue } from 'app/pages/identity/utils'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { IdentityDataroom } from 'app/pages/identity/components/IdentityDataroom'
import { corporateIdentityFormValidationSchema } from 'validation/identities'
import { useCreateCorporateIdentity } from 'hooks/identity/useCreateCorporateIdentity'
import { useUpdateCorporateIdentity } from 'hooks/identity/useUpdateCorporateIdentity'
import { FormStepper } from 'app/components/FormStepper/FormStepper'

export interface CorporateIdentityFormProps {
  data: CorporateIdentity | undefined
  onSubmit?: (values: CorporateIdentityFormValues) => void
  submitButtonText?: string
  cancelButton?: JSX.Element
}

export const CorporateIdentityForm = (
  props: CorporateIdentityFormProps
): JSX.Element => {
  const { data, submitButtonText, cancelButton, onSubmit } = props

  const createMutation = useCreateCorporateIdentity()
  const updateMutation = useUpdateCorporateIdentity(data?._id as string)
  const submitMutation = useUpdateCorporateIdentity(data?._id as string)

  return (
    <FormStepper
      data={data}
      createMutation={createMutation}
      editMutation={updateMutation}
      submitMutation={submitMutation}
      steps={[
        // {
        //   component: () => (
        //     <Fragment>
        //       <CompanyInfoFields />
        //       <AddressFields />
        //     </Fragment>
        //   ),
        //   label: 'Company Information',
        //   validationSchema: corporateIdentityFormValidationSchema,
        //   getFormValues: getIdentityFormDefaultValue
        // },
        // {
        //   component: () => (
        //     <Fragment>
        //       <CorporateProfilesFields
        //         title='Company Authorized Personnel'
        //         type='representatives'
        //       />
        //       <CorporateProfilesFields
        //         title='Company Director'
        //         type='directors'
        //       />
        //       <CorporateProfilesFields
        //         title='Beneficial Owner'
        //         type='beneficialOwners'
        //       />
        //     </Fragment>
        //   ),
        //   label: 'Authorized Personnel',
        //   validationSchema: corporateIdentityFormValidationSchema,
        //   getFormValues: getIdentityFormDefaultValue
        // },
        // {
        //   component: () => <IdentityDataroom />,
        //   label: 'Documents Upload',
        //   validationSchema: corporateIdentityFormValidationSchema,
        //   getFormValues: getIdentityFormDefaultValue
        // },
        // {
        //   component: () => <DeclarationFields type='corporate' />,
        //   label: 'Declaration Fields',
        //   validationSchema: corporateIdentityFormValidationSchema,
        //   getFormValues: getIdentityFormDefaultValue
        // }
      ]}
    />
  )
}
