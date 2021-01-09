import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'types/dso'
import { noop } from 'helpers/noop'
import { isDSOLive, transformDSOToFormValues } from 'app/components/DSO/utils'
import { Grid } from '@material-ui/core'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { DSOStatusFields } from 'app/components/DSO/components/DSOStatusFields'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { Form } from 'components/form/Form'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getOfferingName } from 'helpers/strings'
import { getDSOValidationSchema } from 'validation/dso'
import { DSOInformationProfile } from 'app/components/DSO/components/DSOInformationProfile'
import { VSpacer } from 'components/VSpacer'

export interface DSOFormProps {
  submitButtonLabel?: string
  onSubmit?: (values: DSOFormValues) => any
  data?: DigitalSecurityOffering
  isEditing?: boolean
  isNew?: boolean
}

export const DSOForm = (props: DSOFormProps) => {
  const { data, isNew = false, onSubmit = noop } = props
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
        <VSpacer size='large' />
        <DSOStatusFields />
        <VSpacer size='large' />
        <DSOTerms />
        <VSpacer size='large' />
        <DSOInformationProfile />
        <VSpacer size='large' />
        <DSOTeam />
      </Grid>
    </Form>
  )
}
