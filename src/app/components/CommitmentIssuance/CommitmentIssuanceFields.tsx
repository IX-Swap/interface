import { Box, Grid, Typography } from '@mui/material'
import useStyles from 'app/components/CommitmentIssuance/CommitmentIssuanceFields.styles'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { LabelledValue } from 'components/LabelledValue'
import { convertDateToISO } from 'helpers/dates'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CommitmentIssuanceFormValues } from 'types/commitment'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { Tooltip } from 'ui/Tooltip/Tooltip'
export interface CommitmentIssuanceFieldsProps {
  amount: string
}

export const CommitmentIssuanceFields = (
  props: CommitmentIssuanceFieldsProps
) => {
  const classes = useStyles()
  const { control } = useFormContext<CommitmentIssuanceFormValues>()

  return (
    <>
      <Grid item>
        <FormSectionHeader title='Token Issuance' />
      </Grid>

      {/* <Grid item className={classes.spacedTop}>
        <Typography variant='subtitle1'>
          Specify or Override the Withdrawal Address
        </Typography>
        <Box py={0.4} />
        <TypedField
          component={OutlinedInput}
          control={control}
          margin='dense'
          name='withdrawalAddress'
          label=''
          style={{ maxWidth: 500 }}
        />
      </Grid>

      <Grid item>
        <Box py={0.4} />
        <Typography variant='body2'>
          You can override the wallet address specified by the investor. If you
          do, a new withdrawal address will be added on behalf of the investor
          and they'll get notified about this.
        </Typography>
      </Grid> */}

      <Grid item className={classes.spaced}>
        <LabelledValue label='Amount to Issue' value={props.amount} />
      </Grid>

      <Grid item md={4}>
        <Grid display={'flex'}>
          <Typography variant='subtitle1'>Change Free-to-Trade Date</Typography>
          <Tooltip
            style={{ marginTop: '-2px' }}
            data-testid='upload-document-field-tooltip'
            title={
              'Free-to-Trade (FTT) Date is the date where investors can start freely trading with other investors. This date can be changed because some STO deals will need different FTT Date due to staggered Closing Date for the STOs'
            }
          />
        </Grid>
        <Box py={0.4} />
        <TypedField
          name='releaseDate'
          label=''
          control={control}
          component={DateTimePicker}
          disablePast
          valueExtractor={convertDateToISO}
          defaultValue={null}
          style={{ maxWidth: 200 }}
        />
      </Grid>

      <Grid item className={classes.spacedBottom}>
        <Box py={0.4} />

        {/* <Typography variant='body2'>
  
        </Typography> */}
      </Grid>
    </>
  )
}
