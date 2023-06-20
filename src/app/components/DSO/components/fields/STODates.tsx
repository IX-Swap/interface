import { Grid } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { dateTimeValueExtractor } from 'helpers/forms'
import { DateTimePicker } from 'components/form/_DateTimePicker'

export interface STODatesProps {
  status?: string
}

export const STODates = (props: STODatesProps) => {
  const { status } = props
  const { control, trigger } = useFormContext<DSOFormValues>()

  return (
    <Grid item>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Launch Date'
                name='launchDate'
                control={control}
                disabled={status === 'Approved'}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='mm/dd/yyyy'
                placeholder='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
                disablePast
                onAccept={async () => await trigger('completionDate')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label='Release Date'
                name='releaseDate'
                control={control}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
                disablePast
                isOptional
                optionalText='(Securities will be locked for n days)'
                // onAccept={async () => await trigger('launchDate')}
              />
            </Grid>
            <VSpacer size='small' />
          </Grid>
          <Grid item>
            <Grid container spacing={3} pt={2}>
              <Grid item xs={12}>
                <TypedField
                  component={DateTimePicker}
                  customRenderer
                  label='Completion Date'
                  name='completionDate'
                  control={control}
                  valueExtractor={dateTimeValueExtractor}
                  // @ts-expect-error
                  defaultValue={null}
                  helperText='mm/dd/yyyy'
                  inputVariant='outlined'
                  withIcon
                  disablePast
                  onAccept={async () => await trigger('launchDate')}
                />
              </Grid>
            </Grid>
            <VSpacer size='small' />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
