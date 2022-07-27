import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useCommitmentActivity } from 'app/pages/invest/hooks/useCommitmentActivity'
import { DSOOverview } from 'app/pages/invest/components/MakeCommitment/DSOOverview'
import { RootContainer } from 'ui/RootContainer'

export const MakeCommitment = () => {
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useDSOById(params.dsoId, params.issuerId)

  useCommitmentActivity(data?._id)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <RootContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <DSOOverview dso={data} />
        </Grid>
        <Grid item xs={12} md={8}></Grid>
      </Grid>
    </RootContainer>
  )
}
