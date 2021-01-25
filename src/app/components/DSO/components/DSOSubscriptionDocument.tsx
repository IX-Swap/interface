import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { DataroomRowUploader } from 'components/dataroom/DataroomRowUploader'
import { Grid } from '@material-ui/core'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'

export const DSOSubscriptionDocument = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid item xs={12}>
      <Grid container direction='column'>
        <Grid item xs={12}>
          {/* @ts-ignore */}
          <TypedField
            customRenderer
            control={control}
            component={DataroomRowUploader}
            label='Subscription Document'
            name='subscriptionDocument'
            valueExtractor={plainValueExtractor}
            documentInfo={{
              type: 'Subscription Document',
              title: 'Subscription Document'
            }}
            onDelete={() => {
              control.setValue('subscriptionDocument', null as any)
            }}
          />
        </Grid>
        <Grid item container justify='flex-end'>
          <FormError name='subscriptionDocument' render={TextError} />
        </Grid>
      </Grid>
    </Grid>
  )
}
