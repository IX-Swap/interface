import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { Insights } from 'app/pages/issuance/components/ManageDistributions/Insights'
import { NewDistribution } from 'app/pages/issuance/components/ManageDistributions/NewDistribution'
import { PastDistributionsTable } from 'app/pages/issuance/components/ManageDistributions/PastDistributionsTable'
import React from 'react'
import { useParams } from 'react-router-dom'

export const ManageDistributions = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isLoading } = useDSOById(dsoId, issuerId)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title={data.tokenName} showBreadcrumbs />
      </Grid>
      <Grid item xs={12}>
        <Insights />
      </Grid>
      <Grid item xs={12}>
        <NewDistribution />
      </Grid>
      <Grid item xs={12}>
        <PastDistributionsTable dso={data} />
      </Grid>
    </Grid>
  )
}
