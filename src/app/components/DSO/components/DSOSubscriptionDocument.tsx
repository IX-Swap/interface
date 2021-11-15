import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { hasValue, plainValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { DataroomRowUploader } from 'components/dataroom/DataroomRowUploader'
import { Box, Grid } from '@material-ui/core'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'

export const DSOSubscriptionDocument = () => {
  const { control } = useFormContext<DSOFormValues>()
  const formValues = control.getValues()
  const hasSubscriptionDocument = hasValue(formValues.subscriptionDocument)

  return (
    <Grid item xs={12}>
      <Grid container direction='column'>
        <Grid item xs={12}>
          {hasSubscriptionDocument && (
            <Box mt={2.5}>
              <DataroomHeader />
            </Box>
          )}

          <TypedField
            customRenderer
            control={control}
            component={DataroomRowUploader}
            label='Subscription Document'
            name='subscriptionDocument'
            valueExtractor={plainValueExtractor}
            documentInfo={{
              type: 'Subscription Document',
              title: 'Please upload your subscription document'
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
