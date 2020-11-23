import React from 'react'
import { Grid } from '@material-ui/core'
import { Submit } from 'v2/components/form/Submit'
import { CommitmentIssuanceForm } from './CommitmentIssuanceForm'
import { CommitmentIssuanceFields } from './CommitmentIssuanceFields'

export interface CommitmentIssuanceProps {
  withdrawalAddress: string
  amount: string
}

export const CommitmentIssuance = (props: CommitmentIssuanceProps) => {
  const initialValues = {
    withdrawalAddress: props.withdrawalAddress
    // releaseDate: new Date()
  }

  return (
    <CommitmentIssuanceForm defaultValues={initialValues}>
      <Grid container direction='column'>
        <CommitmentIssuanceFields amount={props.amount} />

        <Grid item>
          <Submit color='primary' variant='outlined'>
            Update
          </Submit>
        </Grid>
      </Grid>
    </CommitmentIssuanceForm>
  )
}
