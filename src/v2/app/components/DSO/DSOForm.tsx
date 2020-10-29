import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'v2/types/dso'
import { noop } from 'v2/helpers/noop'
import { transformDSOToFormValues } from 'v2/app/components/DSO/utils'
import { Box, Grid } from '@material-ui/core'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { DSOToken } from 'v2/app/components/DSO/components/DSOToken'
import { DSOBaseFields } from 'v2/app/components/DSO/components/DSOBaseFields'
import { DSOIntroduction } from 'v2/app/components/DSO/components/DSOIntroduction'
import { DSOStatusFields } from 'v2/app/components/DSO/components/DSOStatusFields'
import { DSOSubscriptionDocument } from 'v2/app/components/DSO/components/DSOSubscriptionDocument'
import { DSOOfferingTerms } from 'v2/app/components/DSO/components/DSOOfferingTerms'
import { DSOBusinessModel } from 'v2/app/components/DSO/components/DSOBusinessModel'
import { DSOUseOfProceeds } from 'v2/app/components/DSO/components/DSOUseOfProceeds'
import { DSODataroom } from 'v2/app/components/DSO/components/DSODataroom'
import { DSOFundRaisingMilestone } from 'v2/app/components/DSO/components/DSOFundRaisingMilestone'
import { DSOTeam } from 'v2/app/components/DSO/components/DSOTeam'
import { Form } from 'v2/components/form/Form'
import { dsoFormValidationSchema } from 'v2/app/components/DSO/validation'
import { Submit } from 'v2/components/form/Submit'
import { DSOBackButton } from 'v2/app/components/DSO/components/DSOBackButton'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'
import { getOfferingName } from 'v2/helpers/strings'

export interface DSOFormProps {
  submitButtonLabel?: string
  onSubmit?: (values: DSOFormValues) => any
  data?: DigitalSecurityOffering
  isEditing?: boolean
  isNew?: boolean
}

export const DSOForm = (props: DSOFormProps) => {
  const {
    submitButtonLabel = 'Submit',
    data,
    onSubmit = noop,
    isNew = false
  } = props

  useSetPageTitle(getOfferingName(data))

  return (
    <Form
      validationSchema={dsoFormValidationSchema}
      defaultValues={transformDSOToFormValues(data)}
      onSubmit={onSubmit}
      data-testid='dso-form'
    >
      <Grid container direction='column' spacing={3}>
        <DSOBaseFields />
        <Grid item container direction='row' spacing={2}>
          <DSOIntroduction />
          <DSOStatusFields isNew={isNew} />
        </Grid>
        <Grid item>
          <DSOSubscriptionDocument />
        </Grid>
        <DSOOfferingTerms />
        <DSOBusinessModel />
        {!isNew && (
          <DSOContainer title='Token' item xs={12}>
            <DSOToken />
          </DSOContainer>
        )}
        <DSOUseOfProceeds />
        <DSOContainer title='Dataroom' item xs={12}>
          <DSODataroom />
        </DSOContainer>
        <DSOFundRaisingMilestone />
        <DSOTeam />
        <Grid item container justify='center'>
          <DSOBackButton />
          <Box px={1} />
          <Submit>{submitButtonLabel}</Submit>
        </Grid>
      </Grid>
    </Form>
  )
}
