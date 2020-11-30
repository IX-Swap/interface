import React from 'react'
import { Grid } from '@material-ui/core'
import { Submit } from 'v2/components/form/Submit'
import { CommitmentIssuanceForm } from './CommitmentIssuanceForm'
import { CommitmentIssuanceFields } from './CommitmentIssuanceFields'
import { Commitment } from 'v2/types/commitment'
import { convertISOToDate } from 'v2/helpers/dates'

export interface CommitmentIssuanceProps {
  data: Commitment
}

export const CommitmentIssuance = (props: CommitmentIssuanceProps) => {
  const { data } = props
  const amount = `${data.numberOfUnits} ${data.dso.tokenSymbol}`
  const withdrawalAddress =
    data.authorizationOverride?.withdrawalAddress ??
    data.withdrawalAddress?.address
  const releaseDate = convertISOToDate(
    data.authorizationOverride?.releaseDate ?? data.dso.launchDate
  )
  const initialValues = {
    withdrawalAddress,
    releaseDate
  }

  return (
    <Grid item container spacing={4}>
      <Grid item xs={12}>
        <CommitmentIssuanceForm defaultValues={initialValues}>
          <Grid container direction='column'>
            <CommitmentIssuanceFields amount={amount} />

            <Grid item>
              <Submit color='primary' variant='outlined' size='large'>
                Update
              </Submit>
            </Grid>
          </Grid>
        </CommitmentIssuanceForm>
      </Grid>
    </Grid>
  )
}
