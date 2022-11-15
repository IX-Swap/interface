import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { Box, Grid, Typography } from '@mui/material'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { Icon } from 'ui/Icons/Icon'

export const DSOSubscriptionDocument = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container direction={'column'} spacing={1.5}>
        <Grid item>
          <Typography variant='h5' fontSize={14} fontWeight={500}>
            Subscription Document
          </Typography>
        </Grid>
        <Grid item>
          <Typography color={'text.secondary'}>
            Please upload your subscription document
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TypedField
          customRenderer
          control={control}
          component={FileUpload}
          fullWidth
          label={
            <Box display={'flex'} alignItems={'center'}>
              <Icon name={'file'} />
              <Box ml={2}>Upload file</Box>
            </Box>
          }
          name='subscriptionDocument'
          valueExtractor={plainValueExtractor}
          documentInfo={{
            type: 'Subscription Document',
            title: 'Please upload your subscription document'
          }}
          onRemoveCallback={() => {
            control.setValue('subscriptionDocument', '')
          }}
        />
      </Grid>
      <Grid item container justifyContent='flex-start'>
        <FormError name='subscriptionDocument' render={TextError} />
      </Grid>
    </Grid>
  )
}
