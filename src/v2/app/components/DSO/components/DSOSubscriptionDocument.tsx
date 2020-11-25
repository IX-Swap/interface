import React from 'react'
import { TypedField } from 'v2/components/form/TypedField'
import { plainValueExtractor } from 'v2/helpers/forms'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'
import { DataroomRowUploader } from 'v2/components/dataroom/DataroomRowUploader'
import { Grid } from '@material-ui/core'
import { FormError } from 'v2/components/form/FormError'
import { TextError } from 'v2/components/TextError'

export const DSOSubscriptionDocument = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Subscription Document' item xs={12}>
      <Grid container direction='column'>
        <Grid item>
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
    </DSOContainer>
  )
}
