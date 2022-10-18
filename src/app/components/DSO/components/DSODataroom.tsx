import React, { Fragment } from 'react'
import { FieldsArray } from 'components/form/FieldsArray'
import { Grid, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { SelectionHelper } from 'components/SelectionHelper'
import { FormError } from 'components/form/FormError'
import { TextError } from 'components/TextError'
import { DSOSubscriptionDocument } from 'app/components/DSO/components/DSOSubscriptionDocument'
import { itemComparator, SelectedDocument } from 'helpers/dataroom'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { DSODataroomUploader } from 'app/components/DSO/components/DSODataroomUploader'

export const DSODataroom = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <SelectionHelper<SelectedDocument> itemComparator={itemComparator}>
      <Grid container direction={'column'} spacing={{ xs: 4, md: 5 }}>
        <Grid item>
          <FormSectionHeader title='Upload Documents' />
        </Grid>

        <Grid item container direction='column' spacing={{ xs: 4, md: 5 }}>
          <Grid item>
            <DSOSubscriptionDocument />
          </Grid>

          <Grid item container direction={'column'} spacing={3}>
            <Grid item container direction={'column'} spacing={1.5}>
              <Grid item>
                <Typography variant='h5' fontSize={14} fontWeight={500}>
                  Dataroom
                </Typography>
              </Grid>
              <Grid item>
                <Typography color={'text.secondary'}>
                  Please select document type and upload it
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <FieldsArray name='documents' control={control}>
                {({ fields, append, remove }) => (
                  <Fragment>
                    <DSODataroomUploader
                      fields={fields}
                      append={append}
                      remove={remove}
                      control={control}
                    />

                    <FormError name='documents' render={TextError} />
                  </Fragment>
                )}
              </FieldsArray>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SelectionHelper>
  )
}
