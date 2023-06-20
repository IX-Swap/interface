import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { dateTimeValueExtractor } from 'helpers/forms'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { LabelWithTooltip } from 'ui/LabelWithTooltip/LabelWithTooltip'

export interface STODatesProps {
  status?: string
}

export const STODates = (props: STODatesProps) => {
  const { status } = props
  const { control, trigger } = useFormContext<DSOFormValues>()
  const launchDate = control.getValues('launchDate')
  const isLaunchDateEmpty =
    typeof launchDate === 'undefined' || launchDate === ''

  return (
    <Grid item>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <FormSectionHeader
            hasBorderBottom={false}
            title='STO Dates'
            variant='h5'
          />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} md={6}>
              <TypedField
                component={DateTimePicker}
                customRenderer
                label={
                  <LabelWithTooltip
                    label={'Launch Date'}
                    tooltipTitle={
                      <span>
                        <strong>Launch Date</strong> is the date when investors
                        can invest in STOs.
                      </span>
                    }
                  />
                }
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
                label={
                  <LabelWithTooltip
                    label={
                      'Release Date (Securities will be locked for n days)'
                    }
                    tooltipTitle={
                      <span>
                        <strong>Release Date</strong> is the date when STOs can
                        be traded freely between investors. This date should not
                        be earlier than launch date.
                      </span>
                    }
                  />
                }
                name='releaseDate'
                control={control}
                disabled={isLaunchDateEmpty}
                valueExtractor={dateTimeValueExtractor}
                // @ts-expect-error
                defaultValue={null}
                helperText='mm/dd/yyyy'
                inputVariant='outlined'
                withIcon
                disablePast
                // isOptional
                // optionalText='(Securities will be locked for n days)'
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
                  label={
                    <LabelWithTooltip
                      label={'Completion Date'}
                      tooltipTitle={
                        <span>
                          <strong>Completion Date</strong> is the date when the
                          STO cannot be invested in anymore. This date should
                          not be earlier than launch date.
                        </span>
                      }
                    />
                  }
                  name='completionDate'
                  control={control}
                  disabled={isLaunchDateEmpty}
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
