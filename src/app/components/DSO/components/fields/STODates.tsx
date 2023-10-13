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
  const { control, trigger, watch } = useFormContext<DSOFormValues>()
  const launchDate = control.getValues('launchDate')
  const isLaunchDateEmpty =
    typeof launchDate === 'undefined' || launchDate === ''
  const freeToTradeDate = watch('releaseDate')
  const completionDate = watch('completionDate')

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
                        can invest and commit to invest in STOs.
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
                    label={'Completion Date'}
                    tooltipTitle={
                      <span>
                        <strong>Completion Date</strong> is the date when the
                        STO deal closes. After this date, investors cannot
                        invest or commit to invest in a deal. This date should
                        not be earlier than Launch Date.
                      </span>
                    }
                  />
                }
                name='completionDate'
                control={control}
                disabled={isLaunchDateEmpty}
                maxDate={freeToTradeDate}
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
                      label={'Free-to-Trade Date (Optional)'}
                      tooltipTitle={
                        <span>
                          <strong>Free-to-Trade Date</strong> is the date when
                          STOs can be traded freely between investors. This date
                          should not be earlier than Completion Date. In between
                          the Completion Date and FTT Date, the STOs won&apos;t
                          be available for secondary trading on OTC and IX
                          Exchange. If FTT Date is left empty, then Completion
                          Date will be the FTT Date by default.
                        </span>
                      }
                    />
                  }
                  name='releaseDate'
                  control={control}
                  disabled={isLaunchDateEmpty}
                  minDate={completionDate}
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
            </Grid>
            <VSpacer size='small' />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
