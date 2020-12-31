import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'
import { noop } from 'helpers/noop'
import { isDSOLive, transformDSOToFormValues } from 'app/components/DSO/utils'
import { Box, Grid } from '@material-ui/core'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { DSOIntroduction } from 'app/components/DSO/components/DSOIntroduction'
import { DSOStatusFields } from 'app/components/DSO/components/DSOStatusFields'
import { DSOSubscriptionDocument } from 'app/components/DSO/components/DSOSubscriptionDocument'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { DSOBusinessModel } from 'app/components/DSO/components/DSOBusinessModel'
import { DSOUseOfProceeds } from 'app/components/DSO/components/DSOUseOfProceeds'
import { DSODataroom } from 'app/components/DSO/components/DSODataroom'
import { DSOFundRaisingMilestone } from 'app/components/DSO/components/DSOFundRaisingMilestone'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { DSOBackButton } from 'app/components/DSO/components/DSOBackButton'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { getDSOValidationSchema } from 'validation/dso'

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
    isNew = false,
    onSubmit = noop
  } = props
  const isLive = isDSOLive(data)

  useSetPageTitle(getOfferingName(data))

  return (
    <Form
      validationSchema={getDSOValidationSchema(isNew, isLive)}
      defaultValues={transformDSOToFormValues(data)}
      onSubmit={onSubmit}
      data-testid='dso-form'
    >
      <Grid container direction='column' spacing={3}>
        <DSOBaseFields isNew={isNew} isLive={isLive} />
        <Grid item container direction='row' alignItems='stretch'>
          <DSOIntroduction />
          <DSOStatusFields />
        </Grid>
        <Grid item>
          <DSOSubscriptionDocument />
        </Grid>
        <DSOTerms />
        <DSOBusinessModel />
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
