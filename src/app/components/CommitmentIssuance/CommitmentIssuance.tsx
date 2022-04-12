import React from 'react'
import { Grid } from '@mui/material'
import { Submit } from 'components/form/Submit'
import { CommitmentIssuanceForm } from 'app/components/CommitmentIssuance/CommitmentIssuanceForm'
import { CommitmentIssuanceFields } from 'app/components/CommitmentIssuance/CommitmentIssuanceFields'
import { Commitment } from 'types/commitment'
import { convertISOToDate } from 'helpers/dates'

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
