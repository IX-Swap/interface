import React from 'react'
import { DigitalSecurityOffering, DSOFormValues } from 'v2/types/dso'
import { useForm, FormProvider } from 'react-hook-form'
import { noop } from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { transformDSOToFormValues } from 'v2/app/components/DSO/utils'
import { Button, Grid } from '@material-ui/core'
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
  const form = useForm<DSOFormValues>({
    defaultValues: transformDSOToFormValues(data),
    mode: 'all'
  })
  const { handleSubmit, ...rest } = form

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        onSubmit={handleSubmit(onSubmit, alert)}
        style={{ width: '100%' }}
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
          <DSODataroom />
          <DSOFundRaisingMilestone />
          <DSOTeam />
          <Grid item>
            <Button type='submit'>{submitButtonLabel}</Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}
