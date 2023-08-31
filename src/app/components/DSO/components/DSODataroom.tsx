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
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { DSODataroomUploader } from 'app/components/DSO/components/DSODataroomUploader'
import { VSpacer } from 'components/VSpacer'
import { Tooltip } from 'ui/Tooltip/Tooltip'

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
              <Grid item display={'flex'} alignItems={'center'} gap={0.5}>
                <Typography variant='h5' fontSize={14} fontWeight={500}>
                  Dataroom
                </Typography>
                <Tooltip
                  title={
                    <div>
                      <p style={{ marginTop: 0 }}>
                        An <strong>investor data room</strong> is a secure space
                        for the sharing of sensitive information relating to the
                        company in which the investor is considering investing.
                      </p>
                      <p style={{ marginBottom: 0 }}>
                        Data rooms for investors used to be physical rooms,
                        however today, they are almost always virtual.
                      </p>
                    </div>
                  }
                />
              </Grid>
              <Grid item>
                <Typography color={'text.secondary'}>
                  Please upload your data room document
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
                  </Fragment>
                )}
              </FieldsArray>
              <VSpacer size='small' />
              <FormError name='documents' render={TextError} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </SelectionHelper>
  )
}
