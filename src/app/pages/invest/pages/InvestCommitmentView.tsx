import React from 'react'
import { useCommitmentById } from 'app/pages/invest/hooks/useCommitmentById'
import { CommitmentPreview } from 'app/components/CommitmentPreview/CommitmentPreview'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const InvestCommitmentView = () => {
  const { commitmentId } = useParams<{ commitmentId: string }>()
  const { data, isLoading } = useCommitmentById(commitmentId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title={data.dso.tokenName} />
      </Grid>

      <Grid item>
        <RejectionMessage data={data} />
      </Grid>

      <Grid item>
        <CommitmentPreview data={data} isUserView />
      </Grid>
    </Grid>
  )
}
