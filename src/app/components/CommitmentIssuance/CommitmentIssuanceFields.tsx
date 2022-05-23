import { Box, Grid, OutlinedInput, Typography } from '@mui/material'
import useStyles from 'app/components/CommitmentIssuance/CommitmentIssuanceFields.styles'
import { TypedField } from 'components/form/TypedField'
import { DateTimePicker } from 'components/form/_DateTimePicker'
import { LabelledValue } from 'components/LabelledValue'
import { convertDateToISO } from 'helpers/dates'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CommitmentIssuanceFormValues } from 'types/commitment'
export interface CommitmentIssuanceFieldsProps {
  amount: string
}

export const CommitmentIssuanceFields = (
  props: CommitmentIssuanceFieldsProps
) => {
  const classes = useStyles()
  const { control } = useFormContext<CommitmentIssuanceFormValues>()

  return (
    <React.Fragment>
      <Grid item>
        <Typography variant='h3'>Token Issuance</Typography>
      </Grid>

      <Grid item className={classes.spacedTop}>
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
      </Grid>

      <Grid item className={classes.spaced}>
        <LabelledValue label='Amount to Issue' value={props.amount} />
      </Grid>

      <Grid item md={4}>
        <Typography variant='subtitle1'>Release Date</Typography>
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

        <Typography variant='body2'>
          Please note that the investor will receive the tokens in their wallet
          address (self wallet or custodied) but they will not be able to
          transfer these tokens until the transfer lock (or locking period) is
          over.
        </Typography>
      </Grid>
    </React.Fragment>
  )
}
